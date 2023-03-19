import CartsList from './components/Features/CartsList/CartsList'
import s from './App.module.scss'
import Cart from './components/Features/Cart/Cart'
import CartContextProvider from './context/CartContext'
import Header from './components/Layout/Header'
import { useState } from 'react'
import AddCart from './components/Features/AddCart/AddCart'

const App = (): JSX.Element => {
  const [addCart, setAddCart] = useState<boolean>(false)

  const showAddCart = () => {
    setAddCart(true)
  }
  const hideAddCart = () => {
    setAddCart(false)
  }

  return (
    <div className={s.app}>
      <Header />
      <main className={s.app__main}>
        <CartContextProvider>
          <CartsList setAddCart={showAddCart} />
          {addCart ? <AddCart onCancel={hideAddCart} /> : <Cart />}
        </CartContextProvider>
      </main>
    </div>
  )
}

export default App
