import { Product } from '../../../types'
import Card from '../../UI/Card'

import s from './ProductItem.module.scss'

const ProductItem = ({
  id,
  title,
  price,
  discountedPrice,
  discountPercentage,
  total,
  quantity,
}: Product) => {
  return (
    <Card className={s.product}>
      <h2 className={s.product__header}>
        {id}. {title}
      </h2>
      <div className={s.product__body}>
        <p className={s.product__info}>
          Price: <span>${price}</span>
        </p>
        <p className={s.product__info}>
          Quantity: <span>{quantity}</span>
        </p>
        <p className={s.product__info}>
          Discount Percentage: <span>{discountPercentage}%</span>
        </p>
        <p className={s.product__info}>
          Discounted Price: <span>${discountedPrice}</span>
        </p>
      </div>
      <h3 className={s.product__total}>
        Total: <span>${total}</span>
      </h3>
    </Card>
  )
}

export default ProductItem
