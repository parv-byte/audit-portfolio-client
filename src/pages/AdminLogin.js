import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

const AdminLogin = () => {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await API.post('/auth/login', { password });
      login(res.data.token);
    } catch (err) {
      setError('Invalid password. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--navy-dark)', padding: 20, position: 'relative' }}>
      {/* BG grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 52, height: 52, border: '1.5px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: 'rotate(45deg)', margin: '0 auto 20px' }}>
            <span style={{ transform: 'rotate(-45deg)', fontSize: 20, color: 'var(--gold)', fontWeight: 700 }}>A</span>
          </div>
          <h1 style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem', color: 'var(--cream)', marginBottom: 6 }}>Admin Panel</h1>
          <p style={{ color: 'var(--cream-dim)', fontSize: '0.85rem' }}>Audit Portfolio Management</p>
        </div>

        <div style={{ background: 'rgba(26,39,68,0.6)', border: '1px solid rgba(201,168,76,0.18)',
          padding: '40px 36px', backdropFilter: 'blur(20px)' }}>
          <div style={{ height: 2, background: 'linear-gradient(90deg, var(--gold-dim), var(--gold))',
            marginBottom: 32, marginLeft: -36, marginRight: -36, marginTop: -40 }} />

          <form onSubmit={handleSubmit}>
            <label style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--gold)',
              textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Admin Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              required placeholder="Enter admin password" className="form-input"
              style={{ marginBottom: 8 }} />

            {error && (
              <div style={{ padding: '10px 14px', background: 'rgba(255,69,58,0.1)',
                border: '1px solid rgba(255,69,58,0.3)', color: '#ff453a',
                fontSize: '0.82rem', borderRadius: 2, marginBottom: 16 }}>{error}</div>
            )}

            <button type="submit" disabled={loading} className="btn-gold"
              style={{ width: '100%', justifyContent: 'center', marginTop: 20,
                opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Authenticating...' : 'Enter Admin Panel →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, color: 'var(--cream-dim)', fontSize: '0.8rem' }}>
          <a href="/" style={{ color: 'var(--gold)', textDecoration: 'none' }}>← Back to Portfolio</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
