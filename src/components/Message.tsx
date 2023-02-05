import moment from 'moment'
import { useContext, useMemo } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { MessageType } from './UserList'

export interface MessageProps {
  message: MessageType
}

export default function Message({ message }: MessageProps) {
  const { state: authState } = useContext(AuthContext)
  const currentUser = authState.currentUser
  const { state: chatState } = useContext(ChatContext)

  const isOwner = useMemo(
    () => message.senderId === currentUser?.uid,
    [currentUser?.uid, message.senderId]
  )

  return (
    <div className={`message ${isOwner ? 'owner' : ''}`}>
      <div className='row'>
        <img
          className='info'
          src={isOwner ? currentUser?.photoURL || '' : chatState.user.photoURL}
          alt=''
        />
        <div className='content'>
          <span>{message.text}</span>
          {message.img && <img src={message.img} alt='' />}
        </div>
      </div>
      <div className='time'>
        {moment(message.date.toDate().toString()).fromNow()}
      </div>
    </div>
  )
}
