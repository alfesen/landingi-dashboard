import s from './Card.module.scss'

type Props = {
  className: string
  children: React.ReactNode
}

const Card = (props: Props) => {
  const { className, children } = props
  const { card } = s
  return <div className={`${className} ${card}`}>{children}</div>
}

export default Card
