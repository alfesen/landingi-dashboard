import { render, screen, within } from '@testing-library/react'
import App from './App'
import 'jest-canvas-mock'

describe('CartsList component', () => {
  it('should render list with "Add Cart" button and 20 initial products', async () => {
    render(<App />)
    const cartProducts = await screen.findAllByLabelText('card')
    const cartsListItems = await screen.findAllByRole('listitem')
    const addCartButton = await screen.findByRole('button', {
      name: /add cart/i,
    })
    cartsListItems.forEach(item => {
      const btn = within(item).getByRole('button', { name: /remove/i })
      expect(btn).toBeInTheDocument()
    })
    expect(addCartButton).toBeInTheDocument()
    expect(cartsListItems).toHaveLength(20)
    expect(cartProducts).toHaveLength(5)
  })
})
