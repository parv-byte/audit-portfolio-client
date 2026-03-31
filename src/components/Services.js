import React, { useRef, useEffect, useState } from 'react';

const auditServices = [
  'SMETA Audit', 'BSCI Audit', 'SEPE Audit', 'WCA Audit',
  'GSV Audit', 'SCAN Audit', 'CT-PAT Audit', 'Technical Audit (SOP & CoC)',
];

const ServiceCard = ({ title, icon, items, delay }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="card-hover" style={{
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(50px)',
      transition: `all 0.7s ease ${delay}s`,
      background: 'rgba(26,39,68,0.5)', border: '1px solid rgba(201,168,76,0.18)',
      padding: '36px 32px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Corner accent */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60,
        background: 'linear-gradient(225deg, rgba(201,168,76,0.15), transparent)' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0,
        borderStyle: 'solid', borderWidth: '0 28px 28px 0',
        borderColor: `transparent rgba(201,168,76,0.3) transparent transparent` }} />

      <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.4rem', color: 'var(--cream)', marginBottom: 8 }}>{title}</h3>
      <div style={{ width: 40, height: 1, background: 'var(--gold)', marginBottom: 24 }} />

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.88rem',
            color: 'var(--cream-dim)', lineHeight: 1.5 }}>
            <span style={{ color: 'var(--gold)', marginTop: 4, flexShrink: 0, fontSize: 10 }}>◆</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Services = ({ data }) => {
  const services = data?.services || [
    { id: 1, category: 'Statutory Audits', icon: '📋', items: auditServices },
    { id: 2, category: 'Government Liaison', icon: '🏛️', items: [
      'Liaison with Government Authorities',
      'Public Administration Consulting',
      'Regulatory Compliance Advisory',
      'Personnel Management & IR Support',
    ]},
  ];

  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTitleVisible(true); }, { threshold: 0.3 });
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" style={{ padding: '110px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* BG decoration */}
      <div className="parallax-blob" style={{ position: 'absolute', top: '50%', left: -200, width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.04), transparent)', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      <div className="parallax-blob-slow" style={{ position: 'absolute', bottom: '10%', right: -150, width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.03), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Title */}
        <div ref={titleRef} className="scroll-hidden" style={{ textAlign: 'center', marginBottom: 70,
          opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'none' : 'translateY(30px)',
          transition: 'all 0.8s ease' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>What We Do</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)', marginBottom: 16 }}>
            Our <span className="gold-text">Services</span>
          </h2>
          <div className="gold-divider" />
          <p style={{ color: 'var(--cream-dim)', maxWidth: 520, margin: '20px auto 0', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Comprehensive audit and compliance services recognized by international standards bodies.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
          {services.map((svc, i) => (
            <ServiceCard key={svc.id} title={svc.category} icon={svc.icon} items={svc.items} delay={i * 0.15} />
          ))}
        </div>

        {/* Audit types ticker */}
        <div style={{ marginTop: 60, padding: '24px 0', borderTop: '1px solid rgba(201,168,76,0.1)',
          borderBottom: '1px solid rgba(201,168,76,0.1)', overflow: 'hidden', position: 'relative' }}>
          <div style={{ display: 'flex', gap: 40, animation: 'marquee 20s linear infinite', whiteSpace: 'nowrap' }}>
            {[...auditServices, ...auditServices].map((s, i) => (
              <span key={i} style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.5)', flexShrink: 0 }}>
                {s} <span style={{ color: 'rgba(201,168,76,0.25)', margin: '0 8px' }}>◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  );
};

export default Services;
