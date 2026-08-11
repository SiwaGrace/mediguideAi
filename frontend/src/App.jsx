import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Disclaimer from './components/Disclaimer';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import ClinicsPage from './pages/ClinicsPage';
import HealthLibrary from './pages/HealthLibrary';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'chat':
        return <ChatPage setCurrentPage={setCurrentPage} />;
      case 'clinics':
        return <ClinicsPage />;
      case 'library':
        return <HealthLibrary />;
      case 'about':
        return <AboutPage />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Dynamic page content wrapper */}
      <main className="main-content">
        {renderPage()}
      </main>

      {/* Persistent safety medical disclaimer across all pages */}
      <Disclaimer />
    </div>
  );
}

export default App;
