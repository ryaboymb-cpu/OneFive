import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Zap, Globe } from 'lucide-react'
import Logo from '../components/Logo'

export default function WelcomeScreen() {
  const nav = useNavigate()
  const items = [
    { icon: Zap, t: 'Мгновенные переводы', d: 'Отправляй TON по всему миру за секунды' },
    { icon: ShieldCheck, t: 'Твои ключи — твои деньги', d: 'Кошелек некастодиальный. Только ты контролируешь доступ.' },
    { icon: Globe, t: 'OneFive Club', d: 'Подписка $25/мес: 0% комиссий, приоритет и VIP-статус.' },
  ]

  return (
    <div className="h-full flex flex-col px-6 pt-10 pb-8">
      <div className="flex-1 flex flex-col items-center">
        <Logo size={90} />
        <div className="w-full space-y-4 mt-8">
          {items.map((it, i) => (
            <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.12 }}
              className="of-card !p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-of-accent/10 flex items-center justify-center shrink-0">
                <it.icon className="w-5 h-5 text-of-accent" />
              </div>
              <div>
                <div className="font-semibold text-sm leading-snug">{it.t}</div>
                <div className="text-of-muted text-xs mt-0.5 leading-relaxed">{it.d}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="space-y-3">
        <button className="of-btn-primary" onClick={() => nav('/create')}>Создать кошелек</button>
        <button className="of-btn-secondary" onClick={() => nav('/import')}>У меня уже есть кошелек</button>
      </motion.div>
    </div>
  )
}
