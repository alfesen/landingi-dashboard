import { Fragment, MouseEvent, useContext, useState } from 'react'
import { CartContext } from '../../../context/CartContext'
import { CartsListItem as PropsType } from '../../../types'
import Button from '../../UI/Button'
import s from './CartsListItem.module.scss'
import RemoveModal from './RemoveModal'

const CartsListItem = ({
  id,
  totalProducts,
  totalAmount,
  addCartMode,
}: PropsType) => {
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
        <RemoveModal
          id={id}
          totalAmount={totalAmount}
          onClose={closeModal}
          onConfirm={confirmDelete}
        />
      )}
      <li
        onClick={getCart}
        key={id}
        className={`${s.cart} ${
          !addCartMode && cartId === id ? s.active : ''
        }`}>
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
