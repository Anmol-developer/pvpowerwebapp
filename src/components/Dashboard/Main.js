import React, { useState } from 'react'
import Map from './Map'
import '../../css/Dashboard/Main.css'
import axios from 'axios';
import MyContext from '../../context/Context';

function Main() {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState([])
  
  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  const forwardGeocode = async (e) => {
    e.preventDefault()
    let lat, lon;
    try {
      setIsLoading(true)
      const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=9ab902a1269a44849e0d0200437bac80&q=${encodeURIComponent(searchInput)}&pretty=1`);
      lat = result.data.results[0].geometry.lat;
      lon = result.data.results[0].geometry.lng;
      setLocation([lat, lon])
    } catch (error) {
      if (searchInput === "" || !lat) alert('please fill correct address')
      else alert(error)
    } finally {
      setIsLoading(false); // Set isLoading state back to false after the request is completed
    }
  }

  return (
    <div className='main__container'>
      <div className='main__header'>
        <p className='dheader__title'>DASHBOARD</p>
        {/* <ModalPopUp/> */}
        <p className='dheader__greet'>welcome back User</p>
      </div>
      <div className='main__map'>
        <form onSubmit={forwardGeocode}>
          <input type="text" value={searchInput} onChange={handleSearchInputChange} className='map__location' placeholder='Search location' />
          <button type='submit' style={{ display: 'none' }}></button>
        </form>
        <MyContext.Provider value={location}>
          <Map />
        </MyContext.Provider>
      </div>
    </div>
  )
}

export default Main