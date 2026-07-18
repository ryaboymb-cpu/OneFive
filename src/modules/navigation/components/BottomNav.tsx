import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowUpCircle, ArrowDownCircle, ArrowLeftRight, Settings } from 'lucide-react'
import { useWalletStore } from '@modules/core/store/walletStore'

const tabs = [
  { path: '/wallet', icon: Home, label: 'Главная' },
  { path: '/send', icon: ArrowUpCircle, label: 'Отправить' },
  { path: '/receive', icon: ArrowDownCircle, label: 'Получить' },
  { path: '/swap', icon: ArrowLeftRight, label: 'Свап' },
  { path: '/settings', icon: Settings, label: 'Ещё' },
]

export default function BottomNav() {
  const loc = useLocation()
  const nav = useNavigate()
  const wallet = useWalletStore(s => s.wallet)
  if (!wallet) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[72px] glass border-t border-of-border flex justify-around items-center pb-2 z-50">
      {tabs.map(t => {
        const active = loc.pathname === t.path
        return (
          <button key={t.path} onClick={() => nav(t.path)} className="relative flex flex-col items-center gap-1 w-16" style={{ color: active ? '#2b7fff' : '#8b9db8' }}>
            <motion.div whileTap={{ scale: 0.8 }}><t.icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} /></motion.div>
            <span className="text-[10px] font-medium">{t.label}</span>
            {active && <motion.div layoutId="tab" className="absolute -top-[1px] w-6 h-0.5 bg-of-accent rounded-full" />}
          </button>
        )
      })}
    </nav>
  )
}
