import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import userImage from '../assets/user-image.jpeg'
import { AuthContext } from '../context/AuthContext'
import { AuthTypes } from '../context/reducers/AuthReducer'

export default function Navbar() {
  const navigate = useNavigate()
  const { state: authState, dispatch } = React.useContext(AuthContext)
  const currentUser = authState.currentUser

  const handleClick = () => {
    dispatch({ type: AuthTypes.LOG_OUT, payload: null })
    navigate('/login')
  }

  return (
    <div className='navbar'>
      <h2 className='logo'>Chat App</h2>
      <div className='rightContent'>
        <img src={currentUser?.photoURL || userImage} alt='' />
        <h3 className='username'>{currentUser?.displayName}</h3>
        <button onClick={handleClick}>Logout</button>
      </div>
    </div>
  )
}
