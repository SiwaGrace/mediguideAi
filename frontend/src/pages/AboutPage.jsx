import React from 'react';

export default function AboutPage() {
  return (
    <div className="about-container fade-in">
      <section className="about-header">
        <span className="section-eyebrow">
          <svg className="eyebrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          About the platform
        </span>
        <h1>About MediGuide AI</h1>
        <p className="subtitle">Learn about our mission, boundaries of safety, and technology stack.</p>
      </section>

      <section className="about-content card">
        <div className="about-section">
          <div className="about-section-head">
            <span className="about-section-icon teal-bg">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
            </span>
            <h2>Our Goal</h2>
          </div>
          <p>
            MediGuide AI is designed to improve access to healthcare information and resources in Ghana and West Africa.
            By combining keyword-based skill routing with structured AI language generation, we provide instant
            symptom-level guidance, health education, and direct paths to regional clinics.
          </p>
        </div>

        <div className="about-section boundaries-section">
          <div className="about-section-head">
            <span className="about-section-icon red-bg">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v6m0 4h.01" /></svg>
            </span>
            <h2>Strict Boundaries of Operation</h2>
          </div>
          <p>
            Because healthcare involves safety-critical decisions, MediGuide AI is bound by non-negotiable safety guardrails:
          </p>
          <ul className="safety-rules-list">
            <li>
              <strong>No Diagnosis:</strong> We never diagnose specific diseases (e.g. telling you 'you have typhoid fever').
              Instead, we describe potential indications and explain when it is important to see a clinical professional.
            </li>
            <li>
              <strong>No Medication Dosages:</strong> We never suggest drug dosages, nor do we encourage self-medication (especially with antibiotics or antimalarials, to prevent resistance).
            </li>
            <li>
              <strong>No Emergencies:</strong> Our system is equipped with automated triggers. If a user describes life-threatening symptoms, the assistant short-circuits to provide warning messages and direct them to local 24/7 emergency rooms immediately.
            </li>
            <li>
              <strong>No Certainty Claims:</strong> All guidance is probabilistic. We use cautious language ('may indicate', 'could be related to') rather than asserting facts.
            </li>
          </ul>
        </div>

        <div className="about-section">
          <div className="about-section-head">
            <span className="about-section-icon amber-bg">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
            </span>
            <h2>When to Seek In-Person Care</h2>
          </div>
          <p>
            You should visit a GP, public polyclinic, or hospital immediately if:
          </p>
          <ul className="care-criteria-list">
            <li>Symptoms persist or worsen beyond 24 to 48 hours.</li>
            <li>You are seeking care for an infant or young child, as symptoms like high fever, vomiting, and diarrhea can escalate very rapidly in children.</li>
            <li>You experience severe pain, high fever above 39°C, or sudden shortness of breath.</li>
          </ul>
        </div>

        <div className="about-section tech-section">
          <div className="about-section-head">
            <span className="about-section-icon blue-bg">
              <svg className="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
            </span>
            <h2>Technology & Reliability</h2>
          </div>
          <p>
            MediGuide AI utilizes an offline keyword-matching router. In cases of internet loss or OpenRouter connection errors,
            the system switches to built-in offline diagnostic trees. This ensures that users can access self-care advice and
            local clinic maps even on variable or low-bandwidth mobile connections.
          </p>
        </div>
      </section>

      <style>{`
        .about-container {
          padding-bottom: 4rem;
        }
        .eyebrow-icon {
          width: 0.9rem;
          height: 0.9rem;
        }
        .subtitle {
          color: var(--color-text-muted);
          margin-bottom: 2rem;
        }
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }
        .about-section-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.75rem;
          margin-bottom: 1rem;
        }
        .about-section-head h2 {
          border: none;
          padding: 0;
          margin: 0;
          font-size: 1.3rem;
        }
        .about-section-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--shadow-xs);
        }
        .section-icon {
          width: 1.25rem;
          height: 1.25rem;
        }
        .teal-bg { background-color: var(--color-primary-light); color: var(--color-primary); }
        .amber-bg { background-color: #fef3c7; color: #b45309; }
        .blue-bg { background-color: #e0f2fe; color: #0369a1; }
        .red-bg { background-color: var(--urgency-high-bg); color: var(--urgency-high-text); }
        .about-section p {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--color-text);
        }
        .boundaries-section {
          background-color: var(--color-primary-light);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
        }
        .safety-rules-list, .care-criteria-list {
          list-style: none;
          padding-left: 0;
          margin-top: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .safety-rules-list li, .care-criteria-list li {
          font-size: 0.9rem;
          line-height: 1.55;
          color: var(--color-text);
          padding-left: 1.4rem;
          position: relative;
        }
        .safety-rules-list li::before {
          content: "⛔";
          position: absolute;
          left: 0;
          top: 0;
          font-size: 0.8rem;
        }
        .care-criteria-list li::before {
          content: "•";
          position: absolute;
          left: 0.2rem;
          top: -0.15rem;
          color: var(--color-primary);
          font-size: 1.2rem;
        }
        .safety-rules-list strong {
          color: var(--color-primary);
        }
        .tech-section {
          opacity: 0.95;
        }
        @media (max-width: 640px) {
          .boundaries-section {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
