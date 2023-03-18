import s from './Error.module.scss'
const Error = ({ message }: { message: string }) => {
  return <div className={s.error}>{message}</div>
}

export default Error
