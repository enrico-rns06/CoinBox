import { useState, useEffect } from 'react'
import DatePicker from '../DatePicker/DatePicker'
import styles from './EditModal.module.css'

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

function EditModal({ transaction, onSave, onClose }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'income',
    category: '',
    customCategory: '',
    date: '',
  })

  useEffect(() => {
    if (transaction) {
      const isCustom = !categories.includes(transaction.category) || transaction.category === 'Personalizada'
      setForm({
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        category: isCustom ? 'Personalizada' : transaction.category,
        customCategory: isCustom ? transaction.category : '',
        date: transaction.date,
      })
    }
  }, [transaction])

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

    onSave({
      ...transaction,
      description: form.description,
      amount: parseFloat(form.amount),
      type: form.type,
      category: finalCategory,
      date: form.date,
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Editar Transação</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

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
              <DatePicker value={form.date} onChange={(date) => setForm({ ...form, date })} />
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

          <div className={styles.buttons}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancelar</button>
            <button type="submit" className={styles.saveBtn}>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditModal