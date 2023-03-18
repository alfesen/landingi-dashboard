import { render, screen } from '@testing-library/react'
import Cart from '../../components/Features/Cart/Cart'

describe('Cart component', () => {
  it('should render Cart with products', async () => {
    render(<Cart />)
    const products = await screen.findAllByRole('heading')
    expect(products).not.toBeUndefined()
  })

  it('should render loading text before cart is fetched', () => {
    render(<Cart />)
    const loadingText = screen.getByText(/loading/i)
    expect(loadingText).toBeInTheDocument()
  })

  it('should not render loading text after cart is fetched', async () => {
    render(<Cart />)
    await screen.findAllByRole('heading')
    const loadingText = screen.queryByText(/loading/i)
    expect(loadingText).toBeNull()
  })

  it('should not render error message if cart was fetched correctly', async () => {
    render(<Cart />)
    await screen.findAllByRole('heading')
    const errorText = /failed to fetch/i
    const error = screen.queryByText(errorText)
    expect(error).toBeNull()
  })
})
