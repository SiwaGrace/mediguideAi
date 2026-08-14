import React, { useState } from 'react';

const MOCK_CLINICS = [
  {
    id: 1,
    name: "Greater Accra Regional Hospital (Ridge)",
    type: "Regional Hospital",
    distance: "1.2 km",
    location: "Castle Road, Ridge, Accra",
    phone: "+233 30 222 8121",
    specialties: ["24/7 Emergency", "Outpatient", "Surgery", "Pediatrics"],
    rating: 4.4,
    emergency: true
  },
  {
    id: 2,
    name: "Korle Bu Teaching Hospital",
    type: "Teaching Hospital",
    distance: "4.5 km",
    location: "Guggisberg Avenue, Korle Bu, Accra",
    phone: "+233 30 267 3033",
    specialties: ["24/7 Emergency", "Maternity", "Specialist Care", "Outpatient"],
    rating: 4.2,
    emergency: true
  },
  {
    id: 3,
    name: "37 Military Hospital",
    type: "Military Hospital",
    distance: "3.1 km",
    location: "Liberation Road, 37, Accra",
    phone: "+233 30 277 6111",
    specialties: ["24/7 Emergency", "Trauma", "Outpatient", "Pharmacy"],
    rating: 4.5,
    emergency: true
  },
  {
    id: 4,
    name: "St. Jude General Hospital",
    type: "Private General Hospital",
    distance: "2.8 km",
    location: "Ring Road Central, Kanda, Accra",
    phone: "+233 30 278 1234",
    specialties: ["24/7 Emergency", "General Medicine", "Outpatient"],
    rating: 4.1,
    emergency: true
  },
  {
    id: 5,
    name: "Kokomlemle Clinic & Maternity Home",
    type: "Maternity Clinic",
    distance: "0.8 km",
    location: "Fanaofili Street, Kokomlemle, Accra",
    phone: "+233 30 223 4567",
    specialties: ["Maternity", "Outpatient", "General Medicine", "Child Care"],
    rating: 4.0,
    emergency: false
  },
  {
    id: 6,
    name: "Accra Newtown Malaria Diagnostics (Amaa Pharmacy)",
    type: "Pharmacy & Diagnostic Point",
    distance: "0.5 km",
    location: "New Town Road, Accra Newtown",
    phone: "+233 24 456 7890",
    specialties: ["Rapid Testing", "Malaria Care", "Pharmacy"],
    rating: 4.3,
    emergency: false
  },
  {
    id: 7,
    name: "Adabraka Polyclinic",
    type: "Public Polyclinic",
    distance: "1.9 km",
    location: "Barnes Road, Adabraka, Accra",
    phone: "+233 30 222 6667",
    specialties: ["Outpatient", "Primary Care", "Maternity", "Immunization"],
    rating: 3.9,
    emergency: false
  }
];

