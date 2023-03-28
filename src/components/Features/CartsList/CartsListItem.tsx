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
}: PropsType): JSX.Element => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)
  const { showCartHandler, getCartId, cartId, removeCart, setAddMode } =
    useContext(CartContext)

  const getCart = (e: MouseEvent): void => {
    const target = e.target as HTMLElement
    if (target.tagName.toLowerCase() !== 'button') {
      showCartHandler(false)
      getCartId(id)
      setAddMode(false)
    }
  }

  const openModal = (): void => {
    setShowConfirmDelete(true)
  }

  const closeModal = (): void => {
    setShowConfirmDelete(false)
  }

  const confirmDelete = (): void => {
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
