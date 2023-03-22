import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from 'react'
import useFetchData from '../hooks/useFetchData'
import { Cart, Reducer, CartContextInterface, State, Action } from '../types'

export const CartContext = createContext<CartContextInterface>({
  cartId: 1,
  showCart: false,
  carts: [],
  message: null,
  loading: false,
  error: null,
  addMode: false,
  getCartId: (cartId: number) => {},
  showCartHandler: (bool: boolean) => {},
  addCartToCarts: (cart: Cart) => {},
  removeCart: (id: number) => {},
  showMessage: (message: string) => {},
  detachError: () => {},
  setAddMode: (mode: boolean) => {},
})

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SHOW_CART':
      return { ...state, showCart: action.payload }
    case 'SET_ID':
      return { ...state, cartId: action.payload }
    case 'SET_CARTS':
      state.carts = action.payload
      return { ...state, carts: action.payload }
    case 'SET_MESSAGE':
      return { ...state, message: action.payload }
    case 'CHANGE_MODE':
      return { ...state, addMode: action.payload }
    default:
      return state
  }
}

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { sendRequest, loading, error, detachError } = useFetchData()

  const [{ showCart, cartId, carts, message, addMode }, dispatch] = useReducer<
    Reducer<State, Action>
  >(reducer, {
    showCart: false,
    cartId: 1,
    carts: [],
    message: null,
    addMode: false,
  })

  const highestId = Math.max(...carts.map(c => c.id))
  const lowestId = Math.min(...carts.map(c => c.id))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { carts } = await sendRequest('https://dummyjson.com/carts')
        dispatch({ type: 'SET_CARTS', payload: carts })
      } catch (err) {}
    }
    fetchData()
  }, [sendRequest])

  const setCurrentCart = useCallback((cartId: number) => {
    dispatch({ type: 'SET_ID', payload: cartId })
  }, [])

  const showCartHandler = useCallback((bool: boolean) => {
    dispatch({ type: 'SHOW_CART', payload: bool })
  }, [])

  const showMessage = (message: string) => {
    dispatch({ type: 'SET_MESSAGE', payload: message })

    setTimeout(() => {
      dispatch({ type: 'SET_MESSAGE', payload: null })
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
          dispatch({
            type: 'SET_CARTS',
            payload: carts.filter(c => c.id !== id),
          })
          showMessage('Cart successfully removed')
        }
      }
      if (id > 20) {
        if (cartId === id) setCurrentCart(lowestId)
        dispatch({
          type: 'SET_CARTS',
          payload: carts.filter(c => c.id !== id),
        })
        showMessage('Cart successfully removed')
      }
    },
    [cartId, lowestId, carts, sendRequest, setCurrentCart]
  )

  const addCartToCarts = useCallback(
    (cart: Cart): void => {
      dispatch({
        type: 'SET_CARTS',
        payload: [...carts, { ...cart, id: highestId + 1 }],
      })
    },
    [highestId, carts]
  )

  const addModeHandler = (mode: boolean) => {
    dispatch({ type: 'CHANGE_MODE', payload: mode })
  }

  const value = {
    cartId,
    getCartId: setCurrentCart,
    showCart,
    showCartHandler,
    carts: carts,
    addCartToCarts,
    removeCart,
    showMessage,
    message,
    loading,
    error,
    detachError,
    addMode,
    setAddMode: addModeHandler,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContextProvider
