import { useCallback, useEffect, useContext, useState, Fragment } from 'react'
import useFetchData from '../../../hooks/useFetchData'
import { Cart } from '../../../types'
import CartsListItem from './CartsListItem'
import s from './CartsList.module.scss'
import Error from '../../UI/Error'
import Loading from '../../UI/Loading'
import { CartContext } from '../../../context/CartContext'
import Fallback from '../../UI/Fallback'
import Button from '../../UI/Button'

const CartsList = ({
  setAddCart, addCartMode
}: {
  setAddCart: () => void,
  addCartMode?: boolean
}) => {
  const [carts, setCarts] = useState<Cart[]>([])
  const [currentCart, setCurrentCart] = useState<number | null>(null)
  const { sendRequest, loading, error, detachError } = useFetchData()
  const { getCartId, cartId } = useContext(CartContext)

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
      if (currentCart === cartId) {
        getCartId(firstCart.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts])

  const removeCart = useCallback(
    async (id: number) => {
      setCurrentCart(id)
      try {
        await sendRequest(`https://dummyjson.com/carts/${id}`, 'DELETE')
        setCarts(prevCarts => prevCarts.filter(c => c.id !== id))
      } catch (err: any) {}
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
      <li>
        <Button className={s.carts__button} onClick={setAddCart}>Add Cart</Button> 
      </li>
      {loading && <Loading />}
      {error && (
        <Fragment>
          <Error message={error} onDetach={detachError} />
        </Fragment>
      )}
      {!loading && !error && carts.length > 0 ? (
        renderCartsListItems
      ) : (
        <Fallback message='No carts here' />
      )}
    </ul>
  )
}

export default CartsList
