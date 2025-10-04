# Installation Guide for MPFree

## System Requirements

- **OS**: Windows 10+, Linux (Ubuntu 18.04+), macOS 10.14+
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB for app, additional space for downloads
- **Network**: Internet connection for YouTube access

## Platform-Specific Installation

### Windows Installation

1. **Download Prerequisites**
   - Install Node.js from https://nodejs.org
   - Download FFmpeg from https://ffmpeg.org
   - Add FFmpeg to system PATH

2. **Install MPFree**
   - Extract the ZIP file
   - Open Command Prompt in the extracted folder
   - Run: `npm install`
   - Run: `npm run electron-dev`

3. **Create Windows Installer**
   ```cmd
   npm run dist-win
   ```
   This creates an `.exe` installer in the `dist` folder.

### Linux Installation

1. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm ffmpeg
   ```

2. **Install MPFree**
   ```bash
   # Extract ZIP and navigate to folder
   npm install
   npm run electron-dev
   ```

3. **Create DEB Package**
   ```bash
   npm run dist-linux
   ```
   This creates a `.deb` package that can be installed with:
   ```bash
   sudo dpkg -i dist/mpfree_1.0.0_amd64.deb
   ```

### Development Setup

1. **Clone/Extract Project**
   ```bash
   # Extract the provided ZIP file
   cd mpfree-desktop
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run electron-dev
   ```

## Build Scripts Explained

- `npm start` - Start React development server
- `npm run build` - Build React app for production
- `npm run electron-dev` - Start Electron in development mode
- `npm run dist` - Build for current platform
- `npm run dist-linux` - Build Linux packages (.deb, AppImage)
- `npm run dist-win` - Build Windows installer
- `npm run dist-mac` - Build macOS app (macOS only)

## Troubleshooting

### Common Issues

1. **"FFmpeg not found"**
   - Ensure FFmpeg is installed
   - Add FFmpeg to system PATH
   - Restart terminal/command prompt

2. **"Module not found" errors**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Permission errors on Linux**
   ```bash
   sudo chown -R $USER:$USER ~/.npm
   ```

4. **Build failures**
   - Ensure Node.js version is 16+
   - Check that all dependencies are installed
   - Try clearing npm cache: `npm cache clean --force`

### Platform-Specific Notes

**Windows:**
- Requires Visual Studio Build Tools for some native modules
- Antivirus software may flag the electron app initially

**Linux:**
- May require additional audio libraries: `sudo apt install libasound2-dev`
- AppImage requires FUSE: `sudo apt install fuse`

**macOS:**
- Requires Xcode Command Line Tools
- May need to allow app in Security & Privacy settings

## Post-Installation

1. **First Run**
   - Launch the application
   - Configure download folder in Settings
   - Test with a YouTube URL

2. **Verify Installation**
   - Check that downloads folder is created
   - Test audio conversion with a short video
   - Verify metadata cleaning is working

For additional help, check the README.md file or the troubleshooting section.