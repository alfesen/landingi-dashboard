import { useEffect, useContext, Fragment } from 'react'
import CartsListItem from './CartsListItem'
import s from './CartsList.module.scss'
import Error from '../../UI/Error'
import Loading from '../../UI/Loading'
import { CartContext } from '../../../context/CartContext'
import Fallback from '../../UI/Fallback'
import Button from '../../UI/Button'

const CartsList = () => {
  const { getCartId, cartId, carts, loading, error, detachError, addMode, setAddMode } =
    useContext(CartContext)

  useEffect(() => {
    if (carts.length > 0) {
      const firstCart = carts?.reduce((prev, curr) =>
        prev.id < curr.id ? prev : curr
      )
      if (cartId) {
        getCartId(firstCart.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts])

  const renderCartsListItems = carts.map(({ id, totalProducts, total }) => {
    return (
      <CartsListItem
        aria-label='cart-list-item'
        key={`${id}_cart_list_item_key`}
        addCartMode={addMode}
        id={id}
        totalAmount={total}
        totalProducts={totalProducts}
      />
    )
  })

  return (
    <ul className={s.carts}>
      {loading && <Loading />}
      {!loading && (
        <Button className={s.carts__button} onClick={() => setAddMode(true)}>
          Add Cart
        </Button>
      )}
      {error && (
        <Fragment>
          <Error message={error} onDetach={detachError} />
        </Fragment>
      )}
      {!loading && !error && carts.length > 0 && renderCartsListItems}
      {!loading && !error && carts.length === 0 && (
        <Fallback message='No carts here' />
      )}
    </ul>
  )
}

export default CartsList
