import React from 'react'
import '../../css/Dashboard/Sidebar.css'
import {Link} from 'react-router-dom'

function Sidebar() {
  return (
    <div className='sidebar__container'>
        Sidebar
        <Link to={'dashboard/graph/1'}>Graph</Link>
    </div>
  )
}

export default Sidebar