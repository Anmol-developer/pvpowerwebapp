import React from 'react'
import support from '../../Images/support.jpg'
import '../../css/Pages/Support.css'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'

function Support() {
  return (
    <div className='suuport__container'>
      <div className='support__txt'>
        <h1>Support 24/7</h1>
        <p className='support__desc'>
        Welcome to our support page! We're here to help you every step of the way. Our dedicated team is ready to assist with any questions or technical issues you may have. Explore our knowledge base and FAQs for quick solutions, or contact our friendly support agents for personalized assistance. Your satisfaction is our priority.
        </p>
        <button className='support-more__btn'>Explore<BsFillArrowRightCircleFill className='right-arrow-icon'/></button>
      </div>
      <img src={support} alt='support' />
    </div>
  )
}

export default Support