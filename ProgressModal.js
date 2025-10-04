import React from 'react';

const ProgressModal = ({ progress, onCancel }) => {
  return (
    <div className="progress-modal">
      <div className="progress-content">
        <h3><i className="fas fa-download"></i> Converting Audio...</h3>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div style={{ marginBottom: '1rem' }}>{progress}% complete</div>

        <button className="btn" onClick={onCancel} style={{ background: 'var(--surface-light)', color: 'var(--text-primary)' }}>
          <i className="fas fa-times"></i>
          Cancel
        </button>

        <div style={{ 
          marginTop: '1rem', 
          fontSize: '0.875rem', 
          color: 'var(--text-secondary)'
        }}>
          <i className="fas fa-info-circle"></i>
          Processing may take a few moments depending on video length
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;