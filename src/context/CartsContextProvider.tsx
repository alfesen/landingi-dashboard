import { ReactNode, useContext, useEffect, useState } from 'react'
import useFetchData from '../hooks/useFetchData'
import { Cart } from '../types'
import CartsContext from './CartsContext'

const CartsContextProvider = ({ children }: { children: ReactNode }) => {
  const cartCtx = useContext(CartsContext)
  const { sendRequest } = useFetchData()
  const [carts, setCarts] = useState<Cart[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { carts } = await sendRequest('https://dummyjson.com/carts')
        setCarts(carts)
      } catch (err) {}
    }
    fetchData()
  }, [sendRequest, cartCtx])

  const removeCart = (id: number) => {
    const filteredCarts = carts.filter(cart => cart.id !== id)
    setCarts(filteredCarts)
  }

  const addCart = (cart: Cart) => {
    setCarts(prevCarts => [...prevCarts, cart])
  }

  return (
    <CartsContext.Provider value={{ carts, removeCart, addCart }}>
      {children}
    </CartsContext.Provider>
  )
}

export default CartsContextProvider
