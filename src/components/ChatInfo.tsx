import { useContext } from 'react'
import {
  BsCameraVideoFill as VideoIcon,
  BsFillPersonPlusFill as AddFriendIcon,
  BsThreeDots as MoreIcon,
} from 'react-icons/bs'
import { ChatContext } from '../context/ChatContext'

export default function ChatInfo() {
  const { state: chatState } = useContext(ChatContext)

  return (
    <div className='chatInfo'>
      <div className='userInfo'>
        {chatState.user && <img src={chatState.user.photoURL} alt='' />}
        <div className='title'>{chatState.user.displayName || 'Chat Box'}</div>
      </div>
      <div className='chatIconList'>
        <VideoIcon />
        <AddFriendIcon />
        <MoreIcon />
      </div>
    </div>
  )
}
