import { useState } from 'react'
import Header from './components/Header/Header'
import Summary from './components/Summary/Summary'
import TransactionList from './components/TransactionList/TransactionList'
import TransactionForm from './components/TransactionForm/TransactionForm'
import styles from './App.module.css'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Salário', amount: 3000, type: 'income', category: 'Trabalho', date: '2025-03-01' },
    { id: 2, description: 'Aluguel', amount: 800, type: 'expense', category: 'Moradia', date: '2025-03-05' },
    { id: 3, description: 'Mercado', amount: 350, type: 'expense', category: 'Alimentação', date: '2025-03-10' },
  ])

  const handleAdd = (transaction) => {
    setTransactions([transaction, ...transactions])
  }

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.topSection}>
          <Summary transactions={transactions} />
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.left}>
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
            />
          </div>
          <div className={styles.right}>
            <TransactionForm onAdd={handleAdd} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App