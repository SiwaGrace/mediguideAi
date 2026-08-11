import React, { useState } from 'react';

const LIBRARY_ARTICLES = [
  {
    id: "malaria",
    title: "Malaria Information & Prevention",
    category: "Infectious Diseases",
    icon: "🦟",
    summary: "Understand transmission, symptoms, rapid testing, and treatment guidelines in regional areas.",
    content: {
      overview: "Malaria is a life-threatening disease transmitted by the bite of an infected female Anopheles mosquito. In Ghana, it remains one of the leading causes of outpatient visits. Early detection is key.",
      symptoms: [
        "High fever and chills",
        "Profuse sweating and headache",
        "Muscle aches and general fatigue",
        "Nausea, vomiting, and diarrhea"
      ],
      selfCare: "If you suspect malaria, the gold standard is to get a Rapid Diagnostic Test (RDT) at a pharmacy or clinic before taking medicine. Avoid self-medicating with antimalarials without confirmation. If positive, complete the full course of Artemisinin-based Combination Therapy (ACT) as prescribed. Sip oral rehydration fluids and rest.",
      prevention: [
        "Sleep under insecticide-treated mosquito nets (ITNs).",
        "Clear stagnant water pools around your home where mosquitoes breed.",
        "Use insect repellent creams and wear protective clothing in the evenings.",
        "Keep doors and windows closed or screened with mesh."
      ],
      warning: "Seek immediate clinical care if there is continuous vomiting, convulsions, yellowing of eyes (jaundice), severe weakness, or a fever that does not drop after 48 hours."
    }
  },
  {
    id: "hypertension",
    title: "Understanding Hypertension (High BP)",
    category: "Chronic Care",
    icon: "❤️",
    summary: "Learn about the 'silent killer', common causes, diet adjustments, and regular monitoring advice.",
    content: {
      overview: "Hypertension (high blood pressure) is often called a 'silent killer' because it rarely shows visible symptoms until serious damage has occurred. It increases the risk of stroke, heart attacks, and kidney failure.",
      symptoms: [
        "Often asymptomatic (no signs)",
        "Severe headaches (especially in the morning)",
        "Fatigue or confusion",
        "Vision changes or chest discomfort"
      ],
      selfCare: "Regular monitoring is essential. Adopt a DASH-style diet rich in whole grains, fruits, vegetables, and low-fat dairy. Significantly reduce salt (sodium) intake in local dishes. Engage in moderate physical activity, like brisk walking, for at least 30 minutes daily. Avoid smoking and limit alcohol.",
      prevention: [
        "Get your blood pressure checked at least once a month at a clinic or pharmacy.",
        "Maintain a healthy weight relative to your height.",
        "Manage emotional stress through breathing exercises and rest."
      ],
      warning: "Go to the emergency room immediately if blood pressure exceeds 180/120 mmHg, or if you experience chest pain, sudden numbness or weakness on one side of your face/body, or difficulty speaking."
    }
  },
  {
    id: "pregnancy",
    title: "Pregnancy & Prenatal Care Guidance",
    category: "Maternal Health",
    icon: "🤰",
    summary: "Essential advice for expectant mothers, including nutrition, supplements, and critical warning signs.",
    content: {
      overview: "Adequate prenatal care is vital for the health of both mother and baby. Registered clinics provide routine checks to monitor growth and manage common prenatal complications early.",
      symptoms: [
        "Missed periods",
        "Nausea/morning sickness",
        "Tiredness and frequent urination",
        "Breast tenderness"
      ],
      selfCare: "Register for antenatal care (ANC) at your local clinic as soon as you confirm pregnancy. Take daily folic acid and iron supplements as recommended by your midwife. Eat a balanced diet with protein, iron, and calcium. Drink plenty of water and get sufficient rest.",
      prevention: [
        "Avoid self-medication, alcohol, and tobacco during pregnancy.",
        "Sleep under mosquito nets, as pregnant mothers are highly vulnerable to malaria.",
        "Ensure immunizations (e.g. tetanus toxoid) are up to date."
      ],
      warning: "Seek emergency obstetric care immediately if you notice vaginal bleeding, severe abdominal pain/cramps, continuous severe headaches, blurred vision, sudden swelling of hands/face, or decreased baby movement."
    }
  },
  {
    id: "headache",
    title: "Headache Management & Self-Care",
    category: "Symptom Care",
    icon: "🤕",
    summary: "How to manage non-emergency headaches, stay hydrated, and recognize red flags.",
    content: {
      overview: "Headaches are extremely common and can be triggered by stress, dehydration, heat exposure, fatigue, or eye strain. Most tension headaches are manageable with basic self-care.",
      symptoms: [
        "Dull, aching head pain",
        "Sensation of tightness or pressure across the forehead",
        "Tenderness in neck and shoulder muscles"
      ],
      selfCare: "Drink a large glass of water immediately, as dehydration is a primary trigger. Rest in a dark, quiet room. Apply a cool compress to your forehead or the back of your neck. Try relaxation techniques or gentle neck stretches.",
      prevention: [
        "Maintain regular sleep patterns and avoid skipping meals.",
        "Stay hydrated throughout the day, especially in hot weather.",
        "Reduce screen time and take regular breaks from computers/phones."
      ],
      warning: "Seek emergency medical evaluation if you experience a sudden, severe headache ('the worst headache of your life'), or if the headache is accompanied by fever, neck stiffness, confusion, seizures, or difficulty speaking."
    }
  }
];

export default function HealthLibrary() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="library-container fade-in">
      <section className="library-header">
        <h1>Health Education Library</h1>
        <p className="subtitle">
          Vetted, easy-to-understand health articles covering common symptoms and conditions in West Africa.
        </p>
      </section>

      {!selectedArticle ? (
        <section className="articles-grid-section">
          <div className="grid grid-cols-2">
            {LIBRARY_ARTICLES.map(article => (
              <div key={article.id} className="card article-card" onClick={() => setSelectedArticle(article)}>
                <div className="article-icon">{article.icon}</div>
                <span className="article-category">{article.category}</span>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-summary">{article.summary}</p>
                <button className="read-more-link">Read full guide →</button>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="article-detail card">
          <button className="back-btn" onClick={() => setSelectedArticle(null)}>
            ← Back to Library
          </button>
          
          <div className="detail-header">
            <span className="article-icon-large">{selectedArticle.icon}</span>
            <div>
              <span className="article-category-badge">{selectedArticle.category}</span>
              <h2>{selectedArticle.title}</h2>
            </div>
          </div>

          <div className="detail-body">
            <div className="detail-section">
              <h4>Overview</h4>
              <p>{selectedArticle.content.overview}</p>
            </div>

            <div className="detail-section">
              <h4>Common Symptoms</h4>
              <ul>
                {selectedArticle.content.symptoms.map((s, idx) => <li key={idx}>{s}</li>)}
              </ul>
            </div>

            <div className="detail-section self-care-box">
              <h4>💡 Guidance & Self-Care Actions</h4>
              <p>{selectedArticle.content.selfCare}</p>
            </div>

            <div className="detail-section">
              <h4>Prevention Tips</h4>
              <ul>
                {selectedArticle.content.prevention.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>

            <div className="detail-section warning-box">
              <h4>🚨 Red Flag Symptoms (Go to Hospital Immediately)</h4>
              <p><strong>{selectedArticle.content.warning}</strong></p>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .library-container {
          padding-bottom: 4rem;
        }
        .subtitle {
          color: var(--color-text-muted);
          margin-bottom: 2rem;
        }
        .article-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .article-icon {
          font-size: 2rem;
          margin-bottom: 0.25rem;
        }
        .article-category {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .article-title {
          font-size: 1.25rem;
          color: var(--color-text);
          font-weight: 700;
        }
        .article-summary {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .read-more-link {
          background: none;
          border: none;
          color: var(--color-primary);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0;
          margin-top: auto;
        }
        .read-more-link:hover {
          text-decoration: underline;
        }

        .article-detail {
          animation: fadeIn 0.25s ease-out;
        }
        .back-btn {
          background: none;
          border: 1px solid var(--color-border);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-sm);
          color: var(--color-text-muted);
          cursor: pointer;
          font-weight: 500;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          transition: all var(--transition-fast);
        }
        .back-btn:hover {
          background-color: var(--color-bg);
          color: var(--color-text);
        }
        .detail-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 1rem;
        }
        .article-icon-large {
          font-size: 3rem;
        }
        .article-category-badge {
          background-color: var(--color-primary-light);
          color: var(--color-primary);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
          display: inline-block;
        }
        .detail-body {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .detail-section h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
        .detail-section p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text);
        }
        .detail-section ul {
          padding-left: 1.25rem;
        }
        .detail-section li {
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 0.35rem;
          color: var(--color-text);
        }
        .self-care-box {
          background-color: var(--color-primary-light);
          border-left: 4px solid var(--color-primary);
          padding: 1.25rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        .self-care-box h4 {
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }
        .warning-box {
          background-color: var(--urgency-high-bg);
          border-left: 4px solid var(--urgency-high-text);
          padding: 1.25rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }
        .warning-box h4 {
          color: var(--urgency-high-text);
          margin-bottom: 0.5rem;
        }
        .warning-box p {
          color: var(--urgency-high-text);
        }
      `}</style>
    </div>
  );
}
