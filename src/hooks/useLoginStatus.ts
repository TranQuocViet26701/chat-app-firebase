import { useContext } from 'react'
import { AuthContext } from './../context/AuthContext'
export default function useLoginStatus() {
  const { state } = useContext(AuthContext)

  return state.isLogin
}
