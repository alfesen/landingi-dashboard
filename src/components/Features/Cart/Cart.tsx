import { useContext, useEffect, useState } from 'react'
import useFetchData from '../../../hooks/useFetchData'
import { CartContext } from '../../../context/CartContext'
import ProductItem from './ProductItem'
import { Product } from '../../../types'

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { sendRequest } = useFetchData()
  const { cartId } = useContext(CartContext)

  useEffect(() => {
    const fetchProducts = async () => {
      const cart = await sendRequest(`https://dummyjson.com/carts/${cartId}`)
      setProducts(cart.products)
    }
    fetchProducts()
  }, [sendRequest, cartId])

  const renderProducts = products.map((p: Product) => (
    <ProductItem
      key={p.id}
      id={p.id}
      title={p.title}
      quantity={p.quantity}
      price={p.price}
      discountPercentage={p.discountPercentage}
      discountedPrice={p.discountedPrice}
      total={p.total}
    />
  ))

  return <div>{renderProducts}</div>
}

export default Cart
