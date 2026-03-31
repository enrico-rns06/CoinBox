import { useState } from 'react'
import styles from './TransactionForm.module.css'

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'income',
    category: '',
    date: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.description || !form.amount || !form.category || !form.date) {
      alert('Preencha todos os campos!')
      return
    }

    onAdd({
      id: Date.now(),
      description: form.description,
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    })

    setForm({
      description: '',
      amount: '',
      type: 'income',
      category: '',
      date: '',
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nova Transação</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Descrição</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Ex: Salário, Mercado..."
          />
        </div>

        <div className={styles.field}>
          <label>Valor (R$)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0,00"
            min="0"
            step="0.01"
          />
        </div>

        <div className={styles.field}>
          <label>Tipo</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">💚 Receita</option>
            <option value="expense">🔴 Despesa</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Categoria</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Selecione...</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Moradia">Moradia</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
            <option value="Lazer">Lazer</option>
            <option value="Educação">Educação</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Data</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.btn}>
          + Adicionar Transação
        </button>
      </form>
    </div>
  )
}

export default TransactionForm