import { Message as PropTypes } from '../../types'
import Card from './Card'
import s from './Message.module.scss'

const Message = ({ error, message }: PropTypes): JSX.Element => {
  return (
    <Card className={`${s.message} ${error && s.message__error}`}>
      {message}
    </Card>
  )
}

export default Message
