import { signInWithEmailAndPassword } from 'firebase/auth'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader } from '../components/icons/Loader'
import { AuthContext } from '../context/AuthContext'
import { AuthTypes } from '../context/reducers/AuthReducer'
import { auth } from '../firebase'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState<boolean>(false)
  const { dispatch } = React.useContext(AuthContext)

  const handleSubmit = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    const email = e.target['email'].value
    const password = e.target['password'].value

    try {
      const response = await signInWithEmailAndPassword(auth, email, password)

      if (response.user) {
        dispatch({
          type: AuthTypes.LOG_IN,
          payload: response.user,
        })
        toast.success('Login successful', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        navigate('/')
      }
    } catch (error) {
      const errorCode = (error as any).code
      const errorMessage = (error as any).message

      console.log('error: ', {
        errorCode,
        errorMessage,
      })

      toast.error(errorMessage || 'Something went wrong!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setLoading(false)
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <h1 className='logo'>Chat App</h1>
        <h2 className='title'>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='email'
            id='email'
            placeholder='email'
            required
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='password'
            required
          />
          <button className='submit-btn' disabled={loading}>
            {loading && <Loader className='spinner' />}
            Sign in
          </button>
        </form>
        <p className='suggestion'>
          You don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  )
}
