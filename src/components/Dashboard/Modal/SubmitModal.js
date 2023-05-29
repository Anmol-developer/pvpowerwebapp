import React from "react";
import ReactDom from "react-dom";
import '../../../css/Dashboard/Modal/SubmitModal.css'

function SubmitModal({open, children}) {
    
    if(!open) return null;

    return ReactDom.createPortal(
        <>
        <div className="submitmodal-wrapper"></div>
            <div className='submitmodal__container'>
                {children}
            </div>
        </>,
        document.getElementById("submit")
    )
}
export default SubmitModal;