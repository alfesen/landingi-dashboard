import ReactDOM from 'react-dom/client'
import App from './App'
import CartContextProvider from './context/CartContext'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <CartContextProvider>
    <App />
  </CartContextProvider>
)
