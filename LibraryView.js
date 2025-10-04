import React, { useState } from 'react';

const LibraryView = ({ downloads, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDownloads = downloads.filter(download =>
    download.metadata.song.toLowerCase().includes(searchTerm.toLowerCase()) ||
    download.metadata.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="library">
      <h2><i className="fas fa-folder-open"></i> Music Library</h2>
      <p>{downloads.length} {downloads.length === 1 ? 'song' : 'songs'} downloaded</p>

      {downloads.length > 0 && (
        <div style={{ margin: '1rem 0' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search songs, artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {filteredDownloads.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
          {downloads.length === 0 ? (
            <>
              <i className="fas fa-music" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
              <h3>No downloads yet</h3>
              <p>Start by converting your first YouTube video to MP3!</p>
            </>
          ) : (
            <p>No results found</p>
          )}
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
          {filteredDownloads.map((download) => (
            <div key={download.id} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: '600' }}>{download.metadata.song}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {download.metadata.artist} • {formatDate(download.downloadedAt)}
                </div>
              </div>
              <button 
                className="btn"
                onClick={() => onDelete(download.id)}
                style={{ background: 'var(--error)', color: 'white' }}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryView;