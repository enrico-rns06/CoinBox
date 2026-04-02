import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Summary from '../../components/Summary/Summary'
import TransactionList from '../../components/TransactionList/TransactionList'
import TransactionForm from '../../components/TransactionForm/TransactionForm'
import Chart from '../../components/Chart/Chart'
import EditModal from '../../components/EditModal/EditModal'
import api from '../../services/api'
import styles from './Dashboard.module.css'

function Dashboard() {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingTransaction, setEditingTransaction] = useState(null)

  const user = JSON.parse(localStorage.getItem('coinbox_user'))

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/transactions')
      setTransactions(data)
    } catch (error) {
      console.error('Erro ao buscar transações:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (transaction) => {
    try {
      const { data } = await api.post('/transactions', transaction)
      setTransactions([data, ...transactions])
    } catch (error) {
      console.error('Erro ao criar transação:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`)
      setTransactions(transactions.filter(t => t.id !== id))
    } catch (error) {
      console.error('Erro ao deletar transação:', error)
    }
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
  }

  const handleSave = async (updated) => {
    try {
      await api.delete(`/transactions/${updated.id}`)
      const { data } = await api.post('/transactions', {
        description: updated.description,
        amount: updated.amount,
        type: updated.type,
        category: updated.category,
        date: updated.date,
      })
      setTransactions(transactions.map(t => t.id === updated.id ? data : t))
      setEditingTransaction(null)
    } catch (error) {
      console.error('Erro ao editar transação:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('coinbox_token')
    localStorage.removeItem('coinbox_user')
    navigate('/login')
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <span>Carregando...</span>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <Header user={user} onLogout={handleLogout} />
      <main className={styles.main}>
        <div className={styles.topSection}>
          <Summary transactions={transactions} />
        </div>
        <div className={styles.bottomSection}>
          <div className={styles.left}>
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
          <div className={styles.right}>
            <TransactionForm onAdd={handleAdd} />
            <Chart transactions={transactions} />
          </div>
        </div>
      </main>

      {editingTransaction && (
        <EditModal
          transaction={editingTransaction}
          onSave={handleSave}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </div>
  )
}

export default Dashboard