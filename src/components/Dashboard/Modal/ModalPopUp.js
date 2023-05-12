import React, { useEffect, useState } from 'react'
import ShowModal from './ShowModal';
import '../../../css/Dashboard/Modal/Modal.css'
import { AiOutlineWarning } from 'react-icons/ai'
import axios from 'axios';
import SubmitModal from './SubmitModal';
import { read } from 'xlsx';
import {utils} from 'xlsx';

function ModalPopUp({ lat, lon }) {
    const [showModal, setShowModal] = useState(false);
    const [showSubmitModal, setSubModal] = useState(false);
    const [disabled, setDisabled] = useState(true) //for submit btn disabled feature
    const [dataType, setDataType] = useState('pv__data');
    const [selectedFile, setSelectedFile] = useState(null);
    const [address, setAddress] = useState(''); //for address from lat and lon
    const [isLoading, setIsLoading] = useState(false);
    const [isFormat, setIsFormat] = useState(true) // for checking if the format of uploaded file is correct or not

    //getting input address's lat and lon using forward geocoding and loading functionality
    useEffect(() => {
        const location__adrs = async () => {
            try {
                setIsLoading(true)
                const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=9ab902a1269a44849e0d0200437bac80&q=${lat},${lon}&pretty=1`);
                const location = result.data.results[0].formatted;
                setAddress(location)
            } catch (error) {
                alert(error)
            } finally {
                setIsLoading(false); // Set isLoading state back to false after the request is completed
            }
        }

        location__adrs()

    }, [lat, lon])

    
    const handleFileChange = async (event) => {
        //initializing state so that it is default every time file changes
        setIsFormat(true);
        
        //declaring an array to check format with
        const format1 = ['Date', 'PV Power (kW)', 'Solar Irradiation', 'Ambient Temperature', 'Wind Speed', 'Relative Humidity', 'Cloud Cover', 'Rainfall']
        const format2 = ['Date', 'PV Power (kW)']
        const data_format = (dataType === 'pv__data' ? format2 : format1);
        
        //handling file
        const file = event.target.files[0];
        setSelectedFile(file);
        setDisabled(false)

        //converting file to array buffer
        const data = await file.arrayBuffer();
        const workbook = read(data);

        // Access the user-input sheet
        const userInputSheetName = workbook.SheetNames[0];
        const userInputSheet = workbook.Sheets[userInputSheetName];

        // Get all values of a specific row
        const rowNum = 1; // Assuming row number 2 (index starts at 1)
        const rowValues = [];

        // Iterate over each column in the row
        for (let colNum = 1; ; colNum++) {
            const cellAddress = utils.encode_cell({ r: rowNum - 1, c: colNum - 1 }); //look in docs of 'npm xlsx' 
            const cell = userInputSheet[cellAddress];

            if (!cell || !cell.v) { //.v signifies .value
                break; // Exit loop if cell is empty or does not exist
            }

            rowValues.push(cell.v);
        }

        console.log('Row Values:', rowValues);

        //checking for file format
        for (let i = 0; i < rowValues.length; i++) {
            const element = rowValues[i];
            // console.log(element)
            if (element !== data_format[i] || rowValues.length !== data_format.length) {
                setIsFormat(false);
                setDisabled(true)
                break;
            }
        }


    };

    const handleInfoSubmit = () => {
        setShowModal(false)
        setSubModal(true)

    }


    const closeModal = () => {
        setShowModal(false)
        //setting everything back to default
        setIsFormat(true)
        setSelectedFile(null)
        setDisabled(true)
        setDataType('pv__data')
    };
    const closeSubmitModal = () => {
        setSubModal(false);
    }

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
                    <b>Address: </b>{isLoading && (<span>Loading...</span>)}{(!isLoading && address) && (address)}
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
                    {isFormat === false  && (<p className='pls-upload'>Format not correct</p>)}
                </div>

                {disabled ? (<button className='sb-disabled'>Submit</button>) : (<button className='sb-active' onClick={handleInfoSubmit}>Submit</button>)}

            </ShowModal>

            <SubmitModal open={showSubmitModal} closeModal={closeSubmitModal}>
                <p>Submitted</p>
            </SubmitModal>
        </div>
    )
}

export { ModalPopUp };