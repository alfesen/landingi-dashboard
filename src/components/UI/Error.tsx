import Button from './Button'
import s from './Error.module.scss'
const Error = ({
  message,
  onDetach,
}: {
  message: string
  onDetach: () => void
}) => {
  return (
    <div className={s.error}>
      {message}
      <Button className={s.error__detach} onClick={onDetach}>Detach</Button>
    </div>
  )
}

export default Error
