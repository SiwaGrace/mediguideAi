import React from 'react';

export default function Home({ setCurrentPage }) {
  return (
    <div className="home-container fade-in">
      <section className="hero-section">
        <h1 className="hero-title">MediGuide <span className="title-teal">AI</span></h1>
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
          <button className="btn btn-primary btn-lg" onClick={() => setCurrentPage('chat')}>
            Consult MediGuide Chat
            <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => setCurrentPage('clinics')}>
            Find Nearby Clinics
          </button>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">How MediGuide AI Helps You</h2>
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
        <h3>🚨 Having a life-threatening symptom?</h3>
        <p>
          If you have severe chest pain, breathing struggles, speech slur, or continuous heavy bleeding, 
          do not search or chat. Go directly to a hospital emergency room immediately.
        </p>
        <button className="btn btn-danger" onClick={() => setCurrentPage('clinics')}>
          Get Emergency ER Locations
        </button>
      </section>

      <style>{`
        .home-container {
          padding-bottom: 3rem;
        }
        .hero-section {
          text-align: center;
          padding: 3rem 1.5rem 4rem;
          background: linear-gradient(180deg, var(--color-primary-light) 0%, rgba(248, 250, 252, 0) 100%);
          border-radius: var(--radius-lg);
          margin-bottom: 3rem;
          border: 1px solid rgba(13, 110, 110, 0.05);
        }
        .hero-title {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        .title-teal {
          color: var(--color-primary);
        }
        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--color-text-muted);
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }
        .hero-disclaimer {
          background-color: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          max-width: 750px;
          margin: 0 auto 2.5rem;
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
          line-height: 1.5;
        }
        .hero-ctas {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .btn-lg {
          padding: 0.9rem 1.75rem;
          font-size: 1.05rem;
        }
        .cta-arrow {
          width: 1.15rem;
          height: 1.15rem;
          transition: transform var(--transition-fast);
        }
        .btn-primary:hover .cta-arrow {
          transform: translateX(3px);
        }
        
        .features-section {
          margin-bottom: 4rem;
        }
        .section-title {
          text-align: center;
          font-size: 1.75rem;
          margin-bottom: 2rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .feature-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.75rem 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }
        .feature-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-primary);
        }
        .feature-icon-wrapper {
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
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
          font-size: 1.15rem;
          color: var(--color-text);
          margin-bottom: 0.5rem;
        }
        .feature-card p {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        .safety-summary-banner {
          background-color: var(--urgency-high-bg);
          border: 1px solid var(--urgency-high-border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          text-align: center;
          box-shadow: var(--shadow-md);
        }
        .safety-summary-banner h3 {
          color: var(--urgency-high-text);
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .safety-summary-banner p {
          color: var(--urgency-high-text);
          font-size: 0.95rem;
          max-width: 700px;
          margin: 0 auto 1.5rem;
          font-weight: 500;
          line-height: 1.5;
        }
        
        @media (max-width: 640px) {
          .hero-section {
            padding: 2rem 1rem;
          }
          .hero-title {
            font-size: 2.25rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }
          .btn-lg {
            width: 100%;
          }
          .safety-summary-banner {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
