import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

type InitialStateType = {
  currentUser: User | null
}

const initialState = {
  currentUser: null,
}

export const AuthContext = createContext<InitialStateType>(initialState)

type Props = {
  children?: React.ReactNode
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })

    // clean up real time
    return () => {
      unsub()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
