import styles from './TransactionList.module.css'

const categoryIcons = {
  'Trabalho': '💼',
  'Alimentação': '🛒',
  'Moradia': '🏠',
  'Transporte': '🚗',
  'Saúde': '❤️',
  'Lazer': '🎮',
  'Educação': '📚',
  'Outros': '📦',
}

function TransactionList({ transactions, onDelete, onEdit }) {
  const format = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Transações recentes</h2>
      </div>

      {transactions.length === 0 && (
        <p className={styles.empty}>Nenhuma transação ainda.</p>
      )}

      <ul className={styles.list}>
        {transactions.map(t => (
          <li key={t.id} className={styles.item}>
            <div className={styles.itemLeft}>
              <div className={`${styles.icon} ${t.type === 'income' ? styles.iconIncome : styles.iconExpense}`}>
                {categoryIcons[t.category] || '📦'}
              </div>
              <div className={styles.info}>
                <span className={styles.description}>{t.description}</span>
                <span className={styles.meta}>{t.category} · {t.date}</span>
              </div>
            </div>
            <div className={styles.itemRight}>
              <span className={`${styles.amount} ${t.type === 'income' ? styles.amountIncome : styles.amountExpense}`}>
                {t.type === 'income' ? '+' : '-'} {format(t.amount)}
              </span>
              <button className={styles.editBtn} onClick={() => onEdit(t)}>✏️</button>
              <button className={styles.deleteBtn} onClick={() => onDelete(t.id)}>✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList