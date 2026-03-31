import React from 'react';

const Footer = ({ data }) => {
  const contact = data?.contact || {};
  const year = new Date().getFullYear();

  return (
    <footer style={{ padding: '60px 40px 40px', borderTop: '1px solid rgba(201,168,76,0.12)',
      background: 'rgba(6,14,33,0.8)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, border: '1.5px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(45deg)' }}>
                <span style={{ transform: 'rotate(-45deg)', fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>B</span>
              </div>
              <div style={{ fontFamily: 'Playfair Display', fontSize: '1rem', color: 'var(--cream)' }}>
                HR & Compliance Professionals
              </div>
            </div>
            <p style={{ color: 'var(--cream-dim)', fontSize: '0.85rem', lineHeight: 1.8, maxWidth: 320 }}>
              Trusted audit and compliance experts with internationally recognized certifications.
              Serving clients across India with integrity and precision.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display', color: 'var(--gold)', fontSize: '1rem', marginBottom: 20 }}>Quick Links</h4>
            {['Introduction', 'Services', 'Team', 'Certificates', 'Contact'].map(link => (
              <button key={link} onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'block', background: 'none', border: 'none', color: 'var(--cream-dim)',
                  fontSize: '0.85rem', cursor: 'pointer', marginBottom: 10, textAlign: 'left', padding: 0,
                  transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--cream-dim)'}
              >{link}</button>
            ))}
          </div>

          {/* Audits */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display', color: 'var(--gold)', fontSize: '1rem', marginBottom: 20 }}>Audit Types</h4>
            {['SMETA', 'BSCI', 'SEPE', 'WCA', 'GSV', 'SCAN', 'CT-PAT', 'Technical Audit'].map(a => (
              <p key={a} style={{ color: 'var(--cream-dim)', fontSize: '0.82rem', marginBottom: 8 }}>◆ {a}</p>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 28,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(212,201,176,0.4)', fontSize: '0.78rem' }}>
            © {year} HR & Compliance Professionals. All rights reserved.
          </p>
          <p style={{ color: 'rgba(212,201,176,0.4)', fontSize: '0.78rem' }}>
            {contact.email || 'contact@auditfirm.com'}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
