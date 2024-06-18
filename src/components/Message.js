import { useMessage } from '../Context/MessageContext'
import { BackgroundColors } from '../shared/Constants'

const Message = () => {
  const { message } = useMessage()

  if (!message) return null

  return (
    <div
      className={`${
        BackgroundColors[message.type]
      } text-white p-4 fixed top-0 w-full`}
    >
      {message.text}
    </div>
  )
}

export default Message
