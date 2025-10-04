import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import DownloadForm from './components/DownloadForm';
import LibraryView from './components/LibraryView';
import SettingsPanel from './components/SettingsPanel';
import ProgressModal from './components/ProgressModal';

function App() {
  const [currentView, setCurrentView] = useState('converter');
  const [downloads, setDownloads] = useState([]);
  const [settings, setSettings] = useState({
    quality: 'highest',
    outputPath: null,
    autoClean: true
  });
  const [downloadProgress, setDownloadProgress] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('mpfree-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    const savedDownloads = localStorage.getItem('mpfree-downloads');
    if (savedDownloads) {
      setDownloads(JSON.parse(savedDownloads));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mpfree-settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('mpfree-downloads', JSON.stringify(downloads));
  }, [downloads]);

  const handleDownload = async (url) => {
    if (!url) return;
    setIsDownloading(true);

    try {
      const result = await window.mpfreeAPI.downloadVideo(url, settings.quality);
      if (result.error) {
        throw new Error(result.error);
      }

      const newDownload = {
        id: Date.now(),
        url,
        filename: result.filename,
        path: result.path,
        metadata: result.metadata,
        downloadedAt: new Date().toISOString()
      };

      setDownloads(prev => [newDownload, ...prev]);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const deleteDownload = (id) => {
    setDownloads(prev => prev.filter(download => download.id !== id));
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'converter':
        return <DownloadForm onDownload={handleDownload} isDownloading={isDownloading} settings={settings} />;
      case 'library':
        return <LibraryView downloads={downloads} onDelete={deleteDownload} />;
      case 'settings':
        return <SettingsPanel settings={settings} onSettingsChange={handleSettingsChange} />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="App">
      <Header currentView={currentView} onViewChange={setCurrentView} downloadsCount={downloads.length} />
      <main className="main-content">{renderCurrentView()}</main>
      {isDownloading && <ProgressModal progress={Object.values(downloadProgress)[0] || 0} onCancel={() => setIsDownloading(false)} />}
    </div>
  );
}

export default App;