import { useState } from "react"
import { useDispatch } from "react-redux"
import { addMessage } from "./messagesSlice"

function MessageForm() {
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")

  const handleAddMessage = e => {
    e.preventDefault()
    if (message.trim()) {
      dispatch(addMessage(message))
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleAddMessage}>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button>Add Message</button>
    </form>
  )
}

export default MessageForm
