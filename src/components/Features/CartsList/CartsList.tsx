import { useEffect, useState } from 'react'
import useFetchData from '../../../hooks/useFetchData'
import { Cart } from '../../../types'
import CartsListItem from './CartsListItem'
import s from './CartsList.module.scss'

const CartsList = () => {
  const [carts, setCarts] = useState<Cart[]>([])
  const { sendRequest, loading, error } = useFetchData()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { carts } = await sendRequest('https://dummyjson.com/carts')
        setCarts(carts)
      } catch (err) {}
    }
    fetchData()
  }, [sendRequest])

  const renderCartsListItems = carts.map(({ id, totalProducts, total }) => {
    return (
      <CartsListItem
        key={`${id}_cart_list_item_key`}
        id={id}
        totalAmount={total}
        totalProducts={totalProducts}
      />
    )
  })

  return (
    <ul className={s.carts}>
      {loading && <p className={s.carts__loading}>Loading...</p>}
      {error && <p className={s.carts__error}>{error}</p>}
      {!loading && !error && renderCartsListItems}
    </ul>
  )
}

export default CartsList