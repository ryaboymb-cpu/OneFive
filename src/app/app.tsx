import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BottomNav } from '@modules/navigation/components/BottomNav'
import { useWalletStore } from '@modules/core/store/walletStore'

// Onboarding
import SplashScreen from '@modules/onboarding/screens/SplashScreen'
import WelcomeScreen from '@modules/onboarding/screens/WelcomeScreen'
import CreateWalletScreen from '@modules/onboarding/screens/CreateWalletScreen'
import BackupScreen from '@modules/onboarding/screens/BackupScreen'
import VerifyWordsScreen from '@modules/onboarding/screens/VerifyWordsScreen'
import ImportScreen from '@modules/onboarding/screens/ImportScreen'
import PinSetupScreen from '@modules/onboarding/screens/PinSetupScreen'

// Main
import WalletScreen from '@modules/wallet/screens/WalletScreen'
import SendScreen from '@modules/transaction/screens/SendScreen'
import ReceiveScreen from '@modules/transaction/screens/ReceiveScreen'
import SwapScreen from '@modules/transaction/screens/SwapScreen'
import SettingsScreen from '@modules/settings/screens/SettingsScreen'
import ClubScreen from '@modules/settings/screens/ClubScreen'

function AnimatedRoutes() {
  const location = useLocation()
  const wallet = useWalletStore(s => s.wallet)
  
  const noNavRoutes = ['/', '/welcome', '/create', '/backup', '/verify', '/import', '/pin-setup']
  const showNav = wallet && !noNavRoutes.includes(location.pathname)

  return (
    <div className="h-full flex flex-col max-w-md mx-auto relative bg-of-bg">
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="h-full"
          >
            <Routes location={location}>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/welcome" element={<WelcomeScreen />} />
              <Route path="/create" element={<CreateWalletScreen />} />
              <Route path="/backup" element={<BackupScreen />} />
              <Route path="/verify" element={<VerifyWordsScreen />} />
              <Route path="/import" element={<ImportScreen />} />
              <Route path="/pin-setup" element={<PinSetupScreen />} />
              <Route path="/wallet" element={<WalletScreen />} />
              <Route path="/send" element={<SendScreen />} />
              <Route path="/receive" element={<ReceiveScreen />} />
              <Route path="/swap" element={<SwapScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/club" element={<ClubScreen />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
      {showNav && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  )
}
