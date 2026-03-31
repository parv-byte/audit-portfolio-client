import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    // Entry animation
    setTimeout(() => setNavVisible(true), 200);

    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // Track active section
      const sections = ['introduction', 'services', 'team', 'certificates', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Introduction', 'Services', 'Team', 'Certificates', 'Contact'];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '14px 40px' : '22px 40px',
      background: scrolled ? 'rgba(6,14,33,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      opacity: navVisible ? 1 : 0,
      transform: navVisible ? 'translateY(0)' : 'translateY(-20px)',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, border: '1.5px solid var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: 'rotate(45deg)',
        }}>
          <span style={{ transform: 'rotate(-45deg)', fontSize: 14, color: 'var(--gold)', fontWeight: 700 }}>B</span>
        </div>
        <div>
          <div style={{ fontFamily: 'Playfair Display', fontSize: '1rem', color: 'var(--cream)', letterSpacing: '0.05em' }}>
            Bpc Consultancy
          </div>
          <div style={{ fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Compliance Experts
          </div>
        </div>
      </div>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: 36 }} className="desktop-nav">
        {links.map(link => {
          const isActive = activeSection === link.toLowerCase();
          return (
            <button key={link} onClick={() => scrollTo(link)}
              style={{ background: 'none', border: 'none',
                color: isActive ? 'var(--gold)' : 'var(--cream-dim)',
                fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', padding: '4px 0',
                borderBottom: isActive ? '1px solid var(--gold)' : '1px solid transparent',
                transition: 'all 0.3s', fontFamily: 'DM Sans',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderBottomColor = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = isActive ? 'var(--gold)' : 'var(--cream-dim)'; e.currentTarget.style.borderBottomColor = isActive ? 'var(--gold)' : 'transparent'; }}
            >{link}</button>
          );
        })}
        <a href="/admin" style={{ padding: '8px 20px', background: 'transparent', border: '1px solid rgba(201,168,76,0.4)',
          color: 'var(--gold)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase',
          textDecoration: 'none', transition: 'all 0.3s', fontFamily: 'DM Sans',
        }}
          onMouseEnter={e => e.target.style.background = 'rgba(201,168,76,0.1)'}
          onMouseLeave={e => e.target.style.background = 'transparent'}
        >Admin</a>
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
        className="hamburger">
        <div style={{ width: 24, height: 2, background: 'var(--gold)', marginBottom: 5, transition: 'all 0.3s',
          transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <div style={{ width: 24, height: 2, background: 'var(--gold)', marginBottom: 5, opacity: menuOpen ? 0 : 1 }} />
        <div style={{ width: 24, height: 2, background: 'var(--gold)', transition: 'all 0.3s',
          transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(6,14,33,0.98)', borderBottom: '1px solid rgba(201,168,76,0.2)',
          padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{ background: 'none', border: 'none', color: 'var(--cream)', fontSize: '0.9rem',
                letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', textAlign: 'left',
                padding: '8px 0', borderBottom: '1px solid rgba(201,168,76,0.1)', fontFamily: 'DM Sans' }}
            >{link}</button>
          ))}
          <a href="/admin" style={{ color: 'var(--gold)', fontSize: '0.9rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', textDecoration: 'none', padding: '8px 0' }}>Admin</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
