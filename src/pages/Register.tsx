import * as React from 'react'
import AddAvatar from '../assets/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db, storage } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [error, setError] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleSubmit = async (e: any) => {
    setLoading(true)
    e.preventDefault()
    const username = e.target['username'].value
    const email = e.target['email'].value
    const password = e.target['password'].value
    const file = e.target['file'].files[0]

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      //Create a unique image name
      const date = new Date().getTime()
      const storageRef = ref(storage, `images/${username}${date}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        (error) => {
          console.log('error: ', error)
          setError(true)
          setLoading(false)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            })

            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: username,
              photoURL: downloadURL,
              email: user.email,
            })

            await setDoc(doc(db, 'userChats', user.uid), {})
            navigate('/')
          } catch (error) {
            console.log('error: ', error)
            setError(true)
            setLoading(false)
          }
          setLoading(false)
        }
      )
    } catch (error) {
      const errorCode = (error as any).code
      const errorMessage = (error as any).message

      console.log('error: ', {
        errorCode,
        errorMessage,
      })
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <h1 className='logo'>Chat App</h1>
        <h2 className='title'>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='username'
            required
          />
          <input
            type='text'
            name='email'
            id='email'
            placeholder='email'
            required
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='password'
            required
          />
          <input
            style={{ display: 'none' }}
            type='file'
            name='file'
            id='file'
          />
          <label htmlFor='file'>
            <img src={AddAvatar} alt='add-avatar' />
            Add an avatar
          </label>
          <button>Sign up</button>
          {loading && 'Uploading and compressing the image please wait...'}
          {error && <span>Something went wrong</span>}
        </form>
        <p className='suggestion'>
          You do have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  )
}
