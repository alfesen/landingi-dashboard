import { screen, render } from '@testing-library/react'
import CartsListItem from '../components/Features/CartsListItem'

describe('CartListItem', () => {
  it('should render list item with provided id, totalProducts and totalAmount prop values', () => {
    const id = 6
    const totalProducts = 12
    const totalAmount = 24
    render(
      <CartsListItem
        id={id}
        totalProducts={totalProducts}
        totalAmount={totalAmount}
      />
    )
    const idEl = screen.getByText(id)
    const totalProductsEl = screen.getByText(totalProducts)
    const totalAmountEl = screen.getByText(totalProducts)
    expect(idEl).toBeInTheDocument()
    expect(totalProductsEl).toBeInTheDocument()
    expect(totalAmountEl).toBeInTheDocument()
  })
})
