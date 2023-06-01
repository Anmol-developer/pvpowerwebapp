import React from 'react'
import ReactDom from 'react-dom';

function VerifyPhone({children, open, closeModalPhone}) {
    if(!open) return null;
  return ReactDom.createPortal(
    <>
        <div className='verifymodal-wrapper' onClick={closeModalPhone}></div>
        <div className='verifymodal__container'>{children}</div>
    </>,
    document.getElementById('verify-phone')
  )
}

export default VerifyPhone