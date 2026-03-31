import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './Chart.module.css'

function Chart({ transactions }) {
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  const data = monthNames.map((month, index) => {
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date)
      return date.getMonth() === index
    })

    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0)

    const expense = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0)

    return { month, income, expense }
  })

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Evolução Mensal</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a3a9e" />
          <XAxis dataKey="month" tick={{ fill: '#a0aec0', fontSize: 12 }} />
          <YAxis tick={{ fill: '#a0aec0', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0e3099',
              border: '1px solid #1a3a9e',
              borderRadius: '8px',
              color: '#E2E5E7',
            }}
            formatter={(value) =>
              value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }
          />
          <Legend wrapperStyle={{ color: '#a0aec0' }} />
          <Bar dataKey="income" name="Receitas" fill="#00c896" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" name="Despesas" fill="#ff5c5c" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart