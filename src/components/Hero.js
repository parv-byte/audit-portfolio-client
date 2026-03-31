import React, { useEffect, useState, useLayoutEffect } from 'react';
 
const Hero = ({ data }) => {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
 
  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
 
  useEffect(() => { setTimeout(() => setLoaded(true), 300); }, []);
 
  const profile = data?.profile || {};
 
  return (
    <section id="introduction" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      overflow: 'hidden',
      paddingTop: isMobile ? '80px' : '0',
    }}>
 
      {/* Video Background */}
      <video autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
 
      {/* Overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(6,14,33,0.92) 0%, rgba(13,27,62,0.80) 50%, rgba(6,14,33,0.88) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)' }} />
 
      {/* Decorative lines */}
      <div style={{ position: 'absolute', top: 0, left: '8%', width: 1, height: '100%', zIndex: 2,
        background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent)' }} />
      <div style={{ position: 'absolute', top: 0, right: '8%', width: 1, height: '100%', zIndex: 2,
        background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent)' }} />
 
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        maxWidth: 900,
        margin: '0 auto',
        padding: isMobile ? '20px 24px 40px' : '90px 40px 0',
        width: '100%',
      }}>
 
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(30px)',
          transition: 'all 1s ease 0.2s' }}>
          <div className="section-label" style={{ marginBottom: 28 }}>
            HR & Compliance Professionals
          </div>
        </div>
 
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(40px)',
          transition: 'all 1s ease 0.4s' }}>
          <h1 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2.6rem, 6vw, 5rem)',
            lineHeight: 1.1, marginBottom: 24, color: 'var(--cream)' }}>
            {profile.firmName || 'HR & Compliance'}<br/>
            <span className="gold-text">Professionals</span>
          </h1>
        </div>
 
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(40px)',
          transition: 'all 1s ease 0.6s' }}>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--cream-dim)', maxWidth: 560,
            lineHeight: 1.8, marginBottom: 20, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 300 }}>
            {profile.subtitle || 'Statutory Audit | Government Liaison | ISO Certification'}
          </p>
          <p style={{ fontSize: '0.95rem', color: 'rgba(212,201,176,0.7)', maxWidth: 520, lineHeight: 1.8, marginBottom: 48 }}>
            {profile.description || 'Expert audit and compliance services trusted by organizations across India.'}
          </p>
        </div>
 
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(40px)',
          transition: 'all 1s ease 0.8s', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <button className="btn-gold"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Our Services
          </button>
          <button className="btn-outline"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get In Touch
          </button>
        </div>
 
        {/* Animated stat counters */}
        <div style={{ opacity: loaded ? 1 : 0, transition: 'all 1s ease 1s',
          marginTop: 48, display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '7', label: 'Audit Standards' },
            { value: '100+', label: 'Clients Served' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Playfair Display', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                color: 'var(--gold)', fontWeight: 700, lineHeight: 1,
                animation: loaded ? `countUp 0.6s ease ${1.2 + i * 0.15}s both` : 'none',
              }}>{stat.value}</div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(212,201,176,0.6)', marginTop: 6 }}>{stat.label}</div>
            </div>
          ))}
        </div>
 
        {/* Audit badges */}
        <div style={{ opacity: loaded ? 1 : 0, transition: 'all 1s ease 1.1s',
          marginTop: 60, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {['SMETA', 'BSCI', 'WCA', 'GSV', 'SCAN', 'CT-PAT', 'ISO 9001'].map(badge => (
            <span key={badge} style={{ padding: '5px 14px', border: '1px solid rgba(201,168,76,0.25)',
              fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase',
              background: 'rgba(201,168,76,0.06)', borderRadius: 2 }}>{badge}</span>
          ))}
        </div>
      </div>
 
      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        animation: 'float 2s ease-in-out infinite' }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 50, background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
      </div>
    </section>
  );
};
 
export default Hero;
