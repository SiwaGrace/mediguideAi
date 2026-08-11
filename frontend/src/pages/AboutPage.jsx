import React from 'react';

export default function AboutPage() {
  return (
    <div className="about-container fade-in">
      <section className="about-header">
        <h1>About MediGuide AI</h1>
        <p className="subtitle">Learn about our mission, boundaries of safety, and technology stack.</p>
      </section>

      <section className="about-content card">
        <div className="about-section">
          <h2>Our Goal</h2>
          <p>
            MediGuide AI is designed to improve access to healthcare information and resources in Ghana and West Africa. 
            By combining keyword-based skill routing with structured AI language generation, we provide instant 
            symptom-level guidance, health education, and direct paths to regional clinics.
          </p>
        </div>

        <div className="about-section boundaries-section">
          <h2>⛔ Strict Boundaries of Operation</h2>
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
          <h2>When to Seek In-Person Care</h2>
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
          <h2>Technology & Reliability</h2>
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
        .subtitle {
          color: var(--color-text-muted);
          margin-bottom: 2rem;
        }
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }
        .about-section h2 {
          font-size: 1.35rem;
          color: var(--color-primary);
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
        }
        .about-section p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text);
        }
        .boundaries-section {
          background-color: var(--color-primary-light);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }
        .boundaries-section h2 {
          color: var(--color-primary);
          border-bottom: none;
          padding-bottom: 0;
          margin-bottom: 0.75rem;
        }
        .safety-rules-list, .care-criteria-list {
          padding-left: 1.25rem;
          margin-top: 0.75rem;
        }
        .safety-rules-list li, .care-criteria-list li {
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 0.5rem;
          color: var(--color-text);
        }
        .safety-rules-list strong {
          color: var(--color-primary);
        }
        .tech-section {
          opacity: 0.85;
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
