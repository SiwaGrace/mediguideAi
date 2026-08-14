import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container fade-in">
      <section className="hero-section">
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <span className="section-eyebrow hero-eyebrow">
          <svg className="eyebrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z" />
          </svg>
          AI-Powered Health Guidance
        </span>

        <h1 className="hero-title">
          MediGuide <span className="title-gradient">AI</span>
        </h1>
        <p className="hero-subtitle">
          Health guidance, urgency triage, and local healthcare clinic mapping for general health access in Ghana and West Africa.
        </p>

        <div className="hero-disclaimer">
          <svg className="warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div className="warning-text">
            <strong>Important Safety Notice:</strong> This assistant is <strong>NOT</strong> a diagnosis tool. It cannot replace a doctor, prescribe dosages, or diagnose specific diseases. It is designed to provide symptom-level guidance and help locate local care.
          </div>
        </div>

        <div className="hero-ctas">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/chat')}>
            Consult MediGuide Chat
            <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => navigate('/clinics')}>
            <svg className="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Find Nearby Clinics
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-value">24/7</span>
            <span className="hero-stat-label">Urgency Triage</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">4+</span>
            <span className="hero-stat-label">Health Topics</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">7</span>
            <span className="hero-stat-label">Verified Clinics</span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-head">
          <span className="section-eyebrow">What we do</span>
          <h2 className="section-title">How MediGuide AI Helps You</h2>
        </div>
        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon-wrapper teal-bg">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
            </div>
            <h3>Symptom Guidance</h3>
            <p>Describe your concerns (e.g. malaria signs, pregnancy symptoms, headaches) to get structured safety resources and guidance.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper amber-bg">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>Urgency Triage</h3>
            <p>Every guidance response shows an explicit urgency rating (Low, Medium, or High) so you know when to seek immediate clinical treatment.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper blue-bg">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3>Clinic Access Directory</h3>
            <p>Find local healthcare centers, maternity clinics, rapid test pharmacies, and 24/7 ERs near your location in Ghana.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper green-bg">
              <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
              </svg>
            </div>
            <h3>Health Education</h3>
            <p>Learn about common regional health topics, including malaria preventative care and chronic hypertension management.</p>
          </div>

        </div>
      </section>

      <section className="safety-summary-banner">
        <div className="safety-banner-inner">
          <span className="safety-banner-icon">🚨</span>
          <div className="safety-banner-text">
            <h3>Having a life-threatening symptom?</h3>
            <p>
              If you have severe chest pain, breathing struggles, speech slur, or continuous heavy bleeding,
              do not search or chat. Go directly to a hospital emergency room immediately.
            </p>
          </div>
        </div>
        <button className="btn btn-danger" onClick={() => navigate('/clinics')}>
          Get Emergency ER Locations
        </button>
      </section>

      <style>{`
        .home-container {
          padding-bottom: 2rem;
        }
        .hero-section {
          position: relative;
          overflow: hidden;
          text-align: center;
          padding: 3.5rem 1.5rem 3rem;
          background: linear-gradient(180deg, var(--color-primary-light) 0%, var(--color-bg) 100%);
          border-radius: var(--radius-xl);
          margin-bottom: 3.5rem;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.35;
          pointer-events: none;
        }
        .hero-glow-1 {
          width: 380px;
          height: 380px;
          background: rgba(20, 184, 166, 0.35);
          top: -180px;
          left: -100px;
        }
        .hero-glow-2 {
          width: 320px;
          height: 320px;
          background: rgba(56, 189, 248, 0.3);
          bottom: -160px;
          right: -80px;
        }
        .hero-eyebrow {
          position: relative;
        }
        .eyebrow-icon {
          width: 0.9rem;
          height: 0.9rem;
        }
        .hero-title {
          position: relative;
          font-size: clamp(2.6rem, 7vw, 4.25rem);
          margin-bottom: 0.75rem;
          color: var(--color-text);
        }
        .title-gradient {
          background: linear-gradient(120deg, #0d6e6e 10%, #0f9e9e 45%, #0ea5e9 90%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          position: relative;
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          color: var(--color-text-muted);
          max-width: 680px;
          margin: 0 auto 2rem;
          line-height: 1.65;
        }
        .hero-disclaimer {
          position: relative;
          background-color: rgba(255, 251, 235, 0.9);
          border: 1px solid #fde68a;
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          max-width: 760px;
          margin: 0 auto 2.25rem;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          text-align: left;
          box-shadow: var(--shadow-sm);
        }
        .warning-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #d97706;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }
        .warning-text {
          font-size: 0.875rem;
          color: #78350f;
          line-height: 1.55;
        }
        .hero-ctas {
          position: relative;
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .btn-lg {
          padding: 0.95rem 1.9rem;
          font-size: 1.05rem;
          border-radius: var(--radius-md);
        }
        .cta-arrow, .cta-icon {
          width: 1.15rem;
          height: 1.15rem;
          transition: transform var(--transition-fast);
        }
        .btn-primary:hover .cta-arrow {
          transform: translateX(4px);
        }
        .hero-stats {
          position: relative;
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-stat {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 0.85rem 1.6rem;
          box-shadow: var(--shadow-sm);
          min-width: 150px;
        }
        .hero-stat-value {
          display: block;
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--color-primary);
          letter-spacing: -0.02em;
        }
        .hero-stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-muted);
        }

        .features-section {
          margin-bottom: 3.5rem;
        }
        .section-head {
          text-align: center;
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: clamp(1.5rem, 3.5vw, 2rem);
          margin-bottom: 0;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .feature-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.75rem 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }
        .feature-icon-wrapper {
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          box-shadow: var(--shadow-xs);
        }
        .feature-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
        .teal-bg { background-color: var(--color-primary-light); color: var(--color-primary); }
        .amber-bg { background-color: #fef3c7; color: #b45309; }
        .blue-bg { background-color: #e0f2fe; color: #0369a1; }
        .green-bg { background-color: #d1fae5; color: #047857; }

        .feature-card h3 {
          font-family: var(--font-display);
          font-size: 1.15rem;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }
        .feature-card p {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        .safety-summary-banner {
          background-color: var(--urgency-high-bg);
          border: 1px solid var(--urgency-high-border);
          border-radius: var(--radius-xl);
          padding: 1.75rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          box-shadow: var(--shadow-md);
        }
        .safety-banner-inner {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          flex: 1;
          min-width: 260px;
        }
        .safety-banner-icon {
          font-size: 1.75rem;
          line-height: 1;
          margin-top: 0.1rem;
        }
        .safety-banner-text h3 {
          color: var(--urgency-high-text);
          font-size: 1.2rem;
          margin-bottom: 0.4rem;
        }
        .safety-banner-text p {
          color: #7a1411;
          font-size: 0.92rem;
          max-width: 640px;
          font-weight: 500;
          line-height: 1.55;
          margin: 0;
        }

        @media (max-width: 640px) {
          .hero-section {
            padding: 2.25rem 1rem 2rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }
          .btn-lg {
            width: 100%;
          }
          .hero-stat {
            min-width: 130px;
          }
          .safety-summary-banner {
            padding: 1.5rem;
            flex-direction: column;
            align-items: stretch;
            text-align: left;
          }
          .safety-summary-banner .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
