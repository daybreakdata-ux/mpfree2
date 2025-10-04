# MPFree Desktop Application

## 🎵 AI-Powered YouTube Audio Converter by Daybreak Design

Transform YouTube videos into perfectly organized MP3 files with intelligent AI metadata cleaning.

## ✨ Features

- **AI Metadata Cleaning**: Automatically removes YouTube artifacts like "(Official Video)", "[HD]", year tags
- **High-Quality Audio**: Multiple bitrate options (128kbps, 192kbps, 320kbps)
- **Batch Processing**: Convert multiple URLs at once
- **Modern Interface**: Dark theme optimized for music consumption
- **Cross-Platform**: Windows, Linux, and macOS support
- **Background Processing**: Efficient conversion without blocking UI

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- FFmpeg (required for audio conversion)

### Installation

1. **Install FFmpeg**
   - **Windows**: Download from https://ffmpeg.org and add to PATH
   - **Linux**: `sudo apt install ffmpeg`
   - **macOS**: `brew install ffmpeg`

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development**
   ```bash
   npm run electron-dev
   ```

### Building for Production

```bash
# Build for current platform
npm run dist

# Build for specific platforms
npm run dist-linux    # Creates .deb and AppImage
npm run dist-win      # Creates .exe installer
npm run dist-mac      # Creates .dmg
```

## 🛠️ Technology Stack

- **Frontend**: React 18 with modern hooks
- **Desktop**: Electron with secure IPC
- **Backend**: Express server for YouTube processing
- **Audio**: FFmpeg for high-quality conversion
- **AI**: Advanced pattern matching for metadata cleaning

## 📁 Project Structure

```
mpfree-desktop/
├── public/
│   ├── electron.js      # Main Electron process
│   ├── preload.js       # Secure IPC bridge
│   └── index.html       # App template
├── src/
│   ├── components/      # React components
│   ├── App.js          # Main application
│   └── App.css         # Modern dark styling
├── package.json        # Dependencies & scripts
└── README.md          # This file
```

## 🎯 Usage

1. **Convert Single Video**
   - Paste YouTube URL
   - Choose quality settings
   - Click "Convert to MP3"

2. **Batch Processing**
   - Enable batch mode
   - Paste multiple URLs (one per line)
   - Start batch conversion

3. **Library Management**
   - View downloaded songs
   - Search and sort your library
   - See before/after metadata cleaning

4. **Settings**
   - Configure audio quality
   - Set custom download folder
   - Toggle AI cleaning features

## 🔒 Legal & Privacy

- Uses YouTube Data API legally
- All processing done locally
- Personal use only
- No data sent to external servers

## 🐛 Troubleshooting

**FFmpeg not found**: Ensure FFmpeg is installed and in system PATH
**Downloads failing**: Check internet connection and YouTube URL validity
**App won't start**: Delete node_modules and reinstall dependencies

## 📄 License

MIT License - Personal use only. Users responsible for content rights.

---

**Made with ❤️ by Daybreak Design**