import { useContext, useEffect, useState } from 'react'
import CartsContext from '../../context/CartsContext'
import { Product } from '../../types'
import CartProductsItem from './CartProductsItem'

const CartProducts = () => {
  const { carts, currentCart } = useContext(CartsContext)
  const [thisCart, setThisCart] = useState<any>()

  useEffect(() => {
    const thisCart = carts.find(cart => cart.id === currentCart)
    setThisCart(thisCart)
  }, [currentCart, carts])

  return (
    <div>
      {thisCart?.products.map(
        ({
          id,
          discountPercentage,
          discountedPrice,
          price,
          quantity,
          title,
          total,
        }: Product) => (
          <CartProductsItem
            key={`${id}_cart_product_item_key`}
            id={id}
            discountPercentage={discountPercentage}
            discountedPrice={discountedPrice}
            price={price}
            quantity={quantity}
            title={title}
            total={total}
          />
        )
      )}
    </div>
  )
}

export default CartProducts
