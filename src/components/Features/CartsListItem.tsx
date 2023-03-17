import { CartsListItem as PropsType } from '../../types'
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
    </li>
  )
}

export default CartsListItem
