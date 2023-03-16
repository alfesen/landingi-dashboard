export type Product = {
  discountPercentage: number
  discountedPrice: number
  id: number
  price: number
  quantity: number
  title: string
  total: 60
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