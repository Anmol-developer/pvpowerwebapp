import React from 'react';
import '../css/Navigation.css'
import { Link } from 'react-router-dom';

function Navigation() {
 
  const handleToggle=()=>{
    document.getElementsByClassName('nav__list')[0].classList.toggle('active');
  }
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
                <Link className='nav__item pricing' to={'/pricing'}>Pricing</Link>
                <Link className='nav__item support' to={'/support'}>Support</Link>
                <Link className='nav__item signup' to={'/signup'}>Sign up</Link>
        </div>
    </div>
    </>
  )
}

export default Navigation