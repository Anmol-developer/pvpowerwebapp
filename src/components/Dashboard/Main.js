import React from 'react'
import Map from './Map'
import '../../css/Dashboard/Main.css'

function Main() {
  return (
    <div className='main__container'>
      <div className='main__header'>
        <p className='dheader__title'>DASHBOARD</p>
        <p className='dheader__greet'>welcome back User</p>
      </div>
      <div className='main__map'>
        <input className='map__location' placeholder='Search location'/>
        <Map/>
      </div>
        {/* abc */}
    </div>
  )
}

export default Main