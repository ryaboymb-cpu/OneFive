import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './app/index.css'

const tg = (window as any).Telegram?.WebApp
tg?.ready()
tg?.expand()
tg?.setHeaderColor('#060d1a')
tg?.setBackgroundColor('#060d1a')
tg?.disableVerticalSwipes?.()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
