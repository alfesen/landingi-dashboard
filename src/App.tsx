import CartsList from './components/Features/CartsList/CartsList'
import s from './App.module.scss'
import Cart from './components/Features/Cart/Cart'
import CartContextProvider from './context/CartContext'
import Header from './components/Layout/Header'

const App = (): JSX.Element => {
  return (
    <div className={s.app}>
      <Header />
      <main className={s.app__main}>
        <CartContextProvider>
          <CartsList />
          <Cart />
        </CartContextProvider>
      </main>
    </div>
  )
}

export default App
