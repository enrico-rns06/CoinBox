import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import styles from './Register.module.css'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', form)
      localStorage.setItem('coinbox_token', data.token)
      localStorage.setItem('coinbox_user', JSON.stringify(data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cadastrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>

      <svg className={styles.bg} viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <polyline points="40,480 120,390 200,430 280,310 360,350 440,220 520,270 600,170 680,200 760,120" fill="none" stroke="#EEC03E" strokeWidth="1.5" strokeOpacity="0.15"/>
        <polyline points="40,520 120,460 200,490 280,390 360,420 440,300 520,330 600,250 680,260 760,200" fill="none" stroke="#EEC03E" strokeWidth="1" strokeOpacity="0.08"/>
        <circle cx="280" cy="310" r="3" fill="#EEC03E" fillOpacity="0.25"/>
        <circle cx="440" cy="220" r="3" fill="#EEC03E" fillOpacity="0.25"/>
        <circle cx="600" cy="170" r="3" fill="#EEC03E" fillOpacity="0.25"/>
        <circle cx="760" cy="120" r="3" fill="#EEC03E" fillOpacity="0.25"/>
        <circle cx="660" cy="100" r="58" fill="none" stroke="#EEC03E" strokeWidth="2.5" strokeOpacity="0.18"/>
        <circle cx="660" cy="100" r="44" fill="#EEC03E" fillOpacity="0.07"/>
        <text x="660" y="112" textAnchor="middle" fontSize="34" fill="#EEC03E" fillOpacity="0.2" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700">$</text>
        <circle cx="90" cy="490" r="42" fill="none" stroke="#EEC03E" strokeWidth="2" strokeOpacity="0.14"/>
        <circle cx="90" cy="490" r="32" fill="#EEC03E" fillOpacity="0.06"/>
        <text x="90" y="499" textAnchor="middle" fontSize="22" fill="#EEC03E" fillOpacity="0.18" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700">$</text>
        <circle cx="130" cy="90" r="26" fill="none" stroke="#EEC03E" strokeWidth="1.5" strokeOpacity="0.12"/>
        <circle cx="130" cy="90" r="18" fill="#EEC03E" fillOpacity="0.05"/>
        <text x="130" y="97" textAnchor="middle" fontSize="14" fill="#EEC03E" fillOpacity="0.15" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700">$</text>
        <circle cx="730" cy="500" r="34" fill="none" stroke="#EEC03E" strokeWidth="1.5" strokeOpacity="0.12"/>
        <circle cx="730" cy="500" r="24" fill="#EEC03E" fillOpacity="0.05"/>
        <text x="730" y="508" textAnchor="middle" fontSize="18" fill="#EEC03E" fillOpacity="0.15" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700">$</text>
        <circle cx="500" cy="60" r="18" fill="none" stroke="#EEC03E" strokeWidth="1" strokeOpacity="0.1"/>
        <circle cx="500" cy="60" r="12" fill="#EEC03E" fillOpacity="0.04"/>
        <rect x="620" y="420" width="12" height="80" rx="3" fill="#EEC03E" fillOpacity="0.1"/>
        <rect x="640" y="395" width="12" height="105" rx="3" fill="#EEC03E" fillOpacity="0.1"/>
        <rect x="660" y="440" width="12" height="60" rx="3" fill="#EEC03E" fillOpacity="0.1"/>
        <rect x="680" y="370" width="12" height="130" rx="3" fill="#EEC03E" fillOpacity="0.1"/>
        <rect x="700" y="410" width="12" height="90" rx="3" fill="#EEC03E" fillOpacity="0.1"/>
        <circle cx="200" cy="180" r="2" fill="#EEC03E" fillOpacity="0.15"/>
        <circle cx="350" cy="530" r="2" fill="#EEC03E" fillOpacity="0.12"/>
        <circle cx="480" cy="480" r="2" fill="#EEC03E" fillOpacity="0.1"/>
        <circle cx="560" cy="380" r="2" fill="#EEC03E" fillOpacity="0.1"/>
      </svg>

      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#0C2985" strokeWidth="2.5"/>
              <path d="M12 7v2m0 6v2M9.5 9.5C9.5 8.7 10.2 8 12 8s2.5.7 2.5 1.5S13.3 11 12 11s-2.5.7-2.5 1.5S10.7 14 12 14s2.5-.7 2.5-1.5" stroke="#0C2985" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span className={styles.logoText}>CoinBox</span>
        </div>
        <p className={styles.slogan}>Crie sua conta gratuita</p>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Nome</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Seu nome" required />
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" required />
          </div>
          <div className={styles.field}>
            <label>Senha</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
          </div>
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </form>

        <p className={styles.link}>
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  )
}

export default Register