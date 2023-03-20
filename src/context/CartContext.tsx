import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import useFetchData from '../hooks/useFetchData'
import { Cart } from '../types'

interface CartContextInterface {
  cartId: number
  getCartId: (cartId: number) => void
  showCart: boolean
  showCartHandler: (bool: boolean) => void
  carts: Cart[]
  addCartToCarts: (cart: Cart) => void
  removeCart: (id: number) => void
}

export const CartContext = createContext<CartContextInterface>({
  cartId: 1,
  getCartId: (cartId: number) => {},
  showCart: false,
  showCartHandler: (bool: boolean) => {},
  carts: [],
  addCartToCarts: (cart: Cart) => {},
  removeCart: (id: number) => {},
})

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { sendRequest } = useFetchData()
  const [cartId, setCartId] = useState<number>(1)
  const [showCart, setShowCart] = useState<boolean>(false)
  const [carts, setCarts] = useState<Cart[]>([])
  const highestId = Math.max(...carts.map(c => c.id))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { carts } = await sendRequest('https://dummyjson.com/carts')
        setCarts(carts)
      } catch (err) {}
    }
    fetchData()
  }, [sendRequest])

  const setCurrentCart = useCallback((cartId: number) => {
    setCartId(cartId)
  }, [])

  const showCartHandler = useCallback((bool: boolean) => {
    setShowCart(bool)
  }, [])

  const removeCart = useCallback(
    async (id: number) => {
      setCurrentCart(id)
      try {
        await sendRequest(`https://dummyjson.com/carts/${id}`, 'DELETE')
        setCarts(prevCarts => prevCarts.filter(c => c.id !== id))
      } catch (err: any) {}
    },
    [sendRequest, setCurrentCart]
  )

  const addCartToCarts = useCallback(
    (cart: Cart): void => {
      setCarts(prevCarts => [...prevCarts, { ...cart, id: highestId + 1 }])
    },
    [highestId]
  )

  const value = {
    cartId,
    getCartId: setCurrentCart,
    showCart,
    showCartHandler,
    carts,
    addCartToCarts,
    removeCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContextProvider
