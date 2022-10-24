import * as React from 'react'
import ChatInfo from './ChatInfo'
import InputMessage from './InputMessage'
import MessageList from './MessageList'

export interface IChatBoxProps {}

export default function ChatBox(props: IChatBoxProps) {
  return (
    <div className='chatBox'>
      <ChatInfo />
      <MessageList />
      <InputMessage />
    </div>
  )
}
