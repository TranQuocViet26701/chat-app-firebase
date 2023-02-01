import { onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import { AuthContext } from './context/AuthContext'
import { AuthTypes } from './context/reducers/AuthReducer'
import { auth } from './firebase'
import { Home, Login, Register } from './pages'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { state } = useContext(AuthContext)
  const { isLogin } = state
  console.log('protected route: ', state)
  if (!isLogin) return <Navigate to='/login' replace={true} />

  return <>{children}</>
}

function App() {
  const { dispatch } = useContext(AuthContext)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({
        type: AuthTypes.CHANGE_CURRENT_USER,
        payload: user,
      })
    })

    // clean up real time
    return () => {
      unsub()
    }
  }, [])

  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
