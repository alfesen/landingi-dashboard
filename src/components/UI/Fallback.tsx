import { Fallback as PropTypes } from '../../types'
import s from './Fallback.module.scss'

const Fallback = ({ dark, message }: PropTypes): JSX.Element => {
  return <p className={`${s.fallback} ${dark ? s.dark : ''}`}>{message}</p>
}

export default Fallback
