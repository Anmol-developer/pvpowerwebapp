import React, { useState,useEffect } from 'react'
import '../../css/Dashboard/Dashboard.css'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import DataContext from '../../context/Data'
import axios from 'axios'

function Dashboard() {
  const navigate = useNavigate();
  const [dataEx, setData] = useState([])
  const [dataType, setDataType] = useState([])

  const isLoggedIn = async()=>{
    const user = await axios.get('http://localhost:5000/dashboard');
    if(!user){navigate('/signup')}
    console.log(user.data);
  }

  useEffect(() => {
    isLoggedIn();
  }, [])
  
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