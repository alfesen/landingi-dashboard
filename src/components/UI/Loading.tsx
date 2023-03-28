import s from './Loading.module.scss'

const Loading = ({dark}: {dark?: boolean}): JSX.Element => {
  return (
    <div className={`${s.loading} ${dark ? s.dark : ''}`}>Loading...</div>
  )
}

export default Loading