import * as React from 'react'
import { ChatBox, Sidebar } from '../components'

export default function Home() {
  return (
    <div className='home'>
      <div className='container'>
        <Sidebar />
        <ChatBox />
      </div>
    </div>
  )
}
