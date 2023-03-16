import { Product } from '../../types'
import s from './CartProductsItem.module.scss'

const CartProductsItem = ({
  id,
  discountPercentage,
  discountedPrice,
  price,
  quantity,
  title,
  total,
}: Product) => {
  return (
    <div className={s['product-item']}>
      <h3 className={s['product-item__heading']}>
        {id}. {title}
      </h3>
      <div>
        <p className={s['product-item__info']}>
          Price: <span>${price}</span>
        </p>
        <p className={s['product-item__info']}>
          Discount: <span>{discountPercentage}%</span>
        </p>
        <p className={s['product-item__info']}>
          Discounted Price: <span>${discountedPrice}</span>
        </p>
        <p className={s['product-item__info']}>
          Quantity: <span>{quantity}</span>
        </p>
      </div>
      <h4 className={s['product-item__total']}>
        Total <span>${total}</span>
      </h4>
    </div>
  )
}

export default CartProductsItem
