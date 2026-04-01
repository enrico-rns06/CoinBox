import styles from './Header.module.css'

function Header({ user, onLogout }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#0C2985" strokeWidth="2.5"/>
            <path d="M12 7v2m0 6v2M9.5 9.5C9.5 8.7 10.2 8 12 8s2.5.7 2.5 1.5S13.3 11 12 11s-2.5.7-2.5 1.5S10.7 14 12 14s2.5-.7 2.5-1.5" stroke="#0C2985" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
        <span className={styles.logoText}>CoinBox</span>
      </div>
      <div className={styles.right}>
        {user && <span className={styles.userName}>Olá, {user.name}!</span>}
        {onLogout && (
          <button className={styles.logoutBtn} onClick={onLogout}>
            Sair
          </button>
        )}
      </div>
    </header>
  )
}

export default Header