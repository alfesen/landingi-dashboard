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
      <h2>
        {id}. {title}
      </h2>
      <div>
        <p>
          Price: <span>${price}</span>
        </p>
        <p>
          Quantity: <span>{quantity}</span>
        </p>
        <p>
          Discount Percentage: <span>{discountPercentage}%</span>
        </p>
        <p>
          Discounted Price: <span>${discountedPrice}</span>
        </p>
      </div>
      <h3>
        Total: <span>${total}</span>
      </h3>
    </Card>
  )
}

export default ProductItem
