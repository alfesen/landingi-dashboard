import { Product } from '../../../types'
import Button from '../../UI/Button'
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
  add,
  onAdd,
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
      <div className={s.product__actions}>
        {add && onAdd && <Button onClick={onAdd}>Add to Cart</Button>}
      </div>
    </Card>
  )
}

export default ProductItem
