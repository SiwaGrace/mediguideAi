import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Disclaimer from './components/Disclaimer';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import ClinicsPage from './pages/ClinicsPage';
import HealthLibrary from './pages/HealthLibrary';
import AboutPage from './pages/AboutPage';

function AppShell() {
  const location = useLocation();
  const isChat = location.pathname.startsWith('/chat');

  return (
    <div className="app-container">
      <Navbar />

      {/* Dynamic page content wrapper */}
      <main className={`main-content ${isChat ? 'main-content-chat' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/clinics" element={<ClinicsPage />} />
          <Route path="/library" element={<HealthLibrary />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Persistent safety medical disclaimer across all pages */}
      <Disclaimer />

      {/* Site footer (hidden on chat for a distraction-free view) */}
      {!isChat && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
