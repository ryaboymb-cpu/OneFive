const GRADIENTS: Record<string, string> = {
  TON: 'from-sky-500 to-blue-600',
  USDT: 'from-emerald-500 to-teal-600',
  BTC: 'from-orange-500 to-amber-600',
  ETH: 'from-indigo-500 to-purple-600',
  BNB: 'from-yellow-500 to-amber-500',
  DEFAULT: 'from-of-muted to-slate-600',
}

export default function TokenIcon({ symbol, size = 40 }: { symbol: string; size?: number }) {
  const g = GRADIENTS[symbol] || GRADIENTS.DEFAULT
  return (
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g} flex items-center justify-center text-white font-extrabold text-xs shadow-lg`}
      style={{ width: size, height: size, fontSize: size > 40 ? 16 : 12 }}>
      {symbol[0]}
    </div>
  )
}
