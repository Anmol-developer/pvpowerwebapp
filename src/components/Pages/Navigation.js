import React, { useEffect, useState } from 'react';
import '../../css/Pages/Navigation.css'
import { Link } from 'react-router-dom';
import axios from '../../axios'
import { ToastContainer, toast } from "react-toastify";

function Navigation() {
  const [user, setUser] = useState(false)

  useEffect(()=>{
    getUser();
  })

  const getUser= async()=>{
    const user = await axios.get('/')
    if(user.status===200){
      setUser(true)
    }else{
      setUser(false)
    }
  }
  const handleToggle=()=>{
    document.getElementsByClassName('nav__list')[0].classList.toggle('active');
  }

  const logout = async() => {
    console.log(user);
    const logState = await axios.get('/logout');
    if(logState.status===200){
      window.location.reload()
    }else{
      toast.info("Logout failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    }
  };
  return (
    <>
    <div className='nav__container'>
        <div className='nav__logo'>
            <p>Logo</p>
            <div className='nav__toggle' onClick={handleToggle}>
          <span className='toggle'></span>
          <span className='toggle'></span>
          <span className='toggle'></span>
        </div>
        </div>
        
        <div className='nav__list' >
                <Link className='nav__item home'to={'/'}>Home</Link>
                {!user && (<Link className='nav__item pricing' to={'/pricing'}>Pricing</Link>)}
                {/* <Link className='nav__item support' to={'/services'}>Services</Link> */}
                <Link className='nav__item support' to={'/contact'}>Contact</Link>
                {user && (<Link className='nav__item support' to={'/tut'}>Tutorial</Link>)}
                {/* <Link className='nav__item support' to={'/tut'}>Tutorial</Link> */}
                {!user ? (<Link className='nav__item signup' to={'/signup'}>Sign up</Link>) : (<button style={{border:'none'}} className='nav__item signup' onClick={logout}>Log out</button>)}
        </div>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
    </>
  )
}

export default Navigation