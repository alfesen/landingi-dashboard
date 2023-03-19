import s from './Fallback.module.scss'

const Fallback = ({ dark, message }: { dark?: boolean; message: string }) => {
  return <p className={`${s.fallback} ${dark ? s.dark : ''}`}>{message}</p>
}

export default Fallback
