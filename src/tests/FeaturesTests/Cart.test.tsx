import { render, screen } from '@testing-library/react'
import Cart from '../../components/Features/Cart/Cart'

describe('Cart component', () => {
  const renderCart = () => {
    render(<Cart />)
  }

  it('should render cart with five products', async () => {
    renderCart()
    const products = await screen.findAllByLabelText('card')
    expect(products).toHaveLength(5)
  })

  it('should render line chart', async () => {
    renderCart()
    const chart = await screen.findByTestId('chart')
    expect(chart).toBeInTheDocument()
  })
})
