import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'

export default function SplashScreen() {
  const nav = useNavigate()
  useEffect(() => { const t = setTimeout(() => nav('/welcome'), 2600); return () => clearTimeout(t) }, [nav])

  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-of-accent/10 rounded-full blur-[100px]" />
      <Logo size={150} />
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-center z-10 mt-2">
        <h1 className="text-4xl font-extrabold tracking-tight">OneFive <span className="text-of-accent">Wallet</span></h1>
        <p className="text-of-muted mt-2 text-sm">Будущее крипто внутри Telegram</p>
      </motion.div>
      <motion.div className="absolute bottom-10 w-6 h-1 rounded-full bg-of-accent/40" animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
    </div>
  )
}
