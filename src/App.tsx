import { useState, lazy, Suspense } from 'react'
import s from './App.module.scss'
import CartContextProvider from './context/CartContext'
import Header from './components/Layout/Header'
import Loading from './components/UI/Loading'

const App = (): JSX.Element => {
  const [addCart, setAddCart] = useState<boolean>(false)
  const AddCart = lazy(() => import('./components/Features/AddCart/AddCart'))
  const CartsList = lazy(
    () => import('./components/Features/CartsList/CartsList')
  )
  const Cart = lazy(() => import('./components/Features/Cart/Cart'))

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
          <Suspense fallback={<Loading />}>
            <CartsList addCartMode={addCart} setAddCart={showAddCart} />
            {addCart ? <AddCart onCancel={hideAddCart} /> : <Cart />}
          </Suspense>
        </CartContextProvider>
      </main>
    </div>
  )
}

export default App
