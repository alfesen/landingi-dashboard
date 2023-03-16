import { CartsListItem as PropsType } from '../../types'

const CartsListItem = ({ id, totalProducts, totalAmount }: PropsType) => {
  return (
    <li key={id}>
      <h4>{id}</h4>
      <div>
        <p>
          Total Products: <strong>{totalProducts}</strong>
        </p>
        <p>
          Total Amount: <strong>{totalAmount}</strong>
        </p>
      </div>
    </li>
  )
}

export default CartsListItem
