import React from 'react'
import Main from './Main'
import '../../css/Dashboard/Dashboard.css'
import Sidebar from './Sidebar'

function Dashboard() {
  return (
    <div className='container'>
      <Sidebar/>
      <Main/>
    </div>
  )
}

export default Dashboard