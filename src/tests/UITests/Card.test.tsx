import { render, screen } from '@testing-library/react'
import Card from '../../components/UI/Card'

describe('Card component', () => {
  const renderCard = () => {
    const className = 'class'
    const children = <h1>Heading</h1>
    render(<Card className={className}>{children}</Card>)
    return { className }
  }

  it('should be rendered with provided className', () => {
    const { className } = renderCard()
    const card = screen.getByLabelText(/card/i)
    const hasClass = card.className.includes(className)
    expect(hasClass).toBeTruthy()
  })

  it('should be rendered with provided children', () => {
    renderCard()
    const content = screen.getByRole('heading')
    expect(content).toBeInTheDocument()
  })
})
