import styles from './Summary.module.css'

function Summary({ transactions }) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = income - expense

  const format = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <>
      <div className={`${styles.card} ${styles.balance}`}>
        <span className={styles.label}>Saldo Total</span>
        <span className={styles.value}>{format(balance)}</span>
      </div>
      <div className={`${styles.card} ${styles.income}`}>
        <span className={styles.label}>💚 Receitas</span>
        <span className={styles.value}>{format(income)}</span>
      </div>
      <div className={`${styles.card} ${styles.expense}`}>
        <span className={styles.label}>🔴 Despesas</span>
        <span className={styles.value}>{format(expense)}</span>
      </div>
    </>
  )
}

export default Summary