import React from 'react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'chat', label: 'MediGuide Chat' },
    { id: 'clinics', label: 'Find Clinics' },
    { id: 'library', label: 'Health Library' },
    { id: 'about', label: 'About' }
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => setCurrentPage('home')}>
          <svg className="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M12 9v6" />
            <path d="M9 12h6" />
          </svg>
          <span className="brand-name">MediGuide <span className="brand-highlight">AI</span></span>
        </div>

        <nav className="navbar-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <style>{`
        .navbar-header {
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--shadow-sm);
        }
        .navbar-container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          user-select: none;
        }
        .brand-icon {
          width: 1.75rem;
          height: 1.75rem;
          color: var(--color-primary);
        }
        .brand-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-text);
          letter-spacing: -0.01em;
        }
        .brand-highlight {
          color: var(--color-primary);
        }
        .navbar-links {
          display: flex;
          gap: 0.5rem;
        }
        .nav-btn {
          background: none;
          border: none;
          padding: 0.5rem 0.85rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-text-muted);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .nav-btn:hover {
          color: var(--color-primary);
          background-color: var(--color-primary-light);
        }
        .nav-btn.active {
          color: var(--color-primary);
          background-color: var(--color-primary-light);
          font-weight: 600;
        }
        @media (max-width: 640px) {
          .navbar-container {
            flex-direction: column;
            align-items: center;
            padding: 0.75rem 1rem;
            gap: 0.75rem;
          }
          .navbar-links {
            width: 100%;
            justify-content: space-around;
            overflow-x: auto;
          }
          .nav-btn {
            padding: 0.4rem 0.6rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </header>
  );
}
