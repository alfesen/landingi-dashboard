export type Product = {
  discountPercentage: number
  discountedPrice: number
  id: number
  price: number
  quantity: number
  title: string
  total: number
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
}

export type Card = {
  className: string
  children: React.ReactNode
}
