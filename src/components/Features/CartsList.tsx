import { useContext } from 'react'
import useFetchData from '../../hooks/useFetchData'
import CartsListItem from './CartsListItem'
import s from './CartsList.module.scss'
import CartsContext from '../../context/CartsContext'

const CartsList = () => {
  const { loading, error } = useFetchData()

  const { carts } = useContext(CartsContext)

  const renderCartsListItems = carts.map(({ id, totalProducts, total }) => {
    return (
      <CartsListItem
        key={`${id}_cart_list_item_key`}
        id={id}
        totalAmount={total}
        totalProducts={totalProducts}
      />
    )
  })

  return (
    <ul className={s.list}>
      {loading && !error && <p>loading</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && renderCartsListItems}
    </ul>
  )
}

export default CartsList
