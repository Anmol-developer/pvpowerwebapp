import React, {useState} from 'react'
import Map from './Map'
import '../../css/Dashboard/Main.css'

function Main() {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }
  

  return (
    <div className='main__container'>
      <div className='main__header'>
        <p className='dheader__title'>DASHBOARD</p>
        <p className='dheader__greet'>welcome back User</p>
      </div>
      <div className='main__map'>
        <input type="text" value={searchInput} onChange={handleSearchInputChange} className='map__location' placeholder='Search location'/>
        <Map/>
      </div>
        {/* abc */}
    </div>
  )
}

export default Main