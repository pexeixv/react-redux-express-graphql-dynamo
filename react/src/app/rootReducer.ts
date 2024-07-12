import { combineReducers } from "@reduxjs/toolkit"
import messageReducer from "../features/messages/messagesSlice"

const rootReducer = combineReducers({
  messages: messageReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
