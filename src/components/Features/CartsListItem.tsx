import { CartsListItem as PropsType } from '../../types'
import s from './CartsListItem.module.scss'

const CartsListItem = ({ id, totalProducts, totalAmount }: PropsType) => {
  return (
    <li className={s['list-item']} aria-label='carts-list-item' key={id}>
      <h4 className={s['list-item__id']}>{id}</h4>
      <div className={s['list-item__info']}>
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
