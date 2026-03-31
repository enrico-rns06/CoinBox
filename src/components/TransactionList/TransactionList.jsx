import styles from './TransactionList.module.css'

function TransactionList({ transactions, onDelete }) {
  const format = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Transações</h2>

      {transactions.length === 0 && (
        <p className={styles.empty}>Nenhuma transação encontrada.</p>
      )}

      <ul className={styles.list}>
        {transactions.map(t => (
          <li key={t.id} className={`${styles.item} ${styles[t.type]}`}>
            <div className={styles.info}>
              <span className={styles.description}>{t.description}</span>
              <span className={styles.meta}>{t.category} • {t.date}</span>
            </div>
            <div className={styles.right}>
              <span className={styles.amount}>
                {t.type === 'income' ? '+' : '-'} {format(t.amount)}
              </span>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(t.id)}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList