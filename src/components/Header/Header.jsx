import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🪙</span>
        <span className={styles.logoText}>CoinBox</span>
      </div>
      <span className={styles.subtitle}>Controle Financeiro Pessoal</span>
    </header>
  )
}

export default Header