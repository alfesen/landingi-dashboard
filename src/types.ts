import { ReactNode } from 'react'

export type Reducer<S, A> = (prevState: S, action: A) => S

export type State = {
  cartId: number
  showCart: boolean
  carts: Cart[]
  message: string | null
}

export type Action =
  | { type: 'SET_ID'; payload: number }
  | { type: 'SHOW_CART'; payload: boolean }
  | { type: 'SET_CARTS'; payload: Cart[] }
  | { type: 'SET_MESSAGE'; payload: string | null }

export interface CartContextInterface {
  cartId: number
  showCart: boolean
  carts: Cart[]
  message: string | null
  loading: boolean
  error: string | null
  getCartId: (cartId: number) => void
  showCartHandler: (bool: boolean) => void
  addCartToCarts: (cart: Cart) => void
  removeCart: (id: number) => void
  showMessage: (message: string) => void
  detachError: () => void
}

export type Product = {
  discountPercentage: number
  discountedPrice: number
  id: number
  price: number
  quantity?: number
  title: string
  total?: number
  add?: boolean
  onAdd?: () => void
}

export type Cart = {
  total: number
  discountedTotal: number
  id: number
  products: Product[]
  totalProducts: number
  totalQuantity: number
  userId: number
}

export type CartsListItem = {
  id: number
  totalAmount: number
  totalProducts: number
  addCartMode?: boolean
}

export type Card = {
  className: string
  children: React.ReactNode
}

export type AddCartOverlay = {
  cartProducts: Product[]
  sendCart: () => void
}

export type RemoveModal = {
  onClose: () => void
  id: number
  totalAmount: number
  onConfirm: () => void
}
export type Button = {
  onClick: () => void
  children: ReactNode
  className?: string
  danger?: boolean
  disabled?: boolean
}

export type Error = {
  message: string
  onDetach: () => void
}

export type Fallback = {
  dark?: boolean
  message: string
}

export type Message = {
  error?: boolean
  message: string
}
