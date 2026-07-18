import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function VerifyWordsScreen() {
  const nav = useNavigate()
  const { state } = useLocation()
  const words: string[] = state?.words || []
  if (!words.length) { nav('/create'); return null }

  // random 3 indices
  const [indices] = useState(() => {
    const set = new Set<number>()
    while (set.size < 3) set.add(Math.floor(Math.random() * 12))
    return Array.from(set).sort((a, b) => a - b)
  })

  const [inputs, setInputs] = useState<Record<number, string>>({})
  const [error, setError] = useState(false)

  const check = () => {
    const ok = indices.every(i => inputs[i]?.trim().toLowerCase() === words[i].toLowerCase())
    if (ok) nav('/pin-setup', { state: { words } })
    else { setError(true); setInputs({}) }
  }

  return (
    <div className="h-full px-6 pt-8 pb-6 flex flex-col">
      <h2 className="text-xl font-bold mb-2">Проверка</h2>
      <p className="text-of-muted text-xs mb-8">Введи слова под указанными номерами, чтобы убедиться, что всё записал правильно.</p>

      <div className="space-y-4 mb-6">
        {indices.map((idx) => (
          <div key={idx}>
            <label className="text-of-muted text-xs mb-1.5 block">Слово #{idx + 1}</label>
            <input className="of-input" value={inputs[idx] || ''} onChange={e => setInputs(s => ({ ...s, [idx]: e.target.value }))} placeholder={`Введите ${idx + 1}-е слово`} />
          </div>
        ))}
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-of-danger text-sm mb-4">
          <XCircle className="w-4 h-4" /> Неверно. Попробуй ещё раз.
        </motion.div>
      )}

      <div className="flex-1" />
      <button className="of-btn-primary flex items-center justify-center gap-2" onClick={check}>
        <CheckCircle2 className="w-4 h-4" /> Подтвердить
      </button>
    </div>
  )
      }
