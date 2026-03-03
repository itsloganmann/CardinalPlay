import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import CalBearChibi from '../components/CalBearChibi';

const S = {
  root: {
    position: 'absolute', inset: 0,
    background: '#050505',
    overflowY: 'auto', overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
  },
  inner: {
    minHeight: '100%',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '60px 24px 48px',
    gap: 0,
  },
  logoWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36 },
  logoBox: {
    width: 80, height: 80, borderRadius: 22,
    background: 'linear-gradient(135deg, #003262, #1A73E8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
    boxShadow: '0 0 28px rgba(0,50,98,0.5)',
  },
  logoText: { fontSize: 28, fontWeight: 900, color: '#fff' },
  brandRow: { display: 'flex', gap: 6, alignItems: 'baseline' },
  brandBlack: { fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' },
  brandGold: { fontSize: 28, fontWeight: 900, color: '#FDB515', letterSpacing: '-0.04em' },
  subtitle: { fontSize: 14, color: '#A1A1AA', marginTop: 6 },

  tabs: {
    display: 'flex',
    background: '#121212',
    border: '1px solid #333333',
    borderRadius: 14, padding: 4,
    marginBottom: 24,
  },
  tab: (active) => ({
    flex: 1, padding: '12px 0', borderRadius: 10,
    fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer',
    fontFamily: 'inherit',
    background: active ? 'linear-gradient(135deg, #003262, #1A73E8)' : 'transparent',
    color: active ? '#fff' : '#A1A1AA',
    transition: 'all 0.25s',
  }),

  inputWrap: { position: 'relative', marginBottom: 12 },
  iconLeft: {
    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
    color: '#52525B', display: 'flex', alignItems: 'center',
  },
  input: {
    width: '100%', background: '#121212',
    border: '1px solid #333333',
    borderRadius: 14, padding: '14px 14px 14px 44px',
    color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  eyeBtn: {
    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', padding: 4,
    display: 'flex', alignItems: 'center', color: '#52525B',
  },
  select: {
    width: '100%', background: '#121212',
    border: '1px solid #333333',
    borderRadius: 14, padding: '14px 14px',
    color: '#fff', fontSize: 15, outline: 'none', marginBottom: 12,
    fontFamily: 'inherit',
  },
  submitBtn: (disabled) => ({
    width: '100%', padding: '16px', borderRadius: 14, border: 'none',
    background: disabled ? 'rgba(0,50,98,0.5)' : 'linear-gradient(135deg, #003262, #1A73E8)',
    color: '#fff', fontSize: 16, fontWeight: 700, cursor: disabled ? 'default' : 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginTop: 4, fontFamily: 'inherit',
    boxShadow: disabled ? 'none' : '0 0 24px rgba(0,50,98,0.4)',
  }),

  forgotBtn: {
    background: 'none', border: 'none', color: '#3D9AFF', fontSize: 14,
    cursor: 'pointer', alignSelf: 'center', marginTop: 14, padding: '4px 8px',
  },

  divider: { display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' },
  divLine: { flex: 1, height: 1, background: '#333333' },
  divText: { color: '#52525B', fontSize: 13 },

  ssoBtn: {
    width: '100%', padding: '16px', borderRadius: 14,
    background: '#121212', border: '1px solid #333333',
    color: '#A1A1AA', fontSize: 15, fontWeight: 600, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    fontFamily: 'inherit',
  },
  ssoBadge: {
    width: 28, height: 28, borderRadius: 8,
    background: 'linear-gradient(135deg, #003262, #1A73E8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 900, color: '#fff', flexShrink: 0,
  },
  tos: { fontSize: 11, color: '#52525B', textAlign: 'center', marginTop: 20 },
};

export default function AuthScreen() {
  const { login, signup } = useApp();
  const [mode, setMode] = useState('login');
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', year: 'Freshman' });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    mode === 'login' ? login(form.email, form.password) : signup(form);
  };

  return (
    <div style={S.root}>
      {/* Background glows — Cal Blue + Gold */}
      <div style={{
        position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 400, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(0,50,98,0.28) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: '20%', width: 200, height: 200, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(253,181,21,0.12) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, right: '10%', width: 160, height: 160, borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(0,50,98,0.15) 0%, transparent 70%)',
      }} />

      <div style={S.inner}>
        {/* Logo */}
        <motion.div style={S.logoWrap}
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <motion.div style={S.logoBox}
            animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <span style={S.logoText}>CP</span>
          </motion.div>
          <div style={S.brandRow}>
            <span style={S.brandBlack}>Cal</span>
            <span style={S.brandGold}>Play</span>
          </div>
          <p style={{ ...S.subtitle, color: '#A1A1AA' }}>Berkeley Gameday, Redefined 🐻</p>
        </motion.div>

        {/* Tabs */}
        <div style={S.tabs}>
          {['login', 'signup'].map(m => (
            <button key={m} style={S.tab(mode === m)} onClick={() => setMode(m)}>
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.form key={mode} onSubmit={submit}
            initial={{ opacity: 0, x: mode === 'login' ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}>

            {mode === 'signup' && (
              <div style={S.inputWrap}>
                <span style={S.iconLeft}><User size={18} /></span>
                <input style={S.input} type="text" placeholder="Full Name"
                  value={form.name} onChange={set('name')} />
              </div>
            )}

            <div style={S.inputWrap}>
              <span style={S.iconLeft}><Mail size={18} /></span>
              <input style={S.input} type="email" placeholder="Berkeley Email"
                value={form.email} onChange={set('email')} />
            </div>

            <div style={S.inputWrap}>
              <span style={S.iconLeft}><Lock size={18} /></span>
              <input style={{ ...S.input, paddingRight: 44 }}
                type={showPw ? 'text' : 'password'} placeholder="Password"
                value={form.password} onChange={set('password')} />
              <button type="button" style={S.eyeBtn} onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {mode === 'signup' && (
              <select style={S.select} value={form.year} onChange={set('year')}>
                {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Grad Student'].map(y => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            )}

            <motion.button type="submit" disabled={loading}
              style={S.submitBtn(loading)} whileTap={loading ? {} : { scale: 0.97 }}>
              {loading ? (
                <motion.div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                  animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
              ) : (
                <>{mode === 'login' ? 'Sign In' : 'Create Account'}<ArrowRight size={17} /></>
              )}
            </motion.button>

            {mode === 'login' && <button type="button" style={S.forgotBtn}>Forgot password?</button>}
          </motion.form>
        </AnimatePresence>

        {/* Divider */}
        <div style={S.divider}>
          <div style={S.divLine} />
          <span style={S.divText}>or</span>
          <div style={S.divLine} />
        </div>

        {/* SSO */}
        <motion.button style={S.ssoBtn} whileTap={{ scale: 0.97 }} onClick={() => login('sso', 'sso')}>
          <div style={S.ssoBadge}>C</div>
          Continue with CalNet ID
        </motion.button>

        <p style={S.tos}>By continuing, you agree to CalPlay's Terms of Service and Privacy Policy</p>
      </div>
    </div>
  );
}
