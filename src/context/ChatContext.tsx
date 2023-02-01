import { createContext, Dispatch, useReducer } from 'react'
import { ChatActions, chatReducer } from './reducers/ChatReducer'

export type UserType = {
  uid?: string
  displayName?: string
  photoURL?: string
}

type InitialStateType = {
  chatId: string
  user: UserType
}

const initialState = {
  chatId: 'null',
  user: {},
}

export const ChatContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<ChatActions>
}>({
  state: initialState,
  dispatch: () => null,
})

type Props = {
  children?: React.ReactNode
}

export const ChatContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
