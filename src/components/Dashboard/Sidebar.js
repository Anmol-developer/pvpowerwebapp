import React, { useContext } from 'react'
import '../../css/Dashboard/Sidebar.css'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import {FaUserCircle} from 'react-icons/fa'
import {BsFillFileBarGraphFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {MdWorkHistory,MdOnlinePrediction, MdCompareArrows} from 'react-icons/md'
import {AiFillHome} from 'react-icons/ai'
import userContext from '../../context/UserContext'

function Sidebar() {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const {user} = useContext(userContext)
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
          <Link to={`/dashboard/account/${user._id}`} className={`account-info ${pathname===`/dashboard/account/${user._id}` && 'active-sb'}`}>&gt;</Link>
        </div>
        <Link className={`link-to-home ${pathname===`/dashboard/main/${user._id}` && 'active-sb'}`} to={`/dashboard/main/${user._id}`}>
          <AiFillHome className='home-icon'/>
          Home
        </Link>
        <Link className={`link-to-graph ${pathname===`/dashboard/graph/${user._id}` && 'active-sb'}`} to={`/dashboard/graph/${user._id}`}>
          <BsFillFileBarGraphFill className='graph-icon'/>
          Visualize
        </Link>
        <div className='link-to-logout' onClick={navigateToSignup}>
          <FiLogOut className='logout-icon'/>
          Log out
        </div>
        
        <Link to={`/dashboard/forecast/${user._id}`} className={`link-to-forecast ${pathname===`/dashboard/forecast/${user._id}` && 'active-sb'}`}>
          <MdOnlinePrediction className='forecast-icon'/>
          Forecast
        </Link>
        <Link to={`/dashboard/validateData/${user._id}`} className={`link-to-compare ${pathname===`/dashboard/validateData/${user._id}` && 'active-sb'}`}>
          <MdCompareArrows className='compare-icon'/>
          Validate
        </Link>
        <Link to={`/dashboard/history/${user._id}`} className={`link-to-history ${pathname===`/dashboard/history/${user._id}` && 'active-sb'}`}>
          <MdWorkHistory className='history-icon'/>
          History
        </Link>
        
    </div>
  )
}

export default Sidebar