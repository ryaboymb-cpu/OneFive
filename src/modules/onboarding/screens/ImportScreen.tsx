import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Wallet } from 'lucide-react'
import { importWalletFromMnemonic } from '@modules/core/lib/ton'

export default function ImportScreen() {
  const nav = useNavigate()
  const [input, setInput] = useState('')
  const [err, setErr] = useState('')

  const submit = async () => {
    setErr('')
    const words = input.trim().split(/\s+/).filter(Boolean)
    if (words.length !== 12 && words.length !== 24) { setErr('Введите 12 или 24 слова'); return }
    try {
      await importWalletFromMnemonic(words)
      nav('/pin-setup', { state: { words } })
    } catch { setErr('Неверная сид-фраза') }
  }

  return (
    <div className="h-full px-6 pt-8 pb-6 flex flex-col">
      <button onClick={() => nav('/welcome')} className="mb-6 flex items-center gap-2 text-of-muted"><ArrowLeft className="w-5 h-5" /> Назад</button>
      <div className="flex items-center gap-3 mb-2">
        <Wallet className="w-6 h-6 text-of-accent" />
        <h2 className="text-xl font-bold">Импорт кошелька</h2>
      </div>
      <p className="text-of-muted text-xs mb-6">Введи сид-фразу из 12 слов через пробел.</p>
      
      <textarea className="of-input font-mono text-sm mb-4 min-h-[120px] resize-none" value={input} onChange={(e) => setInput(e.target.value)} placeholder="abandon ability able about above absent absorb abstract absurd abuse ..." />
      {err && <p className="text-of-danger text-xs mb-4">{err}</p>}
      
      <div className="flex-1" />
      <button className="of-btn-primary" onClick={submit}>Далее</button>
    </div>
  )
}
