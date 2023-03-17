import CartsList from './components/Features/CartsList/CartsList'
import s from './App.module.scss'

const App = (): JSX.Element => {
  return (
    <div className={s.app}>
      <main className={s.app__main}>
        <CartsList />
      </main>
    </div>
  )
}

export default App
