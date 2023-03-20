import { Button as PropTypes } from '../../types'
import s from './Button.module.scss'

const Button = ({
  onClick,
  children,
  className,
  danger,
  disabled,
}: PropTypes) => {
  return (
    <button
      disabled={disabled}
      className={`${className ? className : ''} ${s.button} ${
        danger ? s.danger : ''
      }`}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
