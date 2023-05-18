import React from 'react'
import '../../css/Dashboard/UserHistory.css'
import {AiFillDelete} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'

function UserHistoy() {
  const navigate = useNavigate();
  const showView = ()=>{
    navigate('/dashboard/graph/1')
  }
  return (
    <div className='main__container'>
      <div className='main__header'>
        <p className='dheader__title'>DASHBOARD &gt; History</p>
      </div>
      <div className='main__history'>
        <div className='history__item'>
          <p className='item__date'>Dec 05 2022</p>
          <button className='view-history' onClick={showView}>View</button>
          <button className='delete-history'><AiFillDelete/></button>
        </div>
        <div className='history__item'>
          <p className='item__date'>Dec 05 2022</p>
          <button className='view-history' onClick={showView}>View</button>
          <button className='delete-history'><AiFillDelete/></button>
        </div>
        <div className='history__item'>
          <p className='item__date'>Dec 05 2022</p>
          <button className='view-history' onClick={showView}>View</button>
          <button className='delete-history'><AiFillDelete/></button>
        </div>
        <div className='history__item'>
          <p className='item__date'>Dec 05 2022</p>
          <button className='view-history' onClick={showView}>View</button>
          <button className='delete-history'><AiFillDelete/></button>
        </div>
      </div>
    </div>
  )
}

export default UserHistoy