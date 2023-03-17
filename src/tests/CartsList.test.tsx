import { render, screen } from '@testing-library/react'
import CartsList from '../components/Features/CartsList'

describe('CartsList component', () => {
  it('should render 20 list items for each cart', async () => {
    render(<CartsList />)
    const items = await screen.findAllByRole('listitem')
    expect(items).toHaveLength(20)
  })

  it('should render loading unless items are loaded', async () => {
    render(<CartsList />)
    const loadingText = /loading/i
    const loading = screen.getByText(loadingText)
    expect(loading).toBeInTheDocument()
  })

  it('should not render loading text if data is already loaded', async () => {
    render(<CartsList />)
    const loadingText = /loading/i
    await screen.findAllByRole('listitem')
    const loading = screen.queryByText(loadingText)
    expect(loading).toBeNull()
  })

  it('should not render error text while loading', () => {
    render(<CartsList />)
    const loadingText = /loading/i
    const errorText = /failed to fetch/i

    const loading = screen.queryByText(loadingText)
    const error = screen.queryByText(errorText)

    expect(loading).not.toBeNull()
    expect(error).toBeNull()
  })

  it('should render error text if fetch request failed', async () => {
    global.fetch = jest.fn()
    render(<CartsList />)
    const errorText = /failed to fetch/i
    const error = await screen.findByText(errorText)
    expect(error).toBeInTheDocument()
  })

  it('should not render loading if error text is displayed', async () => {
    render(<CartsList />)
    const loadingText = /loading/i
    const errorText = /failed to fetch/i
    await screen.findByText(errorText)
    const loading = screen.queryByText(loadingText)
    const error = screen.getByText(errorText)
    expect(loading).toBeNull()
    expect(error).toBeInTheDocument()
  })
})
