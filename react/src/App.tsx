import { Provider } from "react-redux"
import store from "./app/store"
import MessageList from "./features/messages/MessageList"
import MessageForm from "./features/messages/MessageForm"

function App() {
  return (
    <Provider store={store}>
      <div
        style={{ margin: "0 auto", maxWidth: "1024px", padding: "24px 8px" }}
      >
        <MessageForm />
        <MessageList />
      </div>
    </Provider>
  )
}

export default App
