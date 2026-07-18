import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, ScanLine } from 'lucide-react'
import { useWalletStore } from '@modules/core/store/walletStore'
import { decryptMnemonic } from '@modules/core/lib/crypto'
import { sendTon } from '@modules/core/lib/ton'
import { fmtAddr } from '@modules/core/lib/format'

export default function SendScreen() {
  const nav = useNavigate()
  const { wallet } = useWalletStore()
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [pin, setPin] = useState('')
  const [step, setStep] = useState<'form' | 'pin' | 'done' | 'error'>('form')
  const [msg, setMsg] = useState('')

  const submit = async () => {
    if (!wallet || !to || !amount) return
    setStep('pin')
  }

  const confirm = async () => {
    try {
      const words = await decryptMnemonic(wallet!.mnemonicEncrypted, pin)
      await sendTon(words, to, amount)
      setStep('done')
    } catch (e: any) {
      setMsg(e.message || 'Ошибка')
      setStep('error')
    }
  }

  return (
    <div className="h-full px-5 pt-6 pb-8 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => nav(-1)} className="p-2 -ml-2 hover:bg-of-surface rounded-xl transition-colors"><ArrowLeft className="w-5 h-5" /></button>
        <h2 className="text-xl font-bold">Отправить TON</h2>
      </div>

      {step === 'form' && (
        <div className="flex-1 space-y-5">
          <div>
            <label className="text-of-muted text-xs block mb-2">Адрес</label>
            <div className="relative">
              <input className="of-input pr-10" value={to} onChange={e => setTo(e.target.value)} placeholder="EQ... или UQ..." />
              <ScanLine className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-of-muted" />
            </div>
          </div>
          <div>
            <label className="text-of-muted text-xs block mb-2">Сумма</label>
            <div className="relative">
              <input className="of-input pr-16 text-lg" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-of-muted font-bold text-sm">TON</span>
            </div>
            <p className="text-of-muted text-[11px] mt-2">Комиссия сети: ~0.005 TON</p>
          </div>
          <div className="of-card !bg-of-surface/50">
            <div className="flex justify-between text-xs mb-1"><span className="text-of-muted">Получатель</span><span className="font-mono">{fmtAddr(to, 6) || '—'}</span></div>
            <div className="flex justify-between text-xs mb-1"><span className="text-of-muted">Сумма</span><span>{amount || '0'} TON</span></div>
            <div className="flex justify-between text-xs"><span className="text-of-muted">Комиссия</span><span className="text-of-success">Только сеть</span></div>
          </div>
          <div className="flex-1" />
          <button className="of-btn-primary" onClick={submit} disabled={!to || !amount}>Продолжить</button>
        </div>
      )}

      {step === 'pin' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold mb-2">Введи PIN</h3>
          <p className="text-of-muted text-xs mb-6">Для подписания транзакции</p>
          <input type="password" inputMode="numeric" maxLength={6} className="of-input text-center text-2xl tracking-[0.5em] mb-6" value={pin} onChange={e => setPin(e.target.value)} autoFocus />
          <button className="of-btn-primary" onClick={confirm} disabled={pin.length < 4}>Подтвердить</button>
        </div>
      )}

      {step === 'done' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-of-success/10 flex items-center justify-center mb-4">
            <Send className="w-10 h-10 text-of-success" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Отправлено!</h3>
          <p className="text-of-muted text-sm mb-8">Транзакция в сети TON</p>
          <button className="of-btn-primary" onClick={() => nav('/wallet')}>На главную</button>
        </motion.div>
      )}

      {step === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <h3 className="text-of-danger font-bold mb-2">Ошибка</h3>
          <p className="text-of-muted text-sm mb-6">{msg}</p>
          <button className="of-btn-secondary" onClick={() => setStep('form')}>Назад</button>
        </div>
      )}
    </div>
  )
            }
