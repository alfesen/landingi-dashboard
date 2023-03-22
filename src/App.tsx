import { lazy, Suspense, useContext } from 'react'
import s from './App.module.scss'
import { CartContext } from './context/CartContext'
import Header from './components/Layout/Header'
import Loading from './components/UI/Loading'

const App = (): JSX.Element => {
  const AddCart = lazy(() => import('./components/Features/AddCart/AddCart'))
  const CartsList = lazy(
    () => import('./components/Features/CartsList/CartsList')
  )
  const Cart = lazy(() => import('./components/Features/Cart/Cart'))

  const { addMode } = useContext(CartContext)

  return (
    <div className={s.app}>
      <Header />
      <main className={s.app__main}>
        <Suspense fallback={<Loading />}>
          <CartsList />
          {addMode ? <AddCart /> : <Cart />}
        </Suspense>
      </main>
    </div>
  )
}

export default App
