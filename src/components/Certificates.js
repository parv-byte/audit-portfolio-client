import React, { useEffect, useState, useRef } from 'react';
import API from '../utils/api';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTitleVisible(true); }, { threshold: 0.3 });
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    API.get('/certificates')
      .then(res => { setCerts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="certificates" style={{ padding: '110px 40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.03), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div ref={titleRef} className="scroll-hidden" style={{ textAlign: 'center', marginBottom: 70,
          opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'none' : 'translateY(30px)',
          transition: 'all 0.8s ease' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>Credentials</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)', marginBottom: 16 }}>
            Certifications & <span className="gold-text">Credentials</span>
          </h2>
          <div className="gold-divider" />
          <p style={{ color: 'var(--cream-dim)', maxWidth: 520, margin: '20px auto 0', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Internationally recognized certifications demonstrating our commitment to audit excellence.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: 40, height: 40, border: '2px solid rgba(201,168,76,0.2)',
              borderTopColor: 'var(--gold)', borderRadius: '50%', margin: '0 auto 16px',
              animation: 'spin 1s linear infinite' }} />
            <p style={{ color: 'var(--cream-dim)', fontSize: '0.85rem' }}>Loading certificates...</p>
          </div>
        ) : certs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px',
            border: '1px dashed rgba(201,168,76,0.2)', borderRadius: 4 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
            <p style={{ color: 'var(--cream-dim)', marginBottom: 8 }}>No certificates uploaded yet.</p>
            <p style={{ color: 'rgba(212,201,176,0.4)', fontSize: '0.85rem' }}>
              Upload certificates from the <a href="/admin" style={{ color: 'var(--gold)' }}>Admin Panel</a>.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {certs.map((cert, i) => (
              <div key={cert._id} className="card-hover"
                onClick={() => setSelected(cert)}
                style={{ cursor: 'pointer', background: 'rgba(26,39,68,0.5)',
                  border: '1px solid rgba(201,168,76,0.18)', overflow: 'hidden',
                  opacity: 0, animation: `fadeUp 0.6s ease ${i * 0.1}s forwards`,
                }}>
                <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <img src={cert.imageUrl} alt={cert.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,14,33,0.8), transparent)' }} />
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <h4 style={{ fontFamily: 'Playfair Display', fontSize: '1rem', color: 'var(--cream)', marginBottom: 6 }}>{cert.title}</h4>
                  {cert.issuedBy && <p style={{ fontSize: '0.78rem', color: 'var(--gold)', marginBottom: 4 }}>{cert.issuedBy}</p>}
                  {cert.year && <p style={{ fontSize: '0.75rem', color: 'var(--cream-dim)' }}>{cert.year}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(6,14,33,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20, cursor: 'zoom-out',
        }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 700, width: '100%',
            background: 'var(--navy)', border: '1px solid rgba(201,168,76,0.2)', cursor: 'default' }}>
            <div style={{ height: 3, background: 'linear-gradient(90deg, var(--gold-dim), var(--gold))' }} />
            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
              <div>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.1rem', color: 'var(--cream)' }}>{selected.title}</h3>
                {selected.issuedBy && <p style={{ fontSize: '0.8rem', color: 'var(--gold)', marginTop: 2 }}>{selected.issuedBy}</p>}
              </div>
              <button onClick={() => setSelected(null)}
                style={{ background: 'none', border: 'none', color: 'var(--cream-dim)', fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1 }}>✕</button>
            </div>
            <img src={selected.imageUrl} alt={selected.title}
              style={{ width: '100%', maxHeight: 500, objectFit: 'contain', display: 'block', background: '#0a1428' }} />
          </div>
        </div>
      )}

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </section>
  );
};

export default Certificates;
