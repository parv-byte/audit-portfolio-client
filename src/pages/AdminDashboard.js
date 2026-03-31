import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';

/* ─── Small reusable UI ─────────────────────────────── */
const Label = ({ children }) => (
  <label style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--gold)',
    textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>{children}</label>
);
const Input = ({ style = {}, ...props }) => (
  <input {...props} className="form-input" style={{ marginBottom: 0, ...style }} />
);
const Textarea = ({ style = {}, ...props }) => (
  <textarea {...props} className="form-input" style={{ minHeight: 90, resize: 'vertical', ...style }} />
);
const SectionBox = ({ title, children }) => (
  <div style={{ background: 'rgba(26,39,68,0.5)', border: '1px solid rgba(201,168,76,0.15)',
    marginBottom: 28, overflow: 'hidden' }}>
    <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(201,168,76,0.1)',
      background: 'rgba(201,168,76,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 style={{ fontFamily: 'Playfair Display', color: 'var(--gold)', fontSize: '1rem' }}>{title}</h3>
    </div>
    <div style={{ padding: '24px' }}>{children}</div>
  </div>
);
const SaveBtn = ({ onClick, loading, saved }) => (
  <button onClick={onClick} disabled={loading} className="btn-gold"
    style={{ marginTop: 20, opacity: loading ? 0.7 : 1 }}>
    {loading ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
  </button>
);
const Toast = ({ msg, type }) => msg ? (
  <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, padding: '14px 20px',
    background: type === 'success' ? 'rgba(52,199,89,0.15)' : 'rgba(255,69,58,0.15)',
    border: `1px solid ${type === 'success' ? 'rgba(52,199,89,0.4)' : 'rgba(255,69,58,0.4)'}`,
    color: type === 'success' ? '#34c759' : '#ff453a', fontSize: '0.85rem', borderRadius: 4,
    boxShadow: '0 8px 30px rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)' }}>{msg}</div>
) : null;

/* ─── Profile Section ───────────────────────────────── */
const ProfileSection = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setForm(data || {}); }, [data]);

  const save = async () => {
    setLoading(true);
    await onSave('profile', form);
    setLoading(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <SectionBox title="Profile / Introduction">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div><Label>Firm Name</Label><Input value={form.firmName || ''} onChange={e => setForm({ ...form, firmName: e.target.value })} /></div>
        <div><Label>Tagline</Label><Input value={form.tagline || ''} onChange={e => setForm({ ...form, tagline: e.target.value })} /></div>
      </div>
      <div style={{ marginTop: 16 }}>
        <Label>Subtitle (shown under name)</Label>
        <Input value={form.subtitle || ''} onChange={e => setForm({ ...form, subtitle: e.target.value })} />
      </div>
      <div style={{ marginTop: 16 }}>
        <Label>Description</Label>
        <Textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} />
      </div>
      <SaveBtn onClick={save} loading={loading} saved={saved} />
    </SectionBox>
  );
};

/* ─── Contact Section ───────────────────────────────── */
const ContactSection = ({ data, onSave }) => {
  const [form, setForm] = useState(data || {});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setForm(data || {}); }, [data]);

  const save = async () => {
    setLoading(true);
    await onSave('contact', form);
    setLoading(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <SectionBox title="Contact Information">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div><Label>Email</Label><Input value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
        <div><Label>Phone</Label><Input value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
        <div><Label>Address</Label><Input value={form.address || ''} onChange={e => setForm({ ...form, address: e.target.value })} /></div>
        <div><Label>Working Hours</Label><Input value={form.workingHours || ''} onChange={e => setForm({ ...form, workingHours: e.target.value })} /></div>
      </div>
      <SaveBtn onClick={save} loading={loading} saved={saved} />
    </SectionBox>
  );
};

/* ─── Team Section ──────────────────────────────────── */
const TeamSection = ({ data, onSave }) => {
  const [team, setTeam] = useState(data || []);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRefs = useRef({});
  useEffect(() => { setTeam(data || []); }, [data]);

  const updateMember = (idx, field, value) => {
    const updated = [...team];
    updated[idx] = { ...updated[idx], [field]: value };
    setTeam(updated);
  };
  const updateList = (idx, field, listIdx, value) => {
    const updated = [...team];
    const list = [...(updated[idx][field] || [])];
    list[listIdx] = value;
    updated[idx] = { ...updated[idx], [field]: list };
    setTeam(updated);
  };

  const handleImageFile = (idx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      updateMember(idx, 'image', e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = (idx) => {
    updateMember(idx, 'image', '');
    if (fileRefs.current[idx]) fileRefs.current[idx].value = '';
  };

  const save = async () => {
    setLoading(true);
    await onSave('team', team);
    setLoading(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <SectionBox title="Team Members">
      {team.map((m, idx) => (
        <div key={m.id} style={{ marginBottom: 28, padding: 20,
          background: 'rgba(13,27,62,0.5)', border: '1px solid rgba(201,168,76,0.1)' }}>
          <h4 style={{ color: 'var(--gold)', fontFamily: 'Playfair Display', marginBottom: 16 }}>
            Member {idx + 1}: {m.name}
          </h4>

          {/* Photo upload area */}
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Preview */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%', flexShrink: 0,
              background: m.image
                ? `url(${m.image}) center/cover`
                : 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(26,39,68,0.8))',
              border: '2px solid rgba(201,168,76,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {!m.image && (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5"/>
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <Label>Photo (optional)</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <label style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                  padding: '8px 16px', background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)',
                  fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s',
                }}>
                  📷 Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={el => fileRefs.current[idx] = el}
                    onChange={e => handleImageFile(idx, e.target.files[0])}
                  />
                </label>
                {m.image && (
                  <button onClick={() => clearImage(idx)}
                    style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.3)',
                      color: '#ff453a', fontSize: '0.75rem', padding: '8px 14px', cursor: 'pointer' }}>
                    ✕ Remove
                  </button>
                )}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'rgba(212,201,176,0.4)', marginTop: 6 }}>
                Or paste a URL below — leave blank to show default avatar
              </p>
              <Input value={m.image && m.image.startsWith('data:') ? '' : (m.image || '')}
                onChange={e => updateMember(idx, 'image', e.target.value)}
                placeholder="https://... (optional)"
                style={{ marginTop: 6 }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div><Label>Name</Label><Input value={m.name || ''} onChange={e => updateMember(idx, 'name', e.target.value)} /></div>
            <div><Label>Role / Title</Label><Input value={m.role || ''} onChange={e => updateMember(idx, 'role', e.target.value)} /></div>
            <div><Label>Experience</Label><Input value={m.experience || ''} onChange={e => updateMember(idx, 'experience', e.target.value)} /></div>
          </div>
          <div style={{ marginTop: 14 }}>
            <Label>Bio</Label>
            <Textarea value={m.bio || ''} onChange={e => updateMember(idx, 'bio', e.target.value)} />
          </div>

          <div style={{ marginTop: 14 }}>
            <Label>Academic Qualifications (one per line)</Label>
            {(m.qualifications || []).map((q, qi) => (
              <Input key={qi} value={q} style={{ marginBottom: 8 }}
                onChange={e => updateList(idx, 'qualifications', qi, e.target.value)} />
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <Label>Certifications (one per line)</Label>
            {(m.certificates || []).map((c, ci) => (
              <Input key={ci} value={c} style={{ marginBottom: 8 }}
                onChange={e => updateList(idx, 'certificates', ci, e.target.value)} />
            ))}
          </div>
        </div>
      ))}
      <SaveBtn onClick={save} loading={loading} saved={saved} />
    </SectionBox>
  );
};

