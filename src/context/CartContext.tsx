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
  showMessage: (message: string) => void
  message: string | null
  loading: boolean
  error: string | null
  detachError: () => void
}

export const CartContext = createContext<CartContextInterface>({
  cartId: 1,
  getCartId: (cartId: number) => {},
  showCart: false,
  showCartHandler: (bool: boolean) => {},
  carts: [],
  addCartToCarts: (cart: Cart) => {},
  removeCart: (id: number) => {},
  showMessage: (message: string) => {},
  message: null,
  loading: false,
  error: null,
  detachError: () => {},
})

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { sendRequest, loading, error, detachError } = useFetchData()
  const [cartId, setCartId] = useState<number>(1)
  const [showCart, setShowCart] = useState<boolean>(false)
  const [carts, setCarts] = useState<Cart[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const highestId = Math.max(...carts.map(c => c.id))
  const lowestId = Math.min(...carts.map(c => c.id))

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

  const showMessage = (message: string) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const removeCart = useCallback(
    async (id: number) => {
      if (id <= 20) {
        const response = await sendRequest(
          `https://dummyjson.com/carts/${id}`,
          'DELETE'
        )
        if (response.isDeleted) {
          setCarts(prevCarts => prevCarts.filter(c => c.id !== id))
          showMessage('Cart successfully removed')
        }
      }
      if (id > 20) {
        if (cartId === id) setCurrentCart(lowestId)

        setCarts(prevCarts => prevCarts.filter(c => c.id !== id))
        showMessage('Cart successfully removed')
      }
    },
    [sendRequest, lowestId, cartId, setCurrentCart]
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
    showMessage,
    message,
    loading,
    error,
    detachError,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContextProvider
