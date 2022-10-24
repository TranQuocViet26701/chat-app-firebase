import { doc, onSnapshot } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Message from './Message'
import { MessageType } from './UserList'

export default function MessageList() {
  const { state: chatState } = useContext(ChatContext)

  const [messageList, setMessageList] = useState<MessageType[]>([])

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', chatState.chatId), (doc) => {
      doc.exists() && setMessageList(doc.data().messages)
    })

    return () => {
      unsub()
    }
  }, [chatState.chatId])

  return (
    <div className='messageList'>
      {messageList?.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}
