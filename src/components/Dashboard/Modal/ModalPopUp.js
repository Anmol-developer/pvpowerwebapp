import React, { useState } from 'react'
import ShowModal from './ShowModal';

function ModalPopUp() {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => setShowModal(false);

    return (
        <div className='modal__container'>
            <button className="model-btn" onClick={() => setShowModal(true)}>
                Open Modal
            </button>
            <ShowModal open={showModal} closeModal={closeModal}>
                <h2>STAY TUNED</h2>
                <p>
                    Subscribe to our newsletter and never miss our designs ,latest news.etc.
                    Our newsletter is sent once a week, every Monday
                </p>
                
            </ShowModal>
        </div>
    )
}

export  {ModalPopUp};