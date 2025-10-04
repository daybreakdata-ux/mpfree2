import React from 'react';

const SettingsPanel = ({ settings, onSettingsChange }) => {
  const handleQualityChange = (quality) => {
    onSettingsChange({ quality });
  };

  const resetToDefaults = () => {
    onSettingsChange({
      quality: 'highest',
      outputPath: null,
      autoClean: true
    });
  };

  return (
    <div className="settings">
      <h2><i className="fas fa-cog"></i> Settings</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Audio Quality</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Choose the audio quality for your downloads. Higher quality means larger file sizes.
        </p>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {[
            { value: 'highest', label: '320 kbps (Highest)', desc: 'Premium quality, larger files' },
            { value: 'high', label: '192 kbps (High)', desc: 'Good quality, moderate size' },
            { value: 'medium', label: '128 kbps (Standard)', desc: 'Standard quality, smaller files' }
          ].map(option => (
            <label 
              key={option.value}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '1rem',
                background: settings.quality === option.value ? 'var(--primary)' : 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                cursor: 'pointer',
                color: settings.quality === option.value ? 'white' : 'var(--text-primary)'
              }}
            >
              <input
                type="radio"
                name="quality"
                value={option.value}
                checked={settings.quality === option.value}
                onChange={() => handleQualityChange(option.value)}
                style={{ marginRight: '1rem' }}
              />
              <div>
                <div style={{ fontWeight: '600' }}>{option.label}</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{option.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>AI Metadata Cleaning</h3>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '1rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          <input
            type="checkbox"
            checked={settings.autoClean}
            onChange={(e) => onSettingsChange({ autoClean: e.target.checked })}
            style={{ marginRight: '1rem' }}
          />
          <div>
            <div style={{ fontWeight: '600' }}>Enable AI Title Cleaning</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Remove "[Official Video]", "(HD)", year tags, and other YouTube artifacts
            </div>
          </div>
        </label>
      </div>

      <div>
        <h3>Application Info</h3>
        <div style={{ 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: '8px', 
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
            MPFree Desktop v1.0.0
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            AI-Powered YouTube Audio Converter by Daybreak Design
          </div>
        </div>

        <button className="btn" onClick={resetToDefaults} style={{ background: 'var(--surface-light)', color: 'var(--text-primary)' }}>
          <i className="fas fa-undo"></i>
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;