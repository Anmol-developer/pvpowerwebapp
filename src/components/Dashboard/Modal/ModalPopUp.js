import React, { useEffect, useState } from 'react'
import ShowModal from './ShowModal';
import '../../../css/Dashboard/Modal/Modal.css'
import { AiOutlineWarning } from 'react-icons/ai'
import axios from 'axios';

function ModalPopUp({ lat, lon }) {
    const [showModal, setShowModal] = useState(false);
    const [dataType, setDataType] = useState('pv__data');
    const [selectedFile, setSelectedFile] = useState(null);
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        const location__adrs = async()=>{
            try {
                setIsLoading(true)
                const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=9ab902a1269a44849e0d0200437bac80&q=${lat},${lon}&pretty=1`);
                const location = result.data.results[0].formatted;
                setAddress(location)
            } catch (error) {
                alert(error)
            }finally {
                setIsLoading(false); // Set isLoading state back to false after the request is completed
              }
        }

        location__adrs()
        
    }, [lat, lon])


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleInfoSubmit = () => {
        alert('submited')
    }


    const closeModal = () => {
        setShowModal(false)
        setSelectedFile(null)
    };

    const setLocation = async () => {
        setShowModal(true);
    }

    return (
        <div className='modal__container'>
            <button className="modal-btn" onClick={setLocation}>
                set this location
            </button>
            <ShowModal open={showModal} closeModal={closeModal}>
                <h2 className='modal__heading'>Fill the information</h2>
                <p className='modal__lat'>
                    <b>Latitude: </b>{lat}
                </p>
                <p className='modal__lng'>
                    <b>Longitude: </b>{lon}
                </p>
                <p className='modal__adrs'>
                    <b>Address: </b>{isLoading && (<p>Loading...</p>)}{(!isLoading && address) && (address)}
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

            </ShowModal>
        </div>
    )
}

export { ModalPopUp };