import * as React from 'react'
import userImage from '../assets/user-image.jpeg'
import { MessageType } from './UserList'

export interface IUserChatProps {
  photoURL?: string
  displayName?: string
  message?: MessageType
  handleSelect?: () => void
  isMine?: boolean
  isActive?: boolean
}

export default function UserChat({
  photoURL,
  displayName,
  message,
  handleSelect,
  isMine = false,
  isActive = false,
}: IUserChatProps) {
  const handleClick = () => {
    if (!handleSelect) return

    handleSelect()
  }

  return (
    <div
      className={`userChat ${isActive ? 'isActive' : ''}`}
      onClick={handleClick}
    >
      <img src={photoURL || userImage} alt='' />
      <div className='info'>
        <span>{displayName}</span>
        {message && <p>{`${isMine ? 'You:' : ''} ${message.text}`}</p>}
      </div>
    </div>
  )
}
