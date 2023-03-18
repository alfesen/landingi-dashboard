import { Fragment, useContext, useState } from 'react'
import { CartContext } from '../../../context/CartContext'
import { CartsListItem as PropsType } from '../../../types'
import Button from '../../UI/Button'
import Overlay from '../../UI/Overlay'
import s from './CartsListItem.module.scss'

const CartsListItem = ({ id, totalProducts, totalAmount }: PropsType) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)

  const cartCtx = useContext(CartContext)

  const getCart = () => {
    cartCtx.getCartId(id)
  }

  const openModal = () => {
    setShowConfirmDelete(true)
  }

  const closeModal = () => {
    setShowConfirmDelete(false)
  }

  const confirmDelete = () => {}

  return (
    <Fragment>
      {showConfirmDelete && (
        <Overlay onClose={closeModal}>
          <header className={s['cart__modal-header']}>
            <h3>{id}.</h3>
            <h3>Total: ${totalAmount}</h3>
          </header>
          <section className={s['cart__modal-prompt']}>
            <p>Do you want to delete this cart?</p>{' '}
          </section>
          <div className={s['cart__modal-actions']}>
            <Button
              className={`${s['cart__modal-cancel']} ${s['cart__modal-btn']}`}
              onClick={closeModal}>
              Cancel
            </Button>
            <Button
              danger
              className={`${s['cart__modal-confirm']} ${s['cart__modal-btn']}`}
              onClick={confirmDelete}>
              Confirm
            </Button>
          </div>
        </Overlay>
      )}
      <li
        onClick={getCart}
        key={id}
        className={`${s.cart} ${cartCtx.cartId === id ? s.active : ''}`}>
        <h4>{id}</h4>
        <div>
          <p>
            Total Products: <strong>{totalProducts}</strong>
          </p>
          <p>
            Total Amount: <strong>{totalAmount}</strong>
          </p>
        </div>

        <Button className={s.cart__remove} onClick={openModal}>
          Remove
        </Button>
      </li>
    </Fragment>
  )
}

export default CartsListItem
