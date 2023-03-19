import { createContext, ReactNode, useState } from 'react'

interface CartContextInterface {
  cartId: number
  getCartId: (cartId: number) => void
  showCart: boolean
  showCartHandler: (bool: boolean) => void
}

export const CartContext = createContext<CartContextInterface>({
  cartId: 1,
  getCartId: (cartId: number) => {},
  showCart: false,
  showCartHandler: (bool: boolean) => {}
})

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartId, setCartId] = useState<number>(1)
  const [showCart, setShowCart] = useState<boolean>(false)

  const setCurrentCart = (cartId: number) => {
    setCartId(cartId)
  }

  const showCartHandler = (bool: boolean) => {
    setShowCart(bool)
  }

  const value = { cartId, getCartId: setCurrentCart, showCart, showCartHandler }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartContextProvider
