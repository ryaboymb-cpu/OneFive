import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, Copy, FileText } from 'lucide-react'
import { useState } from 'react'

export default function BackupScreen() {
  const nav = useNavigate()
  const { state } = useLocation()
  const words: string[] = state?.words || []
  const [copied, setCopied] = useState(false)

  if (!words.length) { nav('/create'); return null }

  return (
    <div className="h-full px-6 pt-8 pb-6 flex flex-col overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Правила безопасности</h2>
      
      <div className="space-y-3 mb-6">
        {[
          { icon: AlertTriangle, t: 'Никому не показывай', d: 'Кто угодно с этими словами украдет твои деньги.' },
          { icon: FileText, t: 'Бумага > Скриншот', d: 'Не делай фото. Пиши ручкой на бумаге и храни в сейфе.' },
          { icon: Copy, t: 'Проверь перед продолжением', d: 'Если потеряешь — мы НЕ сможем помочь.' },
        ].map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            className="of-card !p-4 flex gap-3 items-start">
            <it.icon className="w-5 h-5 text-of-warning shrink-0 mt-0.5" />
            <div><div className="text-sm font-semibold">{it.t}</div><div className="text-of-muted text-xs">{it.d}</div></div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="of-card !bg-of-accent/5 border-of-accent/20 text-center py-5 mb-6">
        <p className="text-sm text-of-accent-light font-medium mb-3">Твоя сид-фраза</p>
        <div className="flex flex-wrap justify-center gap-2">
          {words.map((w, i) => (
            <span key={i} className="bg-of-bg px-2 py-1 rounded-lg text-xs font-mono">{i + 1}. {w}</span>
          ))}
        </div>
        <button className="mt-4 text-xs text-of-muted flex items-center justify-center gap-1 mx-auto" onClick={() => {
          navigator.clipboard.writeText(words.join(' ')); setCopied(true); setTimeout(() => setCopied(false), 2000)
        }}>
          <Copy className="w-3 h-3" /> {copied ? 'Скопировано!' : 'Копировать всё'}
        </button>
      </motion.div>

      <div className="flex-1" />
      <button className="of-btn-primary" onClick={() => nav('/verify', { state: { words } })}>Проверить сид-фразу</button>
    </div>
  )
}
