import { useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowLeft, Copy, Share2 } from 'lucide-react'
import { useWalletStore } from '@modules/core/store/walletStore'
import { fmtAddr } from '@modules/core/lib/format'

export default function ReceiveScreen() {
  const nav = useNavigate()
  const { wallet } = useWalletStore()
  if (!wallet) return null

  return (
    <div className="h-full px-5 pt-6 pb-8 flex flex-col items-center">
      <div className="w-full flex items-center gap-3 mb-8">
        <button onClick={() => nav(-1)} className="p-2 -ml-2 hover:bg-of-surface rounded-xl"><ArrowLeft className="w-5 h-5" /></button>
        <h2 className="text-xl font-bold">Пополнить</h2>
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-2xl mb-6">
        <QRCodeSVG value={`ton://transfer/${wallet.address}`} size={180} level="M" />
      </div>

      <div className="w-full of-card mb-4">
        <p className="text-of-muted text-[11px] mb-2">Твой адрес TON</p>
        <p className="font-mono text-xs break-all mb-3">{wallet.address}</p>
        <div className="flex gap-2">
          <button className="flex-1 of-btn-secondary text-xs flex items-center justify-center gap-2"
            onClick={() => navigator.clipboard.writeText(wallet.address)}><Copy className="w-4 h-4" /> Копировать</button>
          <button className="flex-1 of-btn-secondary text-xs flex items-center justify-center gap-2"
            onClick={() => { if ((navigator as any).share) (navigator as any).share({ text: wallet.address }) }}><Share2 className="w-4 h-4" /> Поделиться</button>
        </div>
      </div>

      <div className="w-full of-card !bg-of-warning/5 border-of-warning/20 !p-3 flex gap-2 items-start">
        <div className="text-of-warning text-lg">!</div>
        <p className="text-of-muted text-xs">Отправляй только TON в сеть {import.meta.env.VITE_TON_NETWORK || 'Testnet'}. Неверная сеть = потеря средств.</p>
      </div>
    </div>
  )
}
