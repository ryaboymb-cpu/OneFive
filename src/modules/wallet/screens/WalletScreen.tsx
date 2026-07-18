import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Eye, EyeOff, ArrowLeftRight, Gift, Users, Crown } from 'lucide-react'
import { useWalletStore } from '@modules/core/store/walletStore'
import { fetchBalance } from '@modules/core/lib/ton'
import { fmtTon, fmtAddr } from '@modules/core/lib/format'
import TokenIcon from '../components/TokenIcon'

export default function WalletScreen() {
  const nav = useNavigate()
  const { wallet, balance, setBalance, hidden, toggleHidden } = useWalletStore()
  const [refreshing, setRefreshing] = useState(false)

  const refresh = async () => {
    if (!wallet) return
    setRefreshing(true)
    const b = await fetchBalance(wallet.address)
    setBalance(b)
    setRefreshing(false)
  }

  useEffect(() => { refresh() }, [wallet?.address])

  if (!wallet) return null

  return (
    <div className="px-5 pt-8 pb-6 space-y-5 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">OneFive</h1>
          <p className="text-of-muted text-[11px]">Мультивалютный кошелек</p>
        </div>
        <div onClick={() => nav('/settings')} className="w-10 h-10 rounded-full bg-of-surface border border-of-border flex items-center justify-center">
          <span className="text-xs font-bold">{fmtAddr(wallet.address, 2)}</span>
        </div>
      </div>

      {/* Balance Card */}
      <motion.div className="of-card relative overflow-hidden text-center py-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-of-accent/10 rounded-full blur-[80px]" />
        <div className="absolute top-4 right-4">
          <button onClick={toggleHidden} className="text-of-muted hover:text-white transition-colors">
            {hidden ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-of-muted text-xs mb-1 uppercase tracking-wider">Общий баланс</p>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-5xl font-extrabold tracking-tight">{hidden ? '••••' : fmtTon(balance)}</span>
          <span className="text-of-accent font-bold text-lg">TON</span>
        </div>
        <p className="text-of-muted text-xs mb-4">≈ ${hidden ? '•••' : (parseFloat(balance) * 5.2).toFixed(2)} USD</p>
        <button onClick={refresh} className="inline-flex items-center gap-1 text-of-muted text-[11px] hover:text-of-accent transition-colors">
          <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} /> Обновить
        </button>
      </motion.div>

      {/* Actions */}
      <div className="grid grid-cols-4 gap-3">
        <ActionBtn icon={ArrowUpRight} label="Отправить" color="text-of-accent" onClick={() => nav('/send')} />
        <ActionBtn icon={ArrowDownLeft} label="Получить" color="text-emerald-400" onClick={() => nav('/receive')} />
        <ActionBtn icon={ArrowLeftRight} label="Свап" color="text-of-warning" onClick={() => nav('/swap')} />
        <ActionBtn icon={Users} label="P2P" color="text-purple-400" onClick={() => alert('P2P скоро')} />
      </div>

      {/* Club Promo */}
      <motion.div onClick={() => nav('/club')} whileTap={{ scale: 0.98 }} className="of-card !p-3 !bg-gradient-to-r from-of-accent/10 to-purple-500/10 border-of-accent/20 flex items-center gap-3 cursor-pointer">
        <Crown className="w-5 h-5 text-of-accent" />
        <div className="flex-1">
          <div className="text-sm font-bold">OneFive Club</div>
          <div className="text-[11px] text-of-muted">0% комиссий + VIP за $25/мес</div>
        </div>
        <div className="text-[11px] bg-of-accent/20 text-of-accent px-2 py-1 rounded-lg font-semibold">Подробнее</div>
      </motion.div>

      {/* Assets */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Активы</h3>
        <div className="space-y-2">
          <AssetRow symbol="TON" name="Toncoin" bal={balance} usd="5.20" active />
          <AssetRow symbol="USDT" name="Tether USD" bal="0.00" usd="1.00" />
          <AssetRow symbol="BTC" name="Bitcoin" bal="0.0000" usd="67,000" />
          <AssetRow symbol="ETH" name="Ethereum" bal="0.00" usd="3,500" />
        </div>
      </div>
    </div>
  )
}

function ActionBtn({ icon: I, label, color, onClick }: any) {
  return (
    <motion.button whileTap={{ scale: 0.9 }} onClick={onClick} className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-2xl bg-of-surface border border-of-border flex items-center justify-center">
        <I className={`w-6 h-6 ${color}`} />
      </div>
      <span className="text-[11px] font-medium text-of-muted">{label}</span>
    </motion.button>
  )
}

function AssetRow({ symbol, name, bal, usd, active }: any) {
  const hidden = useWalletStore(s => s.hidden)
  return (
    <div className={`of-card !p-3 flex items-center gap-3 ${active ? '' : 'opacity-60'}`}>
      <TokenIcon symbol={symbol} />
      <div className="flex-1">
        <div className="text-sm font-bold">{name}</div>
        <div className="text-[11px] text-of-muted">{symbol}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold">{hidden ? '•••' : parseFloat(bal).toFixed(4)}</div>
        <div className="text-[11px] text-of-muted">{hidden ? '' : `$${(parseFloat(bal) * parseFloat(usd)).toFixed(2)}`}</div>
      </div>
    </div>
  )
      }