export default function ClinicsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filterOptions = ["All", "Emergency", "Maternity", "Outpatient", "Testing"];

  const filteredClinics = MOCK_CLINICS.filter(clinic => {
    // 1. Filter by search query (name or location)
    const matchesSearch = 
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      clinic.location.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Filter by category
    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Emergency") return matchesSearch && clinic.emergency;
    
    // Check if the activeFilter string matches any of the specialties (case-insensitive)
    const hasSpecialty = clinic.specialties.some(spec => 
      spec.toLowerCase().includes(activeFilter.toLowerCase())
    );
    return matchesSearch && hasSpecialty;
  });

  return (
    <div className="clinics-container fade-in">
      <section className="clinics-header">
        <span className="section-eyebrow">
          <svg className="eyebrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Verified Healthcare Directory
        </span>
        <h1>Healthcare Clinics Directory</h1>
        <p className="subtitle">
          Find verified health centers, testing points, and emergency rooms near Kokomlemle, Ridge, and Accra central.
        </p>

        <div className="emergency-notice-card">
          <span className="notice-icon">⚠️</span>
          <div>
            <strong>Emergency Case?</strong> Ridge Regional, Korle Bu, and 37 Military hospitals have fully active 24/7 emergency departments. Call <strong>112</strong> or go directly.
          </div>
        </div>

        <div className="search-filter-controls">
          <input
            type="text"
            className="input-field search-input"
            placeholder="Search by hospital name, address, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="filter-tabs">
            {filterOptions.map(option => (
              <button
                key={option}
                className={`filter-tab ${activeFilter === option ? 'active' : ''}`}
                onClick={() => setActiveFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="clinics-list-section">
        <h2 className="results-count">Showing {filteredClinics.length} Health Facilities</h2>
        
        <div className="clinics-grid">
          {filteredClinics.map(clinic => (
            <div key={clinic.id} className={`clinic-card-item ${clinic.emergency ? 'emergency-accent' : ''}`}>
              <div className="clinic-card-header">
                <span className="clinic-type">{clinic.type}</span>
                <span className="clinic-distance">{clinic.distance} away</span>
              </div>
              
              <h3 className="clinic-name">
                {clinic.name}
                {clinic.emergency && <span className="er-indicator">24/7 ER</span>}
              </h3>
              
              <p className="clinic-address">
                <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                {clinic.location}
              </p>
              <p className="clinic-phone">
                <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                <a href={`tel:${clinic.phone}`}>{clinic.phone}</a>
              </p>

              <div className="clinic-specialties">
                {clinic.specialties.map(spec => (
                  <span 
                    key={spec} 
                    className={`specialty-tag ${spec.includes('Emergency') ? 'tag-danger' : ''} ${spec.includes('Maternity') ? 'tag-maternity' : ''}`}
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="clinic-footer">
                <span className="rating-badge">★ {clinic.rating}</span>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(clinic.name + ' ' + clinic.location)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline btn-sm"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredClinics.length === 0 && (
          <div className="no-results">
            <p>No clinics found matching "{searchQuery}" under filter "{activeFilter}".</p>
            <button className="btn btn-outline" onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}>Reset Search</button>
          </div>
        )}
      </section>

      <style>{`
        .clinics-container {
          padding-bottom: 4rem;
        }
        .eyebrow-icon {
          width: 0.9rem;
          height: 0.9rem;
        }
        .subtitle {
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
        }
        .emergency-notice-card {
          background-color: var(--urgency-high-bg);
          border: 1px solid var(--urgency-high-border);
          color: var(--urgency-high-text);
          padding: 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          line-height: 1.45;
        }
        .notice-icon {
          font-size: 1.25rem;
        }
        .search-filter-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background-color: var(--color-surface);
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        .search-input {
          width: 100%;
          padding-left: 2.6rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: 0.9rem center;
          background-size: 1.1rem;
        }
        .filter-tabs {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }
        .filter-tab {
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }
        .filter-tab:hover {
          background-color: var(--color-primary-light);
          color: var(--color-primary);
        }
        .filter-tab.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }
        
        .results-count {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-muted);
          margin: 2rem 0 1rem;
        }
        
        .clinics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .clinic-card-item {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: all var(--transition-normal);
        }
        .clinic-card-item:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-border-strong);
        }
        .emergency-accent::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--urgency-high-text), #f59e0b);
        }
        .clinic-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--color-text-muted);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .clinic-type {
          color: var(--color-primary);
          background: var(--color-primary-light);
          padding: 0.2rem 0.55rem;
          border-radius: 9999px;
          font-size: 0.68rem;
        }
        .clinic-distance {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }
        .clinic-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .er-indicator {
          background-color: var(--urgency-high-bg);
          color: var(--urgency-high-text);
          font-size: 0.7rem;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-weight: 700;
          border: 1px solid var(--urgency-high-border);
        }
        .clinic-address {
          font-size: 0.85rem;
          color: var(--color-text);
          margin-bottom: 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .clinic-phone {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .meta-icon {
          width: 0.9rem;
          height: 0.9rem;
          color: var(--color-primary);
          flex-shrink: 0;
        }
        .clinic-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: auto;
          margin-bottom: 1.25rem;
        }
        .specialty-tag {
          background-color: var(--color-surface-muted);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: 0.72rem;
          padding: 0.25rem 0.55rem;
          border-radius: 9999px;
          font-weight: 600;
        }
        .tag-danger {
          background-color: var(--urgency-high-bg);
          color: var(--urgency-high-text);
          border-color: var(--urgency-high-border);
        }
        .tag-maternity {
          background-color: #fce8f3;
          color: #b81d77;
          border-color: #f7bcdb;
        }
        .clinic-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--color-border);
          padding-top: 0.85rem;
        }
        .rating-badge {
          font-size: 0.85rem;
          font-weight: 700;
          color: #b45309;
          background-color: #fffbeb;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          border: 1px solid #fde68a;
        }
        .btn-sm {
          padding: 0.4rem 0.85rem;
          font-size: 0.8rem;
        }
        .no-results {
          text-align: center;
          padding: 3rem;
          background-color: var(--color-surface);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
        }
        .no-results p {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
