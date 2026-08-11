import React from 'react';

export default function Disclaimer() {
  return (
    <div className="safety-disclaimer-box" role="alert">
      <div className="disclaimer-content">
        <svg className="disclaimer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <p className="disclaimer-text">
          <strong>Medical Guidance Disclaimer:</strong> MediGuide AI is an informational symptom guidance tool for the general audience. 
          It <strong>does not provide medical diagnoses, prescriptions, or treatment plans</strong>. 
          It is not a substitute for professional medical care. In case of a serious health concern, consult a qualified healthcare provider immediately.
        </p>
      </div>

      <style>{`
        .safety-disclaimer-box {
          background-color: #fff9e6; /* Soft amber/cream */
          border-left: 4px solid #d97706; /* Solid amber border */
          padding: 0.85rem 1.25rem;
          margin-top: auto; /* Push to bottom of flex containers if needed */
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .disclaimer-content {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .disclaimer-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #d97706;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }
        .disclaimer-text {
          font-size: 0.8rem;
          color: #78350f; /* Dark amber text for contrast */
          line-height: 1.45;
        }
        @media (max-width: 640px) {
          .safety-disclaimer-box {
            padding: 0.75rem 1rem;
          }
          .disclaimer-text {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
