import { ReactNode } from 'react'
import s from './Button.module.scss'

type ButtonProps = {
  onClick: () => void
  children: ReactNode
  className?: string
  danger?: boolean
  disabled?: boolean
}

const Button = ({ onClick, children, className, danger, disabled }: ButtonProps) => {
  return (
    <button disabled={disabled}
      className={`${className ? className : ''} ${s.button} ${
        danger ? s.danger : ''
      }`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
