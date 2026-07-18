import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { generateWallet } from '@modules/core/lib/ton'
import { useWalletStore } from '@modules/core/store/walletStore'

export default function CreateWalletScreen() {
  const nav = useNavigate()
  const setW = useWalletStore(s => s.setWallet)
  const [words, setWords] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    const w = await generateWallet()
    setWords(w.mnemonic)
    setW({ address: w.address, publicKey: w.publicKey, mnemonicEncrypted: '' }) // temporarily stored until PIN setup
    setLoading(false)
  }

  if (!words) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-8 text-center gap-6">
        <div className="w-16 h-16 rounded-full bg-of-accent/10 flex items-center justify-center">
          <Loader2 className={`w-8 h-8 text-of-accent ${loading ? 'animate-spin' : ''}`} />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Создать новый кошелек</h2>
          <p className="text-of-muted text-sm">Мы сгенерируем 12 слов для восстановления доступа. Запиши их на бумаге.</p>
        </div>
        <button className="of-btn-primary" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Генерация...' : 'Продолжить'}
        </button>
      </div>
    )
  }

  return (
    <div className="h-full px-6 pt-8 pb-6 flex flex-col">
      <h2 className="text-xl font-bold mb-1">Сид-фраза</h2>
      <p className="text-of-muted text-xs mb-6">Запиши эти 12 слов в точном порядке. Без них доступ к средствам невозможен.</p>
      
      <div className="grid grid-cols-2 gap-2 mb-6">
        {words.map((w, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-of-surface border border-of-border rounded-xl px-3 py-2.5 flex items-center gap-3">
            <span className="text-of-accent/60 text-xs font-bold w-5">{i + 1}</span>
            <span className="font-mono font-medium text-sm">{w}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex-1" />
      <button className="of-btn-primary" onClick={() => nav('/backup', { state: { words } })}>
        Я записал(а) на бумаге
      </button>
    </div>
  )
        }
