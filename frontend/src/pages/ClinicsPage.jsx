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
              
              <p className="clinic-address">📍 {clinic.location}</p>
              <p className="clinic-phone">📞 <a href={`tel:${clinic.phone}`}>{clinic.phone}</a></p>

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
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        .search-input {
          width: 100%;
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
          border-radius: var(--radius-md);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all var(--transition-normal);
        }
        .clinic-card-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .emergency-accent {
          border-left: 4px solid var(--urgency-high-text);
        }
        .clinic-card-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
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
        }
        .clinic-phone {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 1rem;
        }
        .clinic-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-top: auto;
          margin-bottom: 1.25rem;
        }
        .specialty-tag {
          background-color: var(--color-bg);
          border: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 500;
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
          font-weight: 600;
          color: #d97706;
          background-color: #fffbeb;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
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
