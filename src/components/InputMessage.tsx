import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useContext, useState } from 'react'
import {
  MdAddPhotoAlternate as AddPhotoIcon,
  MdAttachFile as AttachFileIcon,
} from 'react-icons/md'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'

export default function InputMessage() {
  const [message, setMessage] = useState<string>('')
  const [img, setImg] = useState<FileList | null>(null)
  const { state: chatState } = useContext(ChatContext)
  const { state: authState } = useContext(AuthContext)
  const currentUser = authState.currentUser

  const handleSend = async () => {
    if (img && img[0]) {
      const date = new Date().getTime()
      const storageRef = ref(storage, `images/chats/${chatState.chatId}${date}`)
      const uploadTask = uploadBytesResumable(storageRef, img[0])
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        (error) => {
          console.log('error: ', error)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

            await updateDoc(doc(db, 'chats', chatState.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: message,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            })
          } catch (err) {
            console.log('error: ', err)
          }
        }
      )
    } else {
      await updateDoc(doc(db, 'chats', chatState.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: message,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      })
    }

    await updateDoc(doc(db, 'userChats', currentUser?.uid as string), {
      [chatState.chatId + '.lastMessage']: {
        text: message,
      },
      [chatState.chatId + '.date']: serverTimestamp(),
    })

    await updateDoc(doc(db, 'userChats', chatState.user.uid as string), {
      [chatState.chatId + '.lastMessage']: {
        text: message,
      },
      [chatState.chatId + '.date']: serverTimestamp(),
    })

    setMessage('')
    setImg(null)
  }

  return (
    <div className='inputMessage'>
      <input
        type='text'
        name='message'
        id='message'
        placeholder='Type something...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className='send'>
        <input type='file' name='file' id='file' style={{ display: 'none' }} />
        <label htmlFor='file'>
          <AttachFileIcon height={24} />
        </label>
        <input
          type='file'
          name='images'
          id='images'
          style={{ display: 'none' }}
          onChange={(e) => setImg(e.target.files)}
        />
        <label htmlFor='images'>
          <AddPhotoIcon height={24} />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}
