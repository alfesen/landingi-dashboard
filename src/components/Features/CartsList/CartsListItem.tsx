import { Fragment, MouseEvent, useContext, useState } from 'react'
import { CartContext } from '../../../context/CartContext'
import { CartsListItem as PropsType } from '../../../types'
import Button from '../../UI/Button'
import Overlay from '../../UI/Overlay'
import s from './CartsListItem.module.scss'

const CartsListItem = ({ id, totalProducts, totalAmount }: PropsType) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)
  const { showCartHandler, getCartId, cartId, removeCart } =
    useContext(CartContext)

  const getCart = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.tagName.toLowerCase() !== 'button') {
      showCartHandler(false)
      getCartId(id)
    }
  }

  const openModal = () => {
    setShowConfirmDelete(true)
  }

  const closeModal = () => {
    setShowConfirmDelete(false)
  }

  const confirmDelete = () => {
    removeCart(id)
  }

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
        className={`${s.cart} ${cartId === id ? s.active : ''}`}>
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
