import { createContext } from 'react'
import { Cart } from '../types'

type CartContextType = {
  carts: Cart[]
  addCart: (cart: Cart) => void
  removeCart: (id: number) => void
}

const CartsContext = createContext<CartContextType>({
  carts: [],
  addCart: (cart: Cart) => {},
  removeCart: (id: number) => {},
})

export default CartsContext
