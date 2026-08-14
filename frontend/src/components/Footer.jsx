import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/chat', label: 'MediGuide Chat' },
    { to: '/clinics', label: 'Find Clinics' },
    { to: '/library', label: 'Health Library' },
    { to: '/about', label: 'About' }
  ];

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 9v6" />
              <path d="M9 12h6" />
            </svg>
          </span>
          <div>
            <p className="footer-brand-name">MediGuide AI</p>
            <p className="footer-tagline">Symptom guidance, urgency triage, and clinic access for Ghana & West Africa.</p>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MediGuide AI. For informational purposes only — not medical advice.</span>
      </div>

      <style>{`
        .app-footer {
          background: #0d1b2a;
          color: #cbd5e1;
          border-top: 3px solid var(--color-primary);
        }
        .footer-container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 2.25rem 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .footer-brand {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          max-width: 420px;
        }
        .footer-brand-icon {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 10px;
          background: var(--color-primary-grad);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .footer-brand-icon svg {
          width: 1.25rem;
          height: 1.25rem;
        }
        .footer-brand-name {
          font-family: var(--font-display);
          font-weight: 700;
          color: white;
          font-size: 1.05rem;
          margin-bottom: 0.25rem;
        }
        .footer-tagline {
          font-size: 0.85rem;
          line-height: 1.5;
          color: #94a3b8;
        }
        .footer-links {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
        }
        .footer-links a {
          background: none;
          border: 1px solid rgba(203, 213, 225, 0.15);
          color: #cbd5e1;
          font-size: 0.82rem;
          font-weight: 500;
          padding: 0.4rem 0.8rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-decoration: none;
          display: inline-block;
        }
        .footer-links a:hover {
          background: rgba(13, 110, 110, 0.35);
          border-color: var(--color-primary-soft);
          color: white;
          text-decoration: none;
        }
        .footer-bottom {
          border-top: 1px solid rgba(148, 163, 184, 0.15);
          padding: 1rem;
          text-align: center;
          font-size: 0.78rem;
          color: #94a3b8;
        }
        @media (max-width: 640px) {
          .footer-container {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
      `}</style>
    </footer>
  );
}
