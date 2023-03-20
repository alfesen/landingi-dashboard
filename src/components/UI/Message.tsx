import Card from './Card'
import s from './Message.module.scss'

const Message = ({ error, message }: { error?: boolean; message: string }) => {
  return (
    <Card className={`${s.message} ${error && s.message__error}`}>
      {message}
    </Card>
  )
}

export default Message
