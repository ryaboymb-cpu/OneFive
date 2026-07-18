import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, Crown, Globe, LogOut, ChevronRight } from 'lucide-react'
import { useWalletStore } from '@modules/core/store/walletStore'

export default function SettingsScreen() {
  const nav = useNavigate()
  const logout = useWalletStore(s => s.logout)

  const rows = [
    { icon: Lock, label: 'Безопасность', desc: 'PIN-код, резервная копия', onClick: () => alert('В разработке') },
    { icon: Crown, label: 'OneFive Club', desc: 'VIP-подписка $25/мес', onClick: () => nav('/club') },
    { icon: Globe, label: 'Сеть', desc: 'Testnet', onClick: () => {} },
  ]

  return (
    <div className="h-full px-5 pt-6 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => nav(-1)} className="p-2 -ml-2 hover:bg-of-surface rounded-xl"><ArrowLeft className="w-5 h-5" /></button>
        <h2 className="text-xl font-bold">Настройки</h2>
      </div>

      <div className="space-y-2 mb-6">
        {rows.map((r, i) => (
          <motion.button key={i} whileTap={{ scale: 0.98 }} onClick={r.onClick} className="w-full of-card !p-4 flex items-center gap-4 text-left">
            <r.icon className="w-5 h-5 text-of-accent" />
            <div className="flex-1"><div className="text-sm font-semibold">{r.label}</div><div className="text-of-muted text-xs">{r.desc}</div></div>
            <ChevronRight className="w-4 h-4 text-of-muted" />
          </motion.button>
        ))}
      </div>

      <button className="w-full of-card !p-4 flex items-center gap-4 text-of-danger border-of-danger/20" onClick={() => {
        if (confirm('Выйти из кошелька? Сид-фраза останется только у тебя на бумаге.')) { logout(); nav('/welcome') }
      }}>
        <LogOut className="w-5 h-5" />
        <span className="text-sm font-semibold">Выйти из кошелька</span>
      </button>
    </div>
  )
}