/* ─── Certificates Section ──────────────────────────── */
const CertificatesSection = () => {
  const [certs, setCerts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: '', issuedBy: '', year: '' });
  const [toast, setToast] = useState({ msg: '', type: '' });
  const fileRef = useRef();

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3000);
  };

  const fetchCerts = () => {
    API.get('/certificates').then(r => setCerts(r.data)).catch(() => {});
  };
  useEffect(() => { fetchCerts(); }, []);

  const handleUpload = async () => {
    const file = fileRef.current?.files[0];
    if (!file || !form.title) return showToast('Title and image are required', 'error');
    const fd = new FormData();
    fd.append('image', file);
    fd.append('title', form.title);
    fd.append('issuedBy', form.issuedBy);
    fd.append('year', form.year);
    setUploading(true);
    try {
      await API.post('/certificates', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      showToast('Certificate uploaded successfully!');
      setForm({ title: '', issuedBy: '', year: '' });
      fileRef.current.value = '';
      fetchCerts();
    } catch (e) {
      showToast(e.response?.data?.message || 'Upload failed', 'error');
    } finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      await API.delete(`/certificates/${id}`);
      showToast('Deleted successfully');
      fetchCerts();
    } catch { showToast('Delete failed', 'error'); }
  };

  return (
    <>
      <Toast msg={toast.msg} type={toast.type} />
      <SectionBox title="Upload Certificate">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 16 }}>
          <div><Label>Certificate Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Lead Auditor ISO 9001" /></div>
          <div><Label>Issued By</Label><Input value={form.issuedBy} onChange={e => setForm({ ...form, issuedBy: e.target.value })} placeholder="e.g. Bureau Veritas" /></div>
          <div><Label>Year</Label><Input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="e.g. 2023" /></div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <Label>Certificate Image (JPG/PNG/PDF)</Label>
          <input type="file" ref={fileRef} accept="image/*,application/pdf"
            style={{ color: 'var(--cream-dim)', fontSize: '0.85rem', display: 'block',
              padding: '10px 0', cursor: 'pointer' }} />
        </div>
        <button onClick={handleUpload} disabled={uploading} className="btn-gold"
          style={{ opacity: uploading ? 0.7 : 1 }}>
          {uploading ? 'Uploading to Cloudinary...' : '↑ Upload Certificate'}
        </button>
      </SectionBox>

      <SectionBox title={`Uploaded Certificates (${certs.length})`}>
        {certs.length === 0 ? (
          <p style={{ color: 'var(--cream-dim)', textAlign: 'center', padding: '30px 0', fontSize: '0.88rem' }}>
            No certificates yet. Upload one above.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
            {certs.map(cert => (
              <div key={cert._id} style={{ background: 'rgba(13,27,62,0.5)',
                border: '1px solid rgba(201,168,76,0.1)', overflow: 'hidden' }}>
                <div style={{ height: 150, overflow: 'hidden' }}>
                  <img src={cert.imageUrl} alt={cert.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '14px 14px 16px' }}>
                  <p style={{ color: 'var(--cream)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 4 }}>{cert.title}</p>
                  {cert.issuedBy && <p style={{ color: 'var(--gold)', fontSize: '0.75rem', marginBottom: 2 }}>{cert.issuedBy}</p>}
                  {cert.year && <p style={{ color: 'var(--cream-dim)', fontSize: '0.72rem', marginBottom: 12 }}>{cert.year}</p>}
                  <button onClick={() => handleDelete(cert._id)}
                    style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.3)',
                      color: '#ff453a', fontSize: '0.75rem', padding: '6px 14px', cursor: 'pointer',
                      width: '100%', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.target.style.background = 'rgba(255,69,58,0.2)'}
                    onMouseLeave={e => e.target.style.background = 'rgba(255,69,58,0.1)'}
                  >🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionBox>
    </>
  );
};

/* ─── Services Section ──────────────────────────────── */
const ServicesSection = ({ data, onSave }) => {
  const [services, setServices] = useState(data || []);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setServices(data || []); }, [data]);

  /* ── helpers ── */
  const updateSvc = (idx, field, val) => {
    const s = [...services];
    s[idx] = { ...s[idx], [field]: val };
    setServices(s);
  };

  const updateItem = (svcIdx, itemIdx, val) => {
    const s = [...services];
    const items = [...(s[svcIdx].items || [])];
    items[itemIdx] = val;
    s[svcIdx] = { ...s[svcIdx], items };
    setServices(s);
  };

  const addItem = (svcIdx) => {
    const s = [...services];
    s[svcIdx] = { ...s[svcIdx], items: [...(s[svcIdx].items || []), ''] };
    setServices(s);
  };

  const removeItem = (svcIdx, itemIdx) => {
    const s = [...services];
    const items = [...(s[svcIdx].items || [])];
    items.splice(itemIdx, 1);
    s[svcIdx] = { ...s[svcIdx], items };
    setServices(s);
  };

  const addService = () => {
    setServices([...services, {
      id: Date.now(),
      category: 'New Service',
      icon: '🔧',
      items: ['Service item 1'],
    }]);
  };

  const removeService = (idx) => {
    if (!window.confirm('Remove this service card?')) return;
    setServices(services.filter((_, i) => i !== idx));
  };

  const save = async () => {
    setLoading(true);
    await onSave('services', services);
    setLoading(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  /* common icon choices */
  const ICONS = ['📋','🏛️','🔍','📊','✅','🏆','🔧','⚖️','📑','🌐','💼','🛡️'];

  return (
    <SectionBox title="Services">
      {services.map((svc, svcIdx) => (
        <div key={svc.id} style={{
          marginBottom: 28, padding: 24,
          background: 'rgba(13,27,62,0.5)',
          border: '1px solid rgba(201,168,76,0.12)',
          position: 'relative',
        }}>
          {/* Remove card button */}
          <button onClick={() => removeService(svcIdx)} style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.3)',
            color: '#ff453a', fontSize: '0.72rem', padding: '4px 10px',
            cursor: 'pointer', borderRadius: 2,
          }}>✕ Remove Card</button>

          <h4 style={{ color: 'var(--gold)', fontFamily: 'Playfair Display', marginBottom: 18, fontSize: '1rem' }}>
            Service Card {svcIdx + 1}
          </h4>

          {/* Category + Icon */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, marginBottom: 16 }}>
            <div>
              <Label>Category / Title</Label>
              <Input
                value={svc.category || ''}
                onChange={e => updateSvc(svcIdx, 'category', e.target.value)}
                placeholder="e.g. Statutory Audits"
              />
            </div>
            <div>
              <Label>Icon (emoji)</Label>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <Input
                  value={svc.icon || ''}
                  onChange={e => updateSvc(svcIdx, 'icon', e.target.value)}
                  style={{ width: 64, textAlign: 'center', fontSize: '1.4rem', padding: '8px' }}
                />
              </div>
              {/* Quick-pick icons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                {ICONS.map(ic => (
                  <button key={ic} onClick={() => updateSvc(svcIdx, 'icon', ic)}
                    style={{
                      background: svc.icon === ic ? 'rgba(201,168,76,0.2)' : 'rgba(26,39,68,0.6)',
                      border: `1px solid ${svc.icon === ic ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.15)'}`,
                      cursor: 'pointer', fontSize: '1.1rem', padding: '3px 6px', borderRadius: 3,
                    }}>{ic}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Items list */}
          <div>
            <Label>Service Items</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(svc.items || []).map((item, itemIdx) => (
                <div key={itemIdx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: 'var(--gold)', fontSize: 10, flexShrink: 0 }}>◆</span>
                  <Input
                    value={item}
                    onChange={e => updateItem(svcIdx, itemIdx, e.target.value)}
                    placeholder={`Item ${itemIdx + 1}`}
                    style={{ flex: 1, marginBottom: 0 }}
                  />
                  <button onClick={() => removeItem(svcIdx, itemIdx)} style={{
                    background: 'rgba(255,69,58,0.08)', border: '1px solid rgba(255,69,58,0.25)',
                    color: '#ff453a', fontSize: '0.75rem', padding: '8px 10px',
                    cursor: 'pointer', flexShrink: 0, borderRadius: 2,
                  }}>✕</button>
                </div>
              ))}
            </div>
            <button onClick={() => addItem(svcIdx)} style={{
              marginTop: 10, background: 'rgba(201,168,76,0.08)',
              border: '1px dashed rgba(201,168,76,0.3)', color: 'var(--gold)',
              fontSize: '0.78rem', padding: '8px 16px', cursor: 'pointer',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>+ Add Item</button>
          </div>
        </div>
      ))}

      {/* Add new service card */}
      <button onClick={addService} style={{
        width: '100%', padding: '16px',
        background: 'rgba(201,168,76,0.05)',
        border: '1px dashed rgba(201,168,76,0.3)',
        color: 'var(--gold)', fontSize: '0.82rem',
        cursor: 'pointer', letterSpacing: '0.15em',
        textTransform: 'uppercase', marginBottom: 4,
        transition: 'all 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.05)'}
      >+ Add New Service Card</button>

      <SaveBtn onClick={save} loading={loading} saved={saved} />
    </SectionBox>
  );
};

