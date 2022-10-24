import { signInWithEmailAndPassword } from 'firebase/auth'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

export default function Login() {
  const navigate = useNavigate()
  const [error, setError] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleSubmit = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    const email = e.target['email'].value
    const password = e.target['password'].value

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      const errorCode = (error as any).code
      const errorMessage = (error as any).message

      console.log('error: ', {
        errorCode,
        errorMessage,
      })

      setError(true)
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
          <button>Sign in</button>
          {loading && 'Uploading and compressing the image please wait...'}
          {error && <span>Something went wrong</span>}
        </form>
        <p className='suggestion'>
          You don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  )
}
