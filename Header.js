import React from 'react';

const Header = ({ currentView, onViewChange, downloadsCount }) => {
  return (
    <header className="header">
      <div className="header__brand">
        <i className="fas fa-music"></i>
        MPFree
      </div>

      <nav className="header__nav">
        <button 
          className={`nav-button ${currentView === 'converter' ? 'nav-button--active' : ''}`}
          onClick={() => onViewChange('converter')}
        >
          <i className="fas fa-download"></i>
          Converter
        </button>

        <button 
          className={`nav-button ${currentView === 'library' ? 'nav-button--active' : ''}`}
          onClick={() => onViewChange('library')}
        >
          <i className="fas fa-folder-open"></i>
          Library ({downloadsCount})
        </button>

        <button 
          className={`nav-button ${currentView === 'settings' ? 'nav-button--active' : ''}`}
          onClick={() => onViewChange('settings')}
        >
          <i className="fas fa-cog"></i>
          Settings
        </button>
      </nav>
    </header>
  );
};

export default Header;