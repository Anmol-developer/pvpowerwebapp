import React from 'react'
import logo1 from '../../Images/Logos/logo1.svg'
import logo2 from '../../Images/Logos/logo2.svg'
import logo3 from '../../Images/Logos/logo3.svg'
import logo4 from '../../Images/Logos/logo4.svg'
import '../../css/Pages/TrustedBy.css'

function TrustedBy() {
  return (
    <div className='trusted-by'>
        <p>Trusted by the best</p>
        <div className='trusted-logo'>
            <img src={logo1} className='logo1' alt='this is logo'/>
            <img src={logo2} className='logo2' alt='this is logo'/>
            <img src={logo3} className='logo3' alt='this is logo'/>
            <img src={logo4} className='logo4' alt='this is logo'/>
        </div>
    </div>
  )
}

export default TrustedBy