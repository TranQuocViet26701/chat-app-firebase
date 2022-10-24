import { signOut } from 'firebase/auth'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import userImage from '../assets/user-image.jpeg'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'

export default function Navbar() {
  const navigate = useNavigate()
  const { currentUser } = React.useContext(AuthContext)

  const handleClick = () => {
    signOut(auth)
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
