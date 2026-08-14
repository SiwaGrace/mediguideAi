import React from 'react';

export default function EmergencyBar({ onAction }) {
  return (
    <div className="emergency-alert-bar" role="alert">
      <div className="emergency-container">
        <div className="emergency-lhs">
          <span className="emergency-pulse-ring">
            <span className="pulse-dot"></span>
          </span>
          <span className="emergency-title">Medical Emergency?</span>
          <span className="emergency-desc">Chest pain, severe breathing difficulty, sudden weakness, or unconsciousness needs immediate care.</span>
        </div>
        <button className="emergency-btn" onClick={onAction}>
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Find Nearest ER Hospital
        </button>
      </div>

      <style>{`
        .emergency-alert-bar {
          background: linear-gradient(90deg, var(--urgency-high-bg), #fff1f0);
          border-bottom: 1px solid var(--urgency-high-border);
          padding: 0.85rem 1.25rem;
          width: 100%;
        }
        .emergency-container {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .emergency-lhs {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--urgency-high-text);
          flex: 1;
          min-width: 250px;
        }
        .emergency-pulse-ring {
          width: 10px;
          height: 10px;
          background-color: var(--urgency-high-text);
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .emergency-title {
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: -0.01em;
        }
        .emergency-desc {
          font-size: 0.85rem;
          font-weight: 500;
          opacity: 0.9;
        }
        .emergency-btn {
          background-color: var(--urgency-high-text);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 4px 6px var(--urgency-high-glow);
          transition: all var(--transition-fast);
          white-space: nowrap;
        }
        .emergency-btn:hover {
          background-color: #a81c19;
          transform: translateY(-1px);
        }
        .emergency-btn:active {
          transform: translateY(0);
        }
        .btn-icon {
          width: 1rem;
          height: 1rem;
        }
        @media (max-width: 768px) {
          .emergency-container {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }
          .emergency-lhs {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .emergency-desc {
            width: 100%;
          }
          .emergency-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
