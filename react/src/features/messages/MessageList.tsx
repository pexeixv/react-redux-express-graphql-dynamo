import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchMessages, selectMessages } from "./messagesSlice"

function MessageList() {
  const dispatch = useDispatch()
  const { messages, loading, error } = useSelector(selectMessages)

  useEffect(() => {
    dispatch(fetchMessages())
  }, [dispatch])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default MessageList
