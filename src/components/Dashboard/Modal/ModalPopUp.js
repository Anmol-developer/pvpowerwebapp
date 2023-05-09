import React, { useState } from 'react'
import ShowModal from './ShowModal';
import '../../../css/Dashboard/Modal/Modal.css'

function ModalPopUp({lat,lon}) {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    return (
        <div className='modal__container'>
            <button className="modal-btn" onClick={() => setShowModal(true)}>
                set this location
            </button>
            <ShowModal open={showModal} closeModal={closeModal}>
                <h2>STAY TUNED</h2>
                <p>
                    {lat}
                </p>
                <p>{lon}</p>
                
            </ShowModal>
        </div>
    )
}

export  {ModalPopUp};