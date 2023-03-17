import { useContext } from 'react'
import { CartContext } from '../../../context/CartContext'
import { CartsListItem as PropsType } from '../../../types'
import Button from '../../UI/Button'
import s from './CartsListItem.module.scss'

const CartsListItem = ({ id, totalProducts, totalAmount }: PropsType) => {
  const cartCtx = useContext(CartContext)

  const getCart = () => {
    cartCtx.getCartId(id)
  }

  return (
    <li onClick={getCart} key={id} className={s.cart}>
      <h4>{id}</h4>
      <div>
        <p>
          Total Products: <strong>{totalProducts}</strong>
        </p>
        <p>
          Total Amount: <strong>{totalAmount}</strong>
        </p>
      </div>

      <Button className={s.cart__remove} onClick={() => {}}>
        Remove
      </Button>
    </li>
  )
}

export default CartsListItem
