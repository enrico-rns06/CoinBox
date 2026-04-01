import { useState } from 'react'
import styles from './TransactionForm.module.css'

const categories = [
  'Trabalho',
  'Alimentação',
  'Moradia',
  'Transporte',
  'Saúde',
  'Lazer',
  'Educação',
  'Personalizada',
]

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'income',
    category: '',
    customCategory: '',
    date: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const finalCategory = form.category === 'Personalizada'
      ? form.customCategory.trim()
      : form.category

    if (!form.description || !form.amount || !finalCategory || !form.date) {
      alert('Preencha todos os campos!')
      return
    }

    onAdd({
      id: Date.now(),
      description: form.description,
      amount: parseFloat(form.amount),
      type: form.type,
      category: finalCategory,
      date: form.date,
    })

    setForm({
      description: '',
      amount: '',
      type: 'income',
      category: '',
      customCategory: '',
      date: '',
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Nova Transação</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Descrição</label>
          <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Ex: Salário, Mercado..." />
        </div>

        <div className={styles.field}>
          <label>Valor (R$)</label>
          <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="0,00" min="0" step="0.01" />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Tipo</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Data</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.field}>
          <label>Categoria</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Selecione...</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {form.category === 'Personalizada' && (
          <div className={styles.field}>
            <label>Nome da categoria</label>
            <input
              type="text"
              name="customCategory"
              value={form.customCategory}
              onChange={handleChange}
              placeholder="Ex: Investimentos, Pet..."
              autoFocus
            />
          </div>
        )}

        <button type="submit" className={styles.btn}>+ Adicionar Transação</button>
      </form>
    </div>
  )
}

export default TransactionForm