import React from 'react'
import Main from './Main'
import '../../css/Dashboard/Dashboard.css'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='container'>
      <Sidebar/>
      {/* <Main/> */}
      <Outlet/>
    </div>
  )
}

export default Dashboard