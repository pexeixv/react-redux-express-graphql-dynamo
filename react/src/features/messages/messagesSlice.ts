// features/messages/messageSlice.ts

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit"
import axios from "axios"
import { type RootState } from "../../app/store"

interface MessageState {
  messages: string[]
  loading: boolean
  error: string | null
}

const initialState: MessageState = {
  messages: [],
  loading: false,
  error: null,
}

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const response = await axios.get("http://localhost:4000/api/messages")
    return response.data
  },
)

export const addMessage = createAsyncThunk(
  "messages/addMessage",
  async (message: string) => {
    const response = await axios.post("http://localhost:4000/api/messages", {
      content: message,
    })
    return response.data
  },
)

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMessages.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchMessages.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.loading = false
          state.messages = action.payload
        },
      )
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? "Failed to fetch messages."
      })
      .addCase(addMessage.fulfilled, (state, action: PayloadAction<string>) => {
        state.messages.push(action.payload)
      })
  },
})

export const selectMessages = (state: RootState) => state.messages
export default messageSlice.reducer
