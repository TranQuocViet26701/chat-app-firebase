// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB8CzbMA3e2HAWXEH8peO30X4lhDYjxZJc',
  authDomain: 'chat-app-7022a.firebaseapp.com',
  projectId: 'chat-app-7022a',
  storageBucket: 'chat-app-7022a.appspot.com',
  messagingSenderId: '1045446433530',
  appId: '1:1045446433530:web:64a8bb38dfa1d4c916c743',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