/* ─── MAIN DASHBOARD ────────────────────────────────── */
const AdminDashboard = () => {
  const { logout } = useAuth();
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState({ msg: '', type: '' });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 3000);
  };

  useEffect(() => {
    API.get('/portfolio').then(r => setContent(r.data)).catch(() => {});
  }, []);

  const saveSection = async (key, value) => {
    try {
      await API.put(`/portfolio/${key}`, { value });
      setContent(prev => ({ ...prev, [key]: value }));
      showToast(`${key} updated successfully!`);
    } catch {
      showToast('Save failed. Check your connection.', 'error');
      throw new Error('save failed');
    }
  };

  const tabs = [
    { id: 'profile', label: '👤 Profile' },
    { id: 'team', label: '👥 Team' },
    { id: 'services', label: '⚙️ Services' },
    { id: 'certificates', label: '🏆 Certificates' },
    { id: 'contact', label: '📧 Contact' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy-dark)' }}>
      <Toast msg={toast.msg} type={toast.type} />

      {/* Top bar */}
      <div style={{ background: 'rgba(6,14,33,0.98)', borderBottom: '1px solid rgba(201,168,76,0.15)',
        padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 32, height: 32, border: '1.5px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(45deg)' }}>
            <span style={{ transform: 'rotate(-45deg)', fontSize: 13, color: 'var(--gold)', fontWeight: 700 }}>B</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Playfair Display', color: 'var(--cream)', fontSize: '1rem' }}>Admin Panel</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Portfolio Management</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="/" target="_blank" rel="noreferrer" className="btn-outline"
            style={{ padding: '8px 20px', fontSize: '0.75rem' }}>View Site ↗</a>
          <button onClick={logout} className="btn-gold" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>Logout</button>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 65px)' }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: 'rgba(13,27,62,0.6)', borderRight: '1px solid rgba(201,168,76,0.1)',
          padding: '28px 0', flexShrink: 0 }}>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.25em', color: 'rgba(201,168,76,0.5)',
            textTransform: 'uppercase', padding: '0 20px', marginBottom: 12 }}>Sections</p>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: activeTab === t.id
                  ? 'rgba(201,168,76,0.12)' : 'transparent',
                border: 'none', borderLeft: activeTab === t.id ? '2px solid var(--gold)' : '2px solid transparent',
                color: activeTab === t.id ? 'var(--gold)' : 'var(--cream-dim)',
                padding: '12px 20px', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: 'DM Sans' }}
              onMouseEnter={e => { if (activeTab !== t.id) e.target.style.color = 'var(--cream)'; }}
              onMouseLeave={e => { if (activeTab !== t.id) e.target.style.color = 'var(--cream-dim)'; }}
            >{t.label}</button>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '32px 36px', overflowY: 'auto' }}>
          {!content ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ width: 40, height: 40, border: '2px solid rgba(201,168,76,0.2)',
                borderTopColor: 'var(--gold)', borderRadius: '50%', margin: '0 auto 16px',
                animation: 'spin 1s linear infinite' }} />
              <p style={{ color: 'var(--cream-dim)' }}>Loading content...</p>
            </div>
          ) : (
            <>
              {activeTab === 'profile' && <ProfileSection data={content.profile} onSave={saveSection} />}
              {activeTab === 'team' && <TeamSection data={content.team} onSave={saveSection} />}
              {activeTab === 'services' && <ServicesSection data={content.services} onSave={saveSection} />}
              {activeTab === 'certificates' && <CertificatesSection />}
              {activeTab === 'contact' && <ContactSection data={content.contact} onSave={saveSection} />}
            </>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>
    </div>
  );
};

export default AdminDashboard;
