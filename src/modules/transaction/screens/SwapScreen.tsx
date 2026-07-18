import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowDownUp, Info } from 'lucide-react'
import TokenIcon from '@modules/wallet/components/TokenIcon'
import { FEES } from '@modules/core/constants/config'

export default function SwapScreen() {
  const nav = useNavigate()
  const [fromAmount, setFromAmount] = useState('')
  const rate = 0.28 // 1 USDT = 0.28 TON (mock)
  const toAmount = fromAmount ? (parseFloat(fromAmount) * rate * (1 - FEES.swapPercent / 100)).toFixed(4) : '0.0000'
  const fee = fromAmount ? (parseFloat(fromAmount) * rate * (FEES.swapPercent / 100)).toFixed(4) : '0.0000'

  return (
    <div className="h-full px-5 pt-6 pb-8 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => nav(-1)} className="p-2 -ml-2 hover:bg-of-surface rounded-xl"><ArrowLeft className="w-5 h-5" /></button>
        <h2 className="text-xl font-bold">Свап</h2>
      </div>

      <div className="space-y-3 mb-6">
        <TokenBox symbol="TON" label="Отдаешь" value={fromAmount} onChange={setFromAmount} />
        <div className="flex justify-center -my-2 relative z-10">
          <motion.button whileTap={{ rotate: 180 }} className="w-10 h-10 rounded-full bg-of-card border border-of-border flex items-center justify-center shadow-lg">
            <ArrowDownUp className="w-5 h-5 text-of-accent" />
          </motion.button>
        </div>
        <TokenBox symbol="USDT" label="Получаешь" value={toAmount} readOnly />
      </div>

      <div className="of-card !p-3 space-y-2 mb-6">
        <div className="flex justify-between text-xs"><span className="text-of-muted">Курс</span><span>1 USDT ≈ {rate} TON</span></div>
        <div className="flex justify-between text-xs"><span className="text-of-muted">Комиссия OneFive ({FEES.swapPercent}%)</span><span className="text-of-warning">{fee} TON</span></div>
        <div className="flex justify-between text-xs"><span className="text-of-muted">Сетевой сбор</span><span className="text-of-muted">~0.005 TON</span></div>
        <div className="h-px bg-of-border my-1" />
        <div className="flex justify-between text-xs font-bold"><span>Итого к получению</span><span className="text-of-success">{toAmount} USDT</span></div>
      </div>

      <div className="flex-1" />
      <button className="of-btn-primary" onClick={() => alert('Свап в разработке')} disabled={!fromAmount}>Подтвердить свап</button>
      <p className="text-center text-[10px] text-of-muted mt-2 flex items-center justify-center gap-1"><Info className="w-3 h-3" /> Комиссия идет на развитие OneFive</p>
    </div>
  )
}

function TokenBox({ symbol, label, value, onChange, readOnly }: any) {
  return (
    <div className="of-card !p-4">
      <div className="flex justify-between mb-2">
        <span className="text-of-muted text-xs">{label}</span>
        <span className="text-of-muted text-xs">Баланс: 0.00</span>
      </div>
      <div className="flex items-center gap-3">
        <TokenIcon symbol={symbol} size={36} />
        <input className="bg-transparent text-2xl font-bold w-full outline-none text-right" placeholder="0.00" value={value} onChange={e => onChange?.(e.target.value)} readOnly={readOnly} />
      </div>
    </div>
  )
}
