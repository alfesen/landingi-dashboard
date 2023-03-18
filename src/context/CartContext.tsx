import { createContext, ReactNode, useState } from 'react'

interface CartContextInterface {
  cartId: number
  getCartId: (cartId: number) => void
}

export const CartContext = createContext<CartContextInterface>({
  cartId: 1,
  getCartId: (cartId: number) => {},
})

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartId, setCartId] = useState<number>(1)

  const setCurrentCart = (cartId: number) => {
    setCartId(cartId)
  }
  const value = { cartId, getCartId: setCurrentCart }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContextProvider
