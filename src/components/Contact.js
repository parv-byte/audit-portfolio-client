import React, { useState, useRef, useEffect } from 'react';
import API from '../utils/api';

const Contact = ({ data }) => {
  const contact = data?.contact || {};
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await API.post('/contact', form);
      setStatus('success');
      setMsg(res.data.message);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" style={{ padding: '110px 40px', background: 'rgba(13,27,62,0.4)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 70 }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: 20 }}>Reach Us</div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--cream)', marginBottom: 16 }}>
            Contact <span className="gold-text">Us</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 60,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)',
          transition: 'all 0.8s ease' }}>

          {/* Info panel */}
          <div className="scroll-slide-left">
            <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.6rem', color: 'var(--cream)', marginBottom: 12 }}>
              Let's Work Together
            </h3>
            <p style={{ color: 'var(--cream-dim)', lineHeight: 1.8, marginBottom: 40, fontSize: '0.92rem' }}>
              Whether you need statutory audit services, government liaison support, or compliance certifications — our experienced team is ready to assist.
            </p>

            {[
              { icon: '✉', label: 'Email', value: contact.email || 'contact@auditfirm.com' },
              { icon: '📞', label: 'Phone', value: contact.phone || '+91 XXXXX XXXXX' },
              { icon: '📍', label: 'Location', value: contact.address || 'India' },
              { icon: '🕐', label: 'Working Hours', value: contact.workingHours || 'Mon – Sat: 9AM – 6PM' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 18, marginBottom: 28, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, background: 'rgba(201,168,76,0.1)',
                  border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)',
                    textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</p>
                  <p style={{ color: 'var(--cream)', fontSize: '0.92rem' }}>{item.value}</p>
                </div>
              </div>
            ))}

            {/* Decorative audit list */}
            <div style={{ marginTop: 36, padding: '24px', background: 'rgba(201,168,76,0.05)',
              border: '1px solid rgba(201,168,76,0.12)' }}>
              <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)',
                textTransform: 'uppercase', marginBottom: 14 }}>We Specialize In</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['SMETA', 'BSCI', 'SEPE', 'WCA', 'GSV', 'SCAN', 'CT-PAT', 'ISO 9001', 'SAKON'].map(s => (
                  <span key={s} style={{ fontSize: '0.7rem', padding: '3px 10px',
                    border: '1px solid rgba(201,168,76,0.2)', color: 'var(--cream-dim)' }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="scroll-slide-right" onSubmit={handleSubmit}>
            <div style={{ background: 'rgba(26,39,68,0.5)', border: '1px solid rgba(201,168,76,0.15)',
              padding: '40px 36px' }}>
              <div style={{ height: 2, background: 'linear-gradient(90deg, var(--gold-dim), var(--gold))',
                marginBottom: 36, marginLeft: -36, marginRight: -36, marginTop: -40, borderRadius: '0' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--gold)',
                    textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    placeholder="Your full name" className="form-input" />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--gold)',
                    textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required
                    placeholder="your@email.com" className="form-input" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--gold)',
                    textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX" className="form-input" />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--gold)',
                    textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Enquiry subject" className="form-input" />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--gold)',
                  textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required
                  placeholder="Tell us about your audit requirements..." className="form-input" />
              </div>

              {msg && (
                <div style={{ padding: '12px 16px', marginBottom: 20, borderRadius: 2,
                  background: status === 'success' ? 'rgba(52,199,89,0.1)' : 'rgba(255,69,58,0.1)',
                  border: `1px solid ${status === 'success' ? 'rgba(52,199,89,0.3)' : 'rgba(255,69,58,0.3)'}`,
                  color: status === 'success' ? '#34c759' : '#ff453a', fontSize: '0.85rem' }}>
                  {msg}
                </div>
              )}

              <button type="submit" disabled={status === 'loading'} className="btn-gold"
                style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}>
                {status === 'loading' ? 'Sending...' : 'Send Message →'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
