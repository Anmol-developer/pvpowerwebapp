import React from 'react'
import ReactDom from "react-dom";
import '../../../css/Dashboard/Modal/ShowGraphModal.css'
import { AiOutlineClose } from 'react-icons/ai';

function ShowGraphModal({ children, closeGraphModal, open }) {
    if (!open) return null;
    return ReactDom.createPortal(
        <>
            <div className='graph-modal-wrapper' onClick={closeGraphModal}></div>
            <div className='graph-modal-container'>
                <AiOutlineClose className='close-btn' onClick={closeGraphModal} />
                {children}
            </div>
        </>,
        document.getElementById('showgraphmodal')
    )
}

export default ShowGraphModal