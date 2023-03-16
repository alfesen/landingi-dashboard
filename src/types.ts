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
  discountedTotal: number
  id: 1
  products: Product[]
  totalProducts: number
  totalQuantity: number
  userId: number
}
