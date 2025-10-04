import React, { useState } from 'react';

const DownloadForm = ({ onDownload, isDownloading, settings }) => {
  const [url, setUrl] = useState('');
  const [isPlaylistMode, setIsPlaylistMode] = useState(false);

  const isValidYouTubeUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=%\?]{11})/;
    return regex.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url && isValidYouTubeUrl(url)) {
      onDownload(url);
      setUrl('');
    }
  };

  return (
    <div className="download-form">
      <h2><i className="fas fa-download"></i> YouTube to MP3 Converter</h2>
      <p>Paste a YouTube URL below and convert it to high-quality MP3 with AI-cleaned metadata</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input 
              type="checkbox"
              checked={isPlaylistMode}
              onChange={(e) => setIsPlaylistMode(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Batch Mode (Multiple URLs)
          </label>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            className="form-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            disabled={isDownloading}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn--primary"
          disabled={isDownloading || !url || !isValidYouTubeUrl(url)}
        >
          {isDownloading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Converting...
            </>
          ) : (
            <>
              <i className="fas fa-download"></i>
              Convert to MP3
            </>
          )}
        </button>
      </form>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: 'var(--surface)', 
        borderRadius: '8px' 
      }}>
        <h4><i className="fas fa-lightbulb" style={{ color: 'var(--primary)' }}></i> Pro Tips:</h4>
        <ul style={{ marginLeft: '1rem', color: 'var(--text-secondary)' }}>
          <li>AI automatically cleans titles like "Song (Official Video) [HD]" → "Song"</li>
          <li>Higher quality settings produce larger files but better audio</li>
          <li>Downloads are saved to your configured output folder</li>
        </ul>
      </div>
    </div>
  );
};

export default DownloadForm;