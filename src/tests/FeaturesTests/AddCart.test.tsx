import { render, screen, within } from '@testing-library/react'
import AddCart from '../../components/Features/AddCart/AddCart'

const renderAddCart = async () => {
  const mock = jest.fn()
  render(<AddCart onCancel={mock} />)
  const products = await screen.findAllByLabelText('card')
  const showCartBtn = screen.getByRole('button', { name: /show cart/i })
  const cancelCartBtn = screen.getByRole('button', { name: /cancel/i })

  return { products, showCartBtn, cancelCartBtn }
}

it('should render 30 products', async () => {
  const { products } = await renderAddCart()
  expect(products).toHaveLength(30)
})

it('should render add to cart button on every product', async () => {
  const { products } = await renderAddCart()
  products.forEach(p => {
    const btn = within(p).getByRole('button', { name: /add to cart/i })
    expect(btn).toBeInTheDocument()
  })
})

it('should render AddCart and cancel button', async () => {
  const { showCartBtn, cancelCartBtn } = await renderAddCart()
  expect(showCartBtn).toBeInTheDocument()
  expect(cancelCartBtn).toBeInTheDocument()
})
