import { motion } from 'framer-motion'
import { Delete } from 'lucide-react'

export default function PinKeyboard({ onPress, onDelete }: { onPress: (n: string) => void; onDelete: () => void }) {
  const keys = ['1','2','3','4','5','6','7','8','9','', '0', 'del']
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] mx-auto">
      {keys.map((k, i) => (
        k === '' ? <div key={i} /> :
        k === 'del' ? (
          <button key={i} onClick={onDelete} className="h-16 rounded-2xl bg-of-surface flex items-center justify-center active:bg-of-card-hover transition-colors">
            <Delete className="w-6 h-6 text-of-muted" />
          </button>
        ) : (
          <motion.button whileTap={{ scale: 0.9 }} key={i} onClick={() => onPress(k)}
            className="h-16 rounded-2xl bg-of-surface text-2xl font-semibold active:bg-of-card-hover transition-colors">
            {k}
          </motion.button>
        )
      ))}
    </div>
  )
}
