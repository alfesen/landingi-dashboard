import { Product } from '../../../types'
import { countDiscount } from '../../../helpers'
import ProductItem from '../shared/ProductItem'

const CartProducts = ({ products }: { products: Product[] }) => {
  const renderCartProducts = products.map((p: Product) => {
    return (
      <ProductItem
        key={p.id}
        id={p.id}
        title={p.title}
        price={p.price * p.quantity!}
        quantity={p.quantity}
        discountPercentage={p.discountPercentage}
        discountedPrice={
          +countDiscount(p.price, p.discountPercentage) * p.quantity!
        }
        total={p.total}
      />
    )
  })

  return <ul>{renderCartProducts}</ul>
}

export default CartProducts
