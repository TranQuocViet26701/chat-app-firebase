import * as React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import UserList from './UserList'

export interface ISidebarProps {}

export default function Sidebar(props: ISidebarProps) {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search />
      <UserList />
    </div>
  )
}
