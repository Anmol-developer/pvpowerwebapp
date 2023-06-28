import React from 'react'
import '../../css/Pages/WhyUs.css'
import {TbTargetArrow} from 'react-icons/tb'
import {GiTeamIdea} from 'react-icons/gi'
import {FaHandsHelping} from 'react-icons/fa'

function WhyUs() {
  return (
    <div className="about__why">
        <p>Why Us?</p>
        <div className="why-cards">
          <div className="why-card">
            <TbTargetArrow className="why-icons"/>
            <p className="card-title">Most Precised predictions</p>
            <p className="card-desc">Experience the power of accurate predictions like never before with our cutting-edge model. Our forecasts surpass the competition, delivering unparalleled accuracy that will revolutionize your decision-making. </p>
          </div>
          <div className="why-card">
            <GiTeamIdea className="why-icons"/>
            <p className="card-title">Innovation at the core</p>
            <p className="card-desc">Unleash innovation with us. Stay ahead and outperform with our unmatched solutions. Experience the difference.</p>
          </div>
          <div className="why-card">
            <FaHandsHelping className="why-icons"/>
            <p className="card-title">Trustworthiness</p>
            <p className="card-desc">Our long-standing reputation as a reliable and trusted partner sets us apart from competitors. With a proven track record and a client-centric approach, we prioritize your success and deliver on our promises, earning your trust every step of the way.</p>
          </div>
        </div>
      </div>
  )
}

export default WhyUs