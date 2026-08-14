import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { id: 'home', to: '/', label: 'Home', icon: 'M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10' },
    { id: 'chat', to: '/chat', label: 'MediGuide Chat', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' },
    { id: 'clinics', to: '/clinics', label: 'Find Clinics', icon: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' },
    { id: 'library', to: '/library', label: 'Health Library', icon: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20' },
    { id: 'about', to: '/about', label: 'About', icon: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v6m0 4h.01' }
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-top-accent" />
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand" onClick={() => window.scrollTo(0, 0)}>
          <span className="brand-icon-badge">
            <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 9v6" />
              <path d="M9 12h6" />
            </svg>
          </span>
          <span className="brand-name">MediGuide<span className="brand-highlight">AI</span></span>
          <span className="brand-pill">Beta</span>
        </NavLink>

        <nav className="navbar-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
              end={item.to === '/'}
            >
              <svg className="nav-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.86);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--color-border);
          box-shadow: var(--shadow-xs);
        }
        .navbar-top-accent {
          height: 3px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-primary-soft), #38bdf8);
        }
        .navbar-container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0.8rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
        .navbar-brand:hover {
          text-decoration: none;
        }
        .brand-icon-badge {
          width: 2.15rem;
          height: 2.15rem;
          border-radius: 10px;
          background: var(--color-primary-grad);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px -3px rgba(13, 110, 110, 0.55);
        }
        .brand-icon {
          width: 1.25rem;
          height: 1.25rem;
        }
        .brand-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-text);
          letter-spacing: -0.02em;
        }
        .brand-highlight {
          background: var(--color-primary-grad);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .brand-pill {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-primary);
          background: var(--color-primary-light);
          border: 1px solid rgba(13, 110, 110, 0.2);
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
        }
        .navbar-links {
          display: flex;
          gap: 0.3rem;
        }
        .nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: none;
          border: none;
          padding: 0.5rem 0.85rem;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--color-text-muted);
          border-radius: 9999px;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-decoration: none;
        }
        .nav-btn:hover {
          color: var(--color-primary);
          background-color: var(--color-primary-light);
          text-decoration: none;
        }
        .nav-btn-icon {
          width: 1.05rem;
          height: 1.05rem;
          opacity: 0.75;
          transition: opacity var(--transition-fast);
        }
        .nav-btn.active {
          color: var(--color-primary);
          background-color: var(--color-primary-light);
          font-weight: 700;
          box-shadow: inset 0 0 0 1px rgba(13, 110, 110, 0.18);
        }
        .nav-btn.active .nav-btn-icon {
          opacity: 1;
        }
        @media (max-width: 720px) {
          .navbar-container {
            flex-direction: column;
            align-items: flex-start;
            padding: 0.7rem 1rem;
            gap: 0.6rem;
          }
          .navbar-links {
            width: 100%;
            justify-content: space-between;
            overflow-x: auto;
            padding-bottom: 0.15rem;
          }
          .nav-btn {
            padding: 0.45rem 0.7rem;
            font-size: 0.82rem;
          }
          .nav-btn-icon {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
