import React from "react";
import ReactDom from "react-dom";
import '../../../css/Dashboard/Modal/VerifyEmailModal.css'

function VerifyEmailModal({ open, children, closeModal }) {
  if (!open) return null;

  return ReactDom.createPortal(<>
    <div className="verifymodal-wrapper" onClick={closeModal}></div>
            <div className='verifymodal__container'>
                {children}
            </div>
  </>, document.getElementById("email-verify"));
}

export default VerifyEmailModal;
