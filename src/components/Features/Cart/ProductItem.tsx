import { Product } from '../../../types'

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
    <div>
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
    </div>
  )
}

export default ProductItem
