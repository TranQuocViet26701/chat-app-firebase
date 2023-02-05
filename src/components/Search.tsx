import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import * as React from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { Types } from '../context/reducers/ChatReducer'
import { db } from '../firebase'
import UserChat from './UserChat'

export default function Search() {
  const [username, setUsername] = React.useState<string>('')
  const [user, setUser] = React.useState<any>()
  const { state: authState } = React.useContext(AuthContext)
  const currentUser = authState.currentUser
  const { state: chatState, dispatch } = React.useContext(ChatContext)

  const handleSearch = async () => {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('displayName', '==', username))

    try {
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        toast.error('No user found!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      } else
        querySnapshot.forEach((doc) => {
          setUser(doc.data())
        })
    } catch (error) {
      console.log('error: ', error)
      toast.error('Something went wrong!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === 'Enter' && handleSearch()
  }

  const handleSelect = async () => {
    // check wheter the group is created, if not create
    const currentUserId = currentUser?.uid as string
    const userId = user?.uid as string
    const combineId =
      currentUserId > userId ? currentUserId + userId : userId + currentUserId

    try {
      const res = await getDoc(doc(db, 'chats', combineId))

      if (!res.exists()) {
        // create user chat
        await setDoc(doc(db, 'chats', combineId), { messages: [] })

        // update userChats for current user
        await updateDoc(doc(db, 'userChats', currentUser?.uid as string), {
          [combineId + '.userInfo']: {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid,
          },
        })

        // update userChats for user
        await updateDoc(doc(db, 'userChats', user?.uid as string), {
          [combineId + '.userInfo']: {
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
            uid: currentUser?.uid,
          },
        })
      }

      dispatch({
        type: Types.CHANGE_USER,
        payload: { ...user, currentUserId: currentUser?.uid },
      })
      setUsername('')
      setUser(null)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type='text'
          name='search'
          id='search'
          placeholder='Find a user'
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          value={username}
        />
      </div>
      {user && (
        <UserChat
          displayName={user.displayName}
          photoURL={user.photoURL}
          handleSelect={handleSelect}
        />
      )}
    </div>
  )
}
