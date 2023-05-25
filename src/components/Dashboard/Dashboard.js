import React, { useState,useEffect } from 'react'
import '../../css/Dashboard/Dashboard.css'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import DataContext from '../../context/Data'
import axios from 'axios'

function Dashboard() {
  const navigate = useNavigate();
  // const param = useParams()
  const [dataEx, setData] = useState([])
  const [dataType, setDataType] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update windowWidth state on initial load
    setWindowWidth(window.innerWidth);

    // Add event listener to update windowWidth state on window resize
    window.addEventListener('resize', handleResize);

    // isLoggedIn()

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]); // Empty dependency array to run the effect only once on mount

  // Event handler for window resize
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };


  // const isLoggedIn = async()=>{
  //   const user = await axios.get('http://localhost:5000/dashboard');
  //   if(!user){navigate('/signup')}
  //   console.log(user.data);
  // }
  
  const setdata = (data) => {
    setData(data[0])
    setDataType(data[1])
    console.log('dataEx: ',dataEx);
    console.log('data ',data);
  }
  return (
    <>
    {windowWidth > 610 ? (<div className='container'>
    <Sidebar />
    <DataContext.Provider value={{setdata, dataEx, dataType}}>
      <Outlet />
    </DataContext.Provider>
  </div>):(<div className='use-big-screen'><p>Please Use bigger screen</p></div>)}
  </>
  )
}

export default Dashboard