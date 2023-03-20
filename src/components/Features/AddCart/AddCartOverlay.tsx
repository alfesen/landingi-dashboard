import { Fragment, useContext } from 'react'
import { CartContext } from '../../../context/CartContext'
import { Product } from '../../../types'
import Button from '../../UI/Button'
import Overlay from '../../UI/Overlay'
import AddedProducts from './AddedProducts'
import s from './AddCartOverlay.module.scss'

const AddCartOverlay = ({
  cartProducts,
  sendCart,
}: {
  cartProducts: Product[]
  sendCart: () => void
}) => {
  const { showCartHandler } = useContext(CartContext)

  return (
    <Overlay className={s.cart} onClose={() => showCartHandler(false)}>
      {cartProducts.length > 0 ? (
        <Fragment>
          <AddedProducts products={cartProducts} />
          <Button danger onClick={sendCart} className={s.cart__confirm}>
            Send Cart
          </Button>
        </Fragment>
      ) : (
        <p className={s.cart__error}>No products in this cart</p>
      )}
    </Overlay>
  )
}

export default AddCartOverlay
