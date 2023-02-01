import { User } from 'firebase/auth'
import { createContext, Dispatch, useReducer } from 'react'
import { AuthActions, authReducer } from './reducers/AuthReducer'

export type InitialStateType = {
  isLogin: boolean
  currentUser: User | null
}

const initialState = {
  isLogin: false,
  currentUser: null,
}

export const AuthContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<AuthActions>
}>({
  state: initialState,
  dispatch: () => null,
})

type Props = {
  children?: React.ReactNode
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
