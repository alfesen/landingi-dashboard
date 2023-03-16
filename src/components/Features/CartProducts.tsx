import { useContext, useEffect, useState } from 'react'
import CartsContext from '../../context/CartsContext'

const CartProducts = () => {
  const { carts, currentCart } = useContext(CartsContext)
  const [thisCart, setThisCart] = useState<any>()

  useEffect(() => {
    const thisCart = carts.find(cart => cart.id === currentCart)
    setThisCart(thisCart)
  }, [currentCart, carts])

  return (
    <div>
      {thisCart?.products.map((p: any) => (
        <p key={p.id}>{p.title}</p>
      ))}
    </div>
  )
}

export default CartProducts
