import styles from './Header.module.css'

function Header({ user, onLogout }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🪙</span>
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