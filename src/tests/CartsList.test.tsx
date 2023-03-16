import { screen, render } from '@testing-library/react'
import CartsList from '../components/Features/CartsList'

describe('CartsList', () => {
  it("should render loading text until carts aren't loaded", () => {
    render(<CartsList />)
    const loadingText = screen.getByText(/loading/i)
    expect(loadingText).toBeInTheDocument()
  })

  it('should not render loading text if failed fetching data', async () => {
    render(<CartsList />)
    await screen.findAllByLabelText('carts-list-item')
    const loadingText = screen.queryByText(/loading/i)
    expect(loadingText).toBeNull()
  })

  it('should render 20 carts-list-items when loaded', async () => {
    render(<CartsList />)
    const items = await screen.findAllByLabelText('carts-list-item')
    expect(items).toHaveLength(20)
  })

  it('should render error text when failed to fetch cards', async () => {
    global.fetch = jest.fn()
    render(<CartsList />)
    const error = await screen.findByText(/failed/i)
    expect(error).toBeInTheDocument()
  })

  it('should not render loading text when carts are loaded', async () => {
    render(<CartsList />)
    await screen.findByText(/failed/i)
    const loadingText = screen.queryByText(/loading/i)
    expect(loadingText).toBeNull()
  })
})
