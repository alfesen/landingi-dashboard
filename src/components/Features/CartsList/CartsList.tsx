import { useCallback, useEffect, useContext, useState } from 'react'
import useFetchData from '../../../hooks/useFetchData'
import { Cart } from '../../../types'
import CartsListItem from './CartsListItem'
import s from './CartsList.module.scss'
import Error from '../../UI/Error'
import Loading from '../../UI/Loading'
import { CartContext } from '../../../context/CartContext'

const CartsList = () => {
  const [carts, setCarts] = useState<Cart[]>([])
  const { sendRequest, loading, error } = useFetchData()
  const { getCartId } = useContext(CartContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { carts } = await sendRequest('https://dummyjson.com/carts')
        setCarts(carts)
      } catch (err) {}
    }
    fetchData()
  }, [sendRequest])

  useEffect(() => {
    if (carts.length > 0) {
      const firstCart = carts?.reduce((prev, curr) =>
        prev.id < curr.id ? prev : curr
      )
      getCartId(firstCart.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts])

  const removeCart = useCallback(
    async (id: number) => {
      try {
        await sendRequest(`https://dummyjson.com/carts/${id}`, 'DELETE')
        setCarts(prevCarts => prevCarts.filter(c => c.id !== id))
      } catch (err) {}
    },
    [sendRequest]
  )

  const renderCartsListItems = carts.map(({ id, totalProducts, total }) => {
    return (
      <CartsListItem
        key={`${id}_cart_list_item_key`}
        id={id}
        removeCart={removeCart}
        totalAmount={total}
        totalProducts={totalProducts}
      />
    )
  })

  return (
    <ul className={s.carts}>
      {loading && <Loading />}
      {error && <Error message={error} />}
      {!loading && !error && renderCartsListItems}
    </ul>
  )
}

export default CartsList
