const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const NodeID3 = require('node-id3');
const fs = require('fs');
const os = require('os');

// Express server for handling YouTube downloads
const server = express();
server.use(cors());
server.use(express.json());

let mainWindow;
let serverInstance;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    },
    icon: path.join(__dirname, '../build/icon.png'),
    titleBarStyle: 'default',
    show: false
  });

  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// AI-powered metadata cleaning function
function cleanMetadata(title) {
  let cleaned = title
    .replace(/\(Official\s*(Video|Audio|Music Video|Lyric Video)\)/gi, '')
    .replace(/\[Official\s*(Video|Audio|Music Video|Lyric Video)\]/gi, '')
    .replace(/\((Lyrics?|HD|4K|Full|Complete)\)/gi, '')
    .replace(/\[(Lyrics?|HD|4K|Full|Complete)\]/gi, '')
    .replace(/\(20\d{2}\)/g, '')
    .replace(/\[20\d{2}\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  cleaned = cleaned.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

  const dashSplit = cleaned.split(' - ');
  if (dashSplit.length >= 2) {
    const artist = dashSplit[0].trim();
    const song = dashSplit.slice(1).join(' - ').trim();
    return { artist, song, cleaned: `${artist} - ${song}` };
  }

  return { artist: 'Unknown Artist', song: cleaned, cleaned };
}

// Start internal server for handling downloads
function startServer() {
  const PORT = 3001;

  server.post('/api/download', async (req, res) => {
    try {
      const { url, quality = 'highest', outputPath } = req.body;

      if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
      }

      const info = await ytdl.getInfo(url);
      const videoTitle = info.videoDetails.title;
      const { artist, song, cleaned } = cleanMetadata(videoTitle);

      const downloadsPath = outputPath || path.join(os.homedir(), 'Downloads', 'MPFree');
      if (!fs.existsSync(downloadsPath)) {
        fs.mkdirSync(downloadsPath, { recursive: true });
      }

      const filename = `${cleaned.replace(/[<>:"/\\|?*]/g, '_')}.mp3`;
      const outputFilePath = path.join(downloadsPath, filename);

      const stream = ytdl(url, {
        quality: 'highestaudio',
        filter: 'audioonly'
      });

      const conversion = ffmpeg(stream)
        .audioBitrate(quality === 'highest' ? 320 : quality === 'high' ? 192 : 128)
        .format('mp3')
        .on('progress', (progress) => {
          if (mainWindow) {
            mainWindow.webContents.send('download-progress', {
              url,
              progress: Math.round(progress.percent || 0)
            });
          }
        })
        .on('end', () => {
          const tags = {
            title: song,
            artist: artist,
            album: 'YouTube Downloads',
            year: new Date().getFullYear().toString()
          };

          NodeID3.write(tags, outputFilePath);

          res.json({
            success: true,
            filename,
            path: outputFilePath,
            metadata: { artist, song, originalTitle: videoTitle }
          });
        })
        .on('error', (err) => {
          res.status(500).json({ error: err.message });
        })
        .save(outputFilePath);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  server.get('/api/video-info', async (req, res) => {
    try {
      const { url } = req.query;

      if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
      }

      const info = await ytdl.getInfo(url);
      const { artist, song, cleaned } = cleanMetadata(info.videoDetails.title);

      res.json({
        title: info.videoDetails.title,
        cleanedTitle: cleaned,
        artist,
        song,
        duration: info.videoDetails.lengthSeconds,
        thumbnail: info.videoDetails.thumbnails[0]?.url
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  serverInstance = server.listen(PORT, () => {
    console.log(`MPFree server running on port ${PORT}`);
  });
}

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: 'Select Download Folder'
  });
  return result.filePaths[0];
});

ipcMain.handle('get-downloads-folder', () => {
  return path.join(os.homedir(), 'Downloads', 'MPFree');
});

app.whenReady().then(() => {
  createWindow();
  startServer();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (serverInstance) {
    serverInstance.close();
  }

  if (process.platform !== 'darwin') {
    app.quit();
  }
});