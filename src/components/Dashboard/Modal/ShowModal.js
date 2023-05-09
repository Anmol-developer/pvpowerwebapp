import React, { useEffect } from 'react'
import '../../../css/Dashboard/Modal/ShowModal.css'
import ReactDom from "react-dom";
// import { useEffect } from "react";

function ShowModal({  open, closeModal, children  }) {

    useEffect(() => {
        document.body.style.overflowY = "hidden"; //will hide scroll when Modal shows (component mounts)
        return () => {
            document.body.style.overflowY = "scroll"; //will show scroll when Modal hides (component unmounts)
        };
    }, []);

    if(!open) return null;

    return ReactDom.createPortal(
        <>
            <div className="showmodal-wrapper" onClick={closeModal}></div>
            <div className='showmodal__container'>
                {children}
                <button className="model-btn" onClick={closeModal}>
                    Accept It
                </button>
            </div>
        </>,
        document.getElementById("modal")
    )

}

export default ShowModal