import React from 'react'
import '../../css/Dashboard/Sidebar.css'
import {Link} from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'

function Sidebar() {
  return (
    <div className='sidebar__container'>
        <div className='user-sideInfo'>
          <FaUserCircle className='username-icon'/>
          <p className='user-account'>Account</p>
          <p className='account-info'>&gt;</p>
        </div>
        <Link className='link-to-graph' to={'/dashboard/graph/1'}>Graph</Link>
    </div>
  )
}

export default Sidebar