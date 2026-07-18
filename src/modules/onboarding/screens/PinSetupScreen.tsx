import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { encryptMnemonic } from '@modules/core/lib/crypto'
import { useWalletStore } from '@modules/core/store/walletStore'
import { importWalletFromMnemonic } from '@modules/core/lib/ton'
import PinKeyboard from '../components/PinKeyboard'

export default function PinSetupScreen() {
  const nav = useNavigate()
  const { state } = useLocation()
  const words: string[] = state?.words || []
  const setW = useWalletStore(s => s.setWallet)

  const [step, setStep] = useState<'set' | 'confirm'>('set')
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState(false)

  const handlePin = (key: string) => {
    const target = step === 'set' ? pin : confirmPin
    if (target.length >= 6) return
    const next = target + key
    step === 'set' ? setPin(next) : setConfirmPin(next)
    if (next.length === 6) {
      if (step === 'set') { setStep('confirm'); setError(false) }
      else {
        if (next === pin) finish(next)
        else { setError(true); setConfirmPin('') }
      }
    }
  }

  const handleDel = () => {
    step === 'set' ? setPin(p => p.slice(0, -1)) : setConfirmPin(p => p.slice(0, -1))
  }

  const finish = async (finalPin: string) => {
    const encrypted = await encryptMnemonic(words, finalPin)
    const imported = await importWalletFromMnemonic(words)
    setW({ address: imported.address, publicKey: imported.publicKey, mnemonicEncrypted: encrypted })
    nav('/wallet')
  }

  const dots = (val: string) => Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i < val.length ? 'bg-of-accent' : 'bg-of-muted/30'}`} />
  ))

  return (
    <div className="h-full px-6 pt-10 pb-8 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-1">{step === 'set' ? 'Придумай PIN-код' : 'Повтори PIN-код'}</h2>
      <p className="text-of-muted text-xs mb-10">Он защитит твой кошелек на этом устройстве</p>

      <div className="flex gap-3 mb-10">{dots(step === 'set' ? pin : confirmPin)}</div>

      {error && (
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-of-danger text-sm mb-6">PIN-коды не совпадают</motion.p>
      )}

      <div className="flex-1" />
      <PinKeyboard onPress={handlePin} onDelete={handleDel} />
    </div>
  )
}
