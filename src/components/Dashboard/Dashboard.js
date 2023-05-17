import React, { useState } from 'react'
import '../../css/Dashboard/Dashboard.css'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import DataContext from '../../context/Data'

function Dashboard() {
  const [dataEx, setData] = useState([])
  const [dataType, setDataType] = useState([])
  const setdata = (data) => {
    setData(data[0])
    setDataType(data[1])
    console.log('dataEx: ',dataEx);
    console.log('data ',data);
  }
  return (
    <div className='container'>
      <Sidebar />
      {/* <Main/> */}
      <DataContext.Provider value={{setdata, dataEx, dataType}}>
        <Outlet />
      </DataContext.Provider>
    </div>
  )
}

export default Dashboard