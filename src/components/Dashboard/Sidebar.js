import React from 'react'
import '../../css/Dashboard/Sidebar.css'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
import {BsFillFileBarGraphFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {MdWorkHistory,MdOnlinePrediction} from 'react-icons/md'
import {AiFillHome} from 'react-icons/ai'

function Sidebar() {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const {userId} = useParams()
  // console.log(params);
  const navigateToSignup = ()=>{
    //destroy jwt and navigate
    navigate('/signup')
  }

  return (
    <div className='sidebar__container'>
        <div className='user-sideInfo'>
          <FaUserCircle className='username-icon'/>
          <p className={`user-account`}>Account</p>
          <Link to={`/dashboard/account/${userId}`} className={`account-info ${pathname===`/dashboard/account/${userId}` && 'active-sb'}`}>&gt;</Link>
        </div>
        <Link className={`link-to-home ${pathname===`/dashboard/main/${userId}` && 'active-sb'}`} to={`/dashboard/main/${userId}`}>
          <AiFillHome className='home-icon'/>
          Home
        </Link>
        <Link className={`link-to-graph ${pathname===`/dashboard/graph/${userId}` && 'active-sb'}`} to={`/dashboard/graph/${userId}`}>
          <BsFillFileBarGraphFill className='graph-icon'/>
          Visualize
        </Link>
        <div className='link-to-logout' onClick={navigateToSignup}>
          <FiLogOut className='logout-icon'/>
          Log out
        </div>
        <Link to={`/dashboard/history/${userId}`} className={`link-to-history ${pathname===`/dashboard/history/${userId}` && 'active-sb'}`}>
          <MdWorkHistory className='history-icon'/>
          History
        </Link>
        <Link to={`/dashboard/forecast/${userId}`} className={`link-to-forecast ${pathname===`/dashboard/forecast/${userId}` && 'active-sb'}`}>
          <MdOnlinePrediction className='forecast-icon'/>
          Forecast
        </Link>
        
    </div>
  )
}

export default Sidebar