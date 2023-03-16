import CartsList from './components/Features/CartsList'
import s from './App.module.scss'
import CartsContextProvider from './context/CartsContextProvider'

const App = (): JSX.Element => {
  return (
    <div className={s.app}>
      <CartsContextProvider>
        <main className={s.app__main}>
          <CartsList />
        </main>
      </CartsContextProvider>
    </div>
  )
}

export default App
