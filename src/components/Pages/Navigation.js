import React, { useContext } from 'react';
import '../../css/Pages/Navigation.css'
import { Link, useNavigate } from 'react-router-dom';
import userLogin from '../../context/UserLogin'

function Navigation() {
  const user = useContext(userLogin);
  const navigate = useNavigate()
 
  const handleToggle=()=>{
    document.getElementsByClassName('nav__list')[0].classList.toggle('active');
  }

  const logout = async () => {
    fetch('/logout', { method: 'GET', credentials: 'include' })
      .then(response => {
        if (response.ok) {
          // Redirect to login page or perform other actions upon successful logout
          navigate('/')
        } else {
          console.error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
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
                {/* {user && (<Link className='nav__item support' to={'/tut'}>Tutorial</Link>)} */}
                <Link className='nav__item support' to={'/tut'}>Tutorial</Link>
                {!user ? (<Link className='nav__item signup' to={'/signup'}>Sign up</Link>) : (<button style={{border:'none'}} className='nav__item signup' onClick={logout}>Log out</button>)}
        </div>
    </div>
    </>
  )
}

export default Navigation