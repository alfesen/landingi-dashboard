import { useContext, useEffect, useState } from 'react'
import useFetchData from '../../../hooks/useFetchData'
import { CartContext } from '../../../context/CartContext'
import ProductItem from '../shared/ProductItem'
import { Product } from '../../../types'
import Error from '../../UI/Error'
import Loading from '../../UI/Loading'

import s from './Cart.module.scss'
import Fallback from '../../UI/Fallback'

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { sendRequest, error, loading, detachError } = useFetchData()
  const { cartId, carts } = useContext(CartContext)

  useEffect(() => {
    const fetchProducts = async () => {
      if (cartId <= 20) {
        const cart = await sendRequest(`https://dummyjson.com/carts/${cartId}`)
        setProducts(cart.products)
      }
      return
    }
    if (cartId > 20) {
      const cart = carts.find(c => c.id === cartId)
      setProducts(cart!.products)
      return
    }
    fetchProducts()
  }, [sendRequest, cartId, carts])

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

  return (
    <section className={s.cart}>
      {loading && <Loading dark />}
      {error && <Error onDetach={detachError} message={error} />}
      {!loading && !error && products.length > 0
        ? renderProducts
        : !loading && <Fallback message={'No products in this cart'} dark />}
    </section>
  )
}

export default Cart
