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
import { AuthContext } from '../context/AuthContext'
import { db } from '../firebase'
import UserChat from './UserChat'

export default function Search() {
  const [username, setUsername] = React.useState<string>('')
  const [user, setUser] = React.useState<any>()
  const [error, setError] = React.useState<boolean>(false)

  const { currentUser } = React.useContext(AuthContext)

  const handleSearch = async () => {
    setError(false)
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('displayName', '==', username))

    try {
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      })
    } catch (error) {
      console.log('error: ', error)
      setError(true)
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
        await setDoc(doc(db, 'chats', combineId), { message: [] })
      }

      await updateDoc(doc(db, 'userChats', currentUser?.uid as string), {
        [combineId + '.userInfo']: {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        },
        [combineId + '.date']: serverTimestamp(),
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
      {error && <span>Something went wrong</span>}
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
