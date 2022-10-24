import { useContext } from 'react'
import {
  BsCameraVideoFill as VideoIcon,
  BsFillPersonPlusFill as AddFriendIcon,
  BsThreeDots as MoreIcon,
} from 'react-icons/bs'
import { ChatContext } from '../context/ChatContext'

export default function ChatInfo() {
  const { state } = useContext(ChatContext)

  return (
    <div className='chatInfo'>
      <div className='title'>{state.user.displayName || 'Chat Box'}</div>
      <div className='chatIconList'>
        <VideoIcon />
        <AddFriendIcon />
        <MoreIcon />
      </div>
    </div>
  )
}
