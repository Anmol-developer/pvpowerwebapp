import React from "react";
// import {AiOutlineClose} from 'react-icons/ai';
import ReactDom from "react-dom";
import '../../../css/Dashboard/Modal/SubmitModal.css'

function SubmitModal({open, closeModal, children}) {
    
    if(!open) return null;

    return ReactDom.createPortal(
        <>
        <div className="submitmodal-wrapper"></div>
            <div className='submitmodal__container'>
                {/* <AiOutlineClose className='close-btn' onClick={closeModal}/> */}
                {children}
            </div>
        </>,
        document.getElementById("submit")
    )
}
export default SubmitModal;