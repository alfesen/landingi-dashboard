import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../../components/UI/Button'

describe('Button component', () => {
  const renderButton = () => {
    const mock = jest.fn()
    const className = 'class'
    const danger = 'danger'
    render(
      <Button className={className} onClick={mock} danger>
        Button
      </Button>
    )
    const button = screen.getByRole('button')
    return { mock, className, button, danger }
  }

  it('should render button with provided class', () => {
    const { className, button } = renderButton()
    const hasClass = button.className.includes(className)
    expect(hasClass).toBeTruthy()
  })

  it('should render danger styled button if truthy danger prop is provided', () => {
    const { button, danger } = renderButton()
    const hasDangerClass = button.className.includes(danger)
    expect(hasDangerClass).toBeTruthy()
  })

  it('should execute provided click function on click', () => {
    const { button, mock } = renderButton()
    userEvent.click(button)
    expect(mock).toHaveBeenCalled()
  })
})
