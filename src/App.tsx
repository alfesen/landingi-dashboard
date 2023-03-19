import CartsList from './components/Features/CartsList/CartsList'
import s from './App.module.scss'
import CartContextProvider from './context/CartContext'
import Header from './components/Layout/Header'
import { useCallback, useEffect, useState } from 'react'
import AddCart from './components/Features/AddCart/AddCart'
import { Cart as CartType } from './types'
import Cart from './components/Features/Cart/Cart'
import useFetchData from './hooks/useFetchData'

const App = (): JSX.Element => {
  const [addCart, setAddCart] = useState<boolean>(false)
  const [carts, setCarts] = useState<CartType[]>([])
  const [currentCart, setCurrentCart] = useState<number | null>(null)

  const { sendRequest } = useFetchData()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { carts } = await sendRequest('https://dummyjson.com/carts')
        setCarts(carts)
      } catch (err) {}
    }
    fetchData()
  }, [sendRequest])

  const showAddCart = () => {
    setAddCart(true)
  }
  const hideAddCart = () => {
    setAddCart(false)
  }

  const addCartToCarts = (cart: CartType): void => {
    setCarts(prevCarts => [...prevCarts, cart])
  }
  const removeCart = useCallback(
    async (id: number) => {
      setCurrentCart(id)
      try {
        await sendRequest(`https://dummyjson.com/carts/${id}`, 'DELETE')
        setCarts(prevCarts => prevCarts.filter(c => c.id !== id))
      } catch (err: any) {}
    },
    [sendRequest]
  )

  return (
    <div className={s.app}>
      <Header />
      <main className={s.app__main}>
        <CartContextProvider>
          <CartsList
            carts={carts}
            setAddCart={showAddCart}
            removeCart={removeCart}
            currentCart={currentCart}
          />
          {addCart ? (
            <AddCart onCancel={hideAddCart} onAddCart={addCartToCarts} />
          ) : (
            <Cart />
          )}
        </CartContextProvider>
      </main>
    </div>
  )
}

export default App
