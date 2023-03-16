import { Product } from '../../types'

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
    <div>
      <h3>
        {id}. {title}
      </h3>
      <div>
        <p>
          Price: <span>${price}</span>
        </p>
        <p>
          Discount: <span>{discountPercentage}%</span>
        </p>
        <p>
          Discounted Price: <span>${discountedPrice}</span>
        </p>
        <p>
          Quantity: <span>{quantity}</span>
        </p>
      </div>
      <h4>
        Total <span>${total}</span>
      </h4>
    </div>
  )
}

export default CartProductsItem
