import React, { useState } from 'react'
import ShowModal from './ShowModal';
import '../../../css/Dashboard/Modal/Modal.css'
import { AiOutlineWarning } from 'react-icons/ai'

function ModalPopUp({ lat, lon }) {
    const [showModal, setShowModal] = useState(false);
    const [dataType, setDataType] = useState('pv__data');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        // console.log(event.target.files)
      };

    const handleInfoSubmit = ()=>{
        alert('submited')
    }
    

    const closeModal = () => {
        setShowModal(false)
        setSelectedFile(null)
    };

    return (
        <div className='modal__container'>
            <button className="modal-btn" onClick={() => setShowModal(true)}>
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
                    <b>Address: </b>abc street, abc nagar, abc garh, abc state, india
                </p>

                <form className='data-type-form'>
                    <label htmlFor='data-type'><b>Select Data type: </b></label>
                    <select id='data-type' name='data-type' onChange={(e) => setDataType(e.target.value)}>
                        <option value='pv__data'>pv data</option>
                        <option value='both'>pv data + weather data</option>
                    </select>
                    {/* <input type='submit' value='Submit' /> */}
                </form>

                <div className='sample__table'>
                    {dataType === 'pv__data' ? (<p>Table1</p>) : (<p>Table2</p>)}
                </div>

                <div className='file__upload'>
                    <p className='upload-text'><b>Upload your .xlsx or .xls file: </b></p>
                    <p className='upload-warn'>
                        <AiOutlineWarning className='warn-icon' /> Format of your file must be same as the sample table shown above
                    </p>
                    <input type='file' id="fileInput" onChange={handleFileChange} accept=".xlsx, .xls" />
                    {selectedFile === null && (<p className='pls-upload'>pls upload file</p>)}
                </div>
                
                {selectedFile===null ? (<button className='sb-disabled'>Submit</button>) : (<button className='sb-active' onClick={handleInfoSubmit}>Submit</button>)}
                
            </ShowModal>
        </div>
    )
}

export { ModalPopUp };