import { render, screen } from '@testing-library/react'
import CartsListItem from '../../components/Features/CartsList/CartsListItem'

describe('CartsListItem component', () => {
  const renderItem = () => {
    const id = 6
    const totalProducts = 12
    const totalAmount = 24
    const mock = jest.fn()
    render(
      <CartsListItem
        id={id}
        totalProducts={totalProducts}
        totalAmount={totalAmount}
      />
    )

    return { id, totalProducts, totalAmount, mock }
  }

  it('should render the list item with provided props as a data', () => {
    const { id, totalProducts, totalAmount } = renderItem()

    const liItem = screen.getByRole('listitem')

    const idEl = screen.getByText(id)
    const totalProductsEl = screen.getByText(totalProducts)
    const totalAmountEl = screen.getByText(totalAmount)

    expect(liItem).toBeInTheDocument()
    expect(idEl).toBeInTheDocument()
    expect(totalProductsEl).toBeInTheDocument()
    expect(totalAmountEl).toBeInTheDocument()
  })
})
