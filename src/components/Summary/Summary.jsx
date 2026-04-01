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

  const incomeCount = transactions.filter(t => t.type === 'income').length
  const expenseCount = transactions.filter(t => t.type === 'expense').length

  return (
    <>
      <div className={`${styles.card} ${styles.cardBlue}`}>
        <div className={styles.blob}></div>
        <span className={`${styles.label} ${styles.labelBlue}`}>Saldo Total</span>
        <span className={`${styles.value} ${styles.valueBlue}`}>{format(balance)}</span>
        <div className={styles.trend}>
          <span className={styles.trendUp}>▲</span> atualizado agora
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.blob} style={{ background: 'rgba(22,163,74,0.08)' }}></div>
        <span className={`${styles.label} ${styles.labelDefault}`}>Receitas</span>
        <span className={`${styles.value} ${styles.valueGreen}`}>{format(income)}</span>
        <span className={`${styles.badge} ${styles.badgeGreen}`}>{incomeCount} {incomeCount === 1 ? 'entrada' : 'entradas'}</span>
      </div>

      <div className={styles.card}>
        <div className={styles.blob} style={{ background: 'rgba(220,38,38,0.08)' }}></div>
        <span className={`${styles.label} ${styles.labelDefault}`}>Despesas</span>
        <span className={`${styles.value} ${styles.valueRed}`}>{format(expense)}</span>
        <span className={`${styles.badge} ${styles.badgeRed}`}>{expenseCount} {expenseCount === 1 ? 'saída' : 'saídas'}</span>
      </div>
    </>
  )
}

export default Summary