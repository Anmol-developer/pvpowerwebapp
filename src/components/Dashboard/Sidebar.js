import React from 'react'
import '../../css/Dashboard/Sidebar.css'
import {Link, useNavigate} from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
import {BsFillFileBarGraphFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {MdWorkHistory} from 'react-icons/md'
import {AiFillHome} from 'react-icons/ai'

function Sidebar() {
  const navigate = useNavigate()
  const navigateToSignup = ()=>{
    //destroy jwt and navigate
    navigate('/signup')
  }

  return (
    <div className='sidebar__container'>
        <div className='user-sideInfo'>
          <FaUserCircle className='username-icon'/>
          <p className='user-account'>Account</p>
          <Link to={'/dashboard/account/1'} className='account-info'>&gt;</Link>
        </div>
        <Link className='link-to-home' to={'/dashboard/main/1'}>
          <AiFillHome className='home-icon'/>
          Home
        </Link>
        <Link className='link-to-graph' to={'/dashboard/graph/1'}>
          <BsFillFileBarGraphFill className='graph-icon'/>
          Graph
        </Link>
        <div className='link-to-logout' onClick={navigateToSignup}>
          <FiLogOut className='logout-icon'/>
          Log out
        </div>
        <Link to={'/dashboard/history/1'} className='link-to-history'>
          <MdWorkHistory className='history-icon'/>
          History
        </Link>
    </div>
  )
}

export default Sidebar