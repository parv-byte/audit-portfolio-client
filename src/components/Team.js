import React, { useRef, useEffect, useState } from 'react';

const TeamCard = ({ member, delay }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="scroll-scale" style={{
      opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(50px)',
      transition: `all 0.8s ease ${delay}s`,
    }}>
      <div className="card-hover" style={{
        background: 'rgba(26,39,68,0.5)', border: '1px solid rgba(201,168,76,0.18)',
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Top gold bar */}
        <div style={{ height: 3, background: 'linear-gradient(90deg, var(--gold-dim), var(--gold), var(--gold-dim))' }} />

        {/* Avatar area */}
        <div style={{ padding: '40px 36px 32px', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 20, right: 20, fontSize: '0.65rem',
            letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase',
            background: 'rgba(201,168,76,0.1)', padding: '4px 10px', border: '1px solid rgba(201,168,76,0.2)' }}>
            {member.experience}
          </div>

          {/* Avatar circle */}
          <div style={{ width: 100, height: 100, borderRadius: '50%', margin: '0 auto 20px',
            background: member.image
              ? `url(${member.image}) center/cover`
              : 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(26,39,68,0.8))',
            border: '2px solid rgba(201,168,76,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', position: 'relative',
          }}>
            {!member.image && (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
            <div style={{ position: 'absolute', inset: -6, borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.15)' }} />
          </div>

          <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.4rem', color: 'var(--cream)', marginBottom: 6 }}>
            {member.name}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            {member.role}
          </p>
          <div style={{ width: 40, height: 1, background: 'var(--gold)', margin: '0 auto 20px' }} />
          <p style={{ fontSize: '0.88rem', color: 'var(--cream-dim)', lineHeight: 1.7 }}>{member.bio}</p>
        </div>

        {/* Qualifications */}
        <div style={{ padding: '0 36px 12px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold)',
            textTransform: 'uppercase', marginBottom: 12 }}>Academic Qualifications</p>
          {(member.qualifications || []).map((q, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0',
              borderBottom: '1px solid rgba(201,168,76,0.08)', fontSize: '0.84rem', color: 'var(--cream-dim)' }}>
              <span style={{ color: 'var(--gold)', fontSize: 8 }}>◆</span>{q}
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div style={{ padding: '16px 36px 36px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold)',
            textTransform: 'uppercase', marginBottom: 12 }}>Certifications</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(member.certificates || []).map((c, i) => (
              <span key={i} style={{ fontSize: '0.72rem', padding: '4px 12px',
                background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
                color: 'var(--gold)', borderRadius: 2 }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Team = ({ data }) => {
  const team = data?.team || [
    {
      id: 1, name: 'Senior Auditor I', experience: '15+ Years',
      role: 'Lead Statutory Auditor & Govt. Liaison',
      bio: 'Extensive experience in statutory audits and coordinating with government authorities across multiple sectors.',
      qualifications: ['PG in Public Administration', 'Diploma in Personnel Management & IR', 'LLB'],
      certificates: ['Lead Auditor — ISO 9001:2000', 'Internal Auditor — SAKON', 'SLCP Training'],
      image: '',
    },
    {
      id: 2, name: 'Senior Auditor II', experience: '12+ Years',
      role: 'Compliance & Technical Audit Specialist',
      bio: 'Specialist in SMETA, BSCI, WCA and international compliance auditing with deep technical expertise.',
      qualifications: ['PG in Public Administration', 'Diploma in Personnel Management & IR', 'LLB'],
      certificates: ['Lead Auditor — ISO 9001:2000', 'Internal Auditor — SAKON', 'SLCP Training'],
      image: '',
    },
  ];

  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTitleVisible(true); }, { threshold: 0.3 });
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="team" style={{ padding: '110px 40px', background: 'rgba(13,27,62,0.3)', position: 'relative' }}>
      <div className="parallax-blob" style={{ position: 'absolute', top: '30%', right: -150, width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.04), transparent)', pointerEvents: 'none' }} />
      <div className="parallax-blob-slow" style={{ position: 'absolute', bottom: '15%', left: -100, width: 300, height: 300,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.03), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div ref={titleRef} className="scroll-hidden" style={{ textAlign: 'center', marginBottom: 70,
          opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'none' : 'translateY(30px)',
          transition: 'all 0.8s ease' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>Our People</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)', marginBottom: 16 }}>
            Meet the <span className="gold-text">Team</span>
          </h2>
          <div className="gold-divider" />
          <p style={{ color: 'var(--cream-dim)', maxWidth: 500, margin: '20px auto 0', lineHeight: 1.8, fontSize: '0.95rem' }}>
            Two highly experienced professionals with combined expertise spanning statutory audits,
            government liaison, and international compliance certifications.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32 }}>
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={i * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
