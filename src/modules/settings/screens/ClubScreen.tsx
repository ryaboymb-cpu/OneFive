import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Crown, Zap, Shield, MessageCircle, BarChart3, Check } from 'lucide-react'

export default function ClubScreen() {
  const nav = useNavigate()
  const benefits = [
    { icon: Zap, t: '0% комиссия на свап', d: 'Экономь на каждой сделке' },
    { icon: Crown, t: 'VIP-значок', d: 'Виден в профиле и P2P-чатах' },
    { icon: Shield, t: 'Приоритет P2P', d: 'Твои объявления наверху' },
    { icon: MessageCircle, t: 'Поддержка 24/7', d: 'Персональный чат с командой' },
    { icon: BarChart3, t: 'Аналитика Pro', d: 'Экспорт сделок и графики' },
  ]

  return (
    <div className="h-full px-5 pt-6 pb-8 flex flex-col overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => nav(-1)} className="p-2 -ml-2 hover:bg-of-surface rounded-xl"><ArrowLeft className="w-5 h-5" /></button>
        <h2 className="text-xl font-bold">OneFive Club</h2>
      </div>

      <div className="text-center mb-8">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="w-20 h-20 mx-auto rounded-full bg-of-accent/10 border border-of-accent/20 flex items-center justify-center mb-4">
          <Crown className="w-10 h-10 text-of-accent" />
        </motion.div>
        <h3 className="text-3xl font-extrabold mb-1">$25<span className="text-of-muted text-lg font-normal">/мес</span></h3>
        <p className="text-of-muted text-sm">Оплата криптой — TON, BTC, ETH</p>
      </div>

      <div className="space-y-3 mb-8">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-of-accent/10 flex items-center justify-center shrink-0">
              <b.icon className="w-4 h-4 text-of-accent" />
            </div>
            <div><div className="text-sm font-semibold">{b.t}</div><div className="text-of-muted text-xs">{b.d}</div></div>
          </div>
        ))}
      </div>

      <div className="flex-1" />
      <button className="of-btn-primary flex items-center justify-center gap-2" onClick={() => alert('Откроется экран оплаты TON на Treasury-адрес')}>
        <Check className="w-5 h-5" /> Активировать подписку
      </button>
      <p className="text-center text-[10px] text-of-muted mt-3">Подписка продлевается автоматически. Отмена в любой момент.</p>
    </div>
  )
}
