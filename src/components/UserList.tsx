import { doc, onSnapshot, Timestamp } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext, UserType } from '../context/ChatContext'
import { Types } from '../context/reducers/ChatReducer'
import { db } from '../firebase'
import UserChat from './UserChat'

export type MessageType = {
  id?: string
  text: string
  img?: string
  date: Timestamp
  senderId: string
}

type UserChatType = {
  userInfo: UserType
  date: Timestamp
  lastMessage?: MessageType
}

export default function UserList() {
  const [userChats, setUserChats] = useState<any>({})
  const { state: authState } = useContext(AuthContext)
  const { state: chatState, dispatch } = useContext(ChatContext)
  const currentUser = authState.currentUser

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'userChats', currentUser?.uid as string),
      (doc) => {
        if (doc.data()) {
          setUserChats(doc.data())
        }
      }
    )
    // clean up
    return () => {
      unsub()
    }
  }, [currentUser?.uid])

  const handleSelect = (userInfo: UserType) => {
    dispatch({
      type: Types.CHANGE_USER,
      payload: { ...userInfo, currentUserId: currentUser?.uid },
    })
  }

  return (
    <div className='userList'>
      {Object.entries(userChats)?.map((chat) => {
        const { userInfo } = chat[1] as UserChatType

        return (
          <UserChat
            key={chat[0]}
            displayName={userInfo.displayName}
            photoURL={userInfo.photoURL}
            message={(chat[1] as UserChatType).lastMessage}
            handleSelect={() => handleSelect(userInfo)}
            isMine={
              currentUser?.uid ===
              (chat[1] as UserChatType).lastMessage?.senderId
            }
            isActive={chatState.user.uid === userInfo.uid}
          />
        )
      })}
    </div>
  )
}
