import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'
import styles from './DatePicker.module.css'

function DatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false)

  const selected = value ? new Date(value + 'T00:00:00') : undefined

  const handleSelect = (date) => {
    if (date) {
      onChange(format(date, 'yyyy-MM-dd'))
      setOpen(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.trigger} onClick={() => setOpen(!open)}>
        <span>{selected ? format(selected, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : 'Selecione uma data'}</span>
        <span className={styles.icon}>📅</span>
      </button>

      {open && (
        <div className={styles.calendar}>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            locale={ptBR}
            defaultMonth={selected || new Date()}
          />
        </div>
      )}
    </div>
  )
}

export default DatePicker