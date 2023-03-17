import { CartsListItem as PropsType } from '../../types'
import Button from '../UI/Button'
import s from './CartsListItem.module.scss'

const CartsListItem = ({ id, totalProducts, totalAmount }: PropsType) => {
  return (
    <li key={id} className={s.cart}>
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
