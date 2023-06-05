import React from 'react'
import imagex from '../../Images/pv.jpg'
import '../../css/Pages/Hero.css'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='hero__container'>
        <div className='hero__text'>
            <p className='hero__header'>Power up your day with PV forecasts!</p>
            <p className='hero__desc'>Get real-time predictions for your solar power output with our PV power forecast website. Never miss a beat with accurate and reliable forecasting technology.</p>
            <Link to={'/login'} className='hero__btn'>Dashboard</Link> 
        </div>
        <img src={imagex} alt='a hero' className='hero__img'/>
    </div>
  )
}
 
export default Hero