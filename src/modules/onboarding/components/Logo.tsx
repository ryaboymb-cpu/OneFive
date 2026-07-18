import { motion } from 'framer-motion'

export default function Logo({ size = 140 }: { size?: number }) {
  return (
    <motion.svg width={size} height={size * 1.2} viewBox="0 0 200 240" fill="none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="200" y2="240">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#2b7fff" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M100 225c55-22 85-70 85-130V45L100 5 15 45v50c0 60 30 108 85 130z"
        fill="url(#shieldGrad)" fillOpacity="0.1" stroke="url(#shieldGrad)" strokeWidth="3" filter="url(#glow)"/>
      <text x="100" y="170" textAnchor="middle" fill="url(#shieldGrad)" fontSize="130" fontWeight="800" fontFamily="Inter, sans-serif">15</text>
    </motion.svg>
  )
}
