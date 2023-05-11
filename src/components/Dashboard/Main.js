import React, { useState } from 'react'
import Map from './Map'
import '../../css/Dashboard/Main.css'
// import ShowModal from '../Dashboard/Modal/ShowModal';
// import { AiOutlineWarning } from 'react-icons/ai'
import axios from 'axios';



function Main() {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState([])
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [dataType, setDataType] = useState('pv__data');


  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }

  // const closeModal = () => {
  //   setShowModal(false)
  //   setSelectedFile(null)
  // };

  const forwardGeocode = async (e) => {
    e.preventDefault()
    let lat ,lon;
    try {
      setIsLoading(true)
      const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=9ab902a1269a44849e0d0200437bac80&q=${encodeURIComponent(searchInput)}&pretty=1`);
      lat = result.data.results[0].geometry.lat;
      lon = result.data.results[0].geometry.lng;
      setLocation([lat, lon])
    } catch (error) {
      if(searchInput === "" || !lat) alert('please fill correct address')
      else alert(error)
    } finally {
      setIsLoading(false); // Set isLoading state back to false after the request is completed
      // setShowModal(true)
    }
  }

  // const handleInfoSubmit = () => {
  //   alert('submited')
  // }


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
        <Map />
      </div>
      {/* <ShowModal open={showModal} closeModal={closeModal}>
        <h2 className='modal__heading'>Fill the information</h2>
        <p className='modal__lat'>
          <b>Latitude: </b>{isLoading && (<p>Loading...</p>)}{(!isLoading && location[0]) && (location[0])}
        </p>
        <p className='modal__lng'>
          <b>Longitude: </b>{isLoading && (<p>Loading...</p>)}{(!isLoading && location[1]) && (location[1])}
        </p>
        <p className='modal__adrs'>
          <b>Address: </b>{searchInput}
        </p>

        <form className='data-type-form'>
          <label htmlFor='data-type'><b>Select Data type: </b></label>
          <select id='data-type' name='data-type' onChange={(e) => setDataType(e.target.value)}>
            <option value='pv__data'>pv data</option>
            <option value='both'>pv data + weather data</option>
          </select>
        </form>

        <div className='sample__table'>
          <p className='pls-upload'>Format of your data sheet should be same as in sample table</p>
          {dataType === 'pv__data' ? (<a href={'https://docs.google.com/spreadsheets/d/1gUmeH_IQ8DKPmq1_UxcVWg4ws-LUgo4C9yO7qSUho_c/edit?usp=sharing'} rel="noreferrer" target="_blank">Sample table for pv data</a>) : (<a href={'https://docs.google.com/spreadsheets/d/12V6K4fs46bQihzyUmSWe54kf2x-bvJcLHLonCgqthsk/edit?usp=sharing'} rel="noreferrer" target="_blank">Sample table for pv data + weather</a>)}
        </div>

        <div className='file__upload'>
          <p className='upload-text'><b>Upload your .xlsx or .xls file: </b></p>
          <p className='upload-warn'>
            <AiOutlineWarning className='warn-icon' /> Format of your file must be same as the sample table shown above
          </p>
          <input type='file' id="fileInput" onChange={handleFileChange} accept=".xlsx, .xls" />
          {selectedFile === null && (<p className='pls-upload'>pls upload file</p>)}
        </div>

        {selectedFile === null ? (<button className='sb-disabled'>Submit</button>) : (<button className='sb-active' onClick={handleInfoSubmit}>Submit</button>)}

      </ShowModal> */}
    </div>
  )
}

export default Main