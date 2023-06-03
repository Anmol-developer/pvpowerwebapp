import React from 'react'
import ReactDom from 'react-dom';
import '../../css/Modal/ResetModal.css'

function ResetModal({open, children, closeModal}) {
    if(!open) return null;
  return ReactDom.createPortal(
    <>
    <div className='resetP-wrapper' onClick={closeModal}></div>
    <div className='resetP-container'>
        {children}
    </div>
    </>,
    document.getElementById('reset-modal')
  )
}

export default ResetModal