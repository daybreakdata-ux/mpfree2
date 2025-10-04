const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  getDownloadsFolder: () => ipcRenderer.invoke('get-downloads-folder'),

  onDownloadProgress: (callback) => {
    ipcRenderer.on('download-progress', callback);
  },

  removeDownloadProgressListener: () => {
    ipcRenderer.removeAllListeners('download-progress');
  }
});

contextBridge.exposeInMainWorld('mpfreeAPI', {
  downloadVideo: async (url, quality = 'highest', outputPath = null) => {
    try {
      const response = await fetch('http://localhost:3001/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, quality, outputPath })
      });
      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  },

  getVideoInfo: async (url) => {
    try {
      const response = await fetch(`http://localhost:3001/api/video-info?url=${encodeURIComponent(url)}`);
      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  }
});