import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import userImage from '../assets/user-image.jpeg'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { AuthTypes } from '../context/reducers/AuthReducer'
import { Types } from '../context/reducers/ChatReducer'

export default function Navbar() {
  const navigate = useNavigate()
  const { state: authState, dispatch: authDispatch } =
    React.useContext(AuthContext)
  const currentUser = authState.currentUser
  const { dispatch: chatDispatch } = React.useContext(ChatContext)

  const handleClick = () => {
    authDispatch({ type: AuthTypes.LOG_OUT, payload: null })
    chatDispatch({ type: Types.CLEAR, payload: null })
    navigate('/login', { replace: true })
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
