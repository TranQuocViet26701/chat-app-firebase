import { useContext } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.scss'
import { AuthContext } from './context/AuthContext'
import { Home, Login, Register } from './pages'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) return <Navigate to='/login' />

  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
