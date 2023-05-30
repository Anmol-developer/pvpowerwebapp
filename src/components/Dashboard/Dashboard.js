import React, { useState, useEffect } from "react";
import "../../css/Dashboard/Dashboard.css";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import DataContext from "../../context/Data";
import userContext from "../../context/UserContext";
import axios from "axios";
import Loading from 'react-loading'

function Dashboard() {
  const navigate = useNavigate();
  // const param = useParams()
  const [dataEx, setData] = useState([]);
  const [user, setUser] = useState({});
  const [dataType, setDataType] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    isLoggedIn();
  }, [])
  

  useEffect(() => {
    // Update windowWidth state on initial load
    setWindowWidth(window.innerWidth);

    // Add event listener to update windowWidth state on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]); // Empty dependency array to run the effect only once on mount

  // Event handler for window resize
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const isLoggedIn = async () => {
    try {
      const user = await axios.get("/dashboard");
      setUser({ ...user.data });
    } catch (error) {
      alert('you are logged out')
      navigate('/login')
    }
    
  };

  const setdata = (data) => {
    setData(data[0]);
    setDataType(data[1]);
    // console.log("dataEx: ", dataEx);
    // console.log("data ", data);
  };
  if(!user.email) {return (
    <>
      <div className='unauth__wrapper'></div>
      <div className='unauth__container'>
        <h2>Loading please wait</h2>
        <Loading type="spin" color="blue" width={'30%'} height={'30%'} />
      </div>
    </>
  )}
  return (
    <>
      {windowWidth > 610 ? (
        <div className="container">
          <userContext.Provider value={{ user }}>
            <Sidebar />
          </userContext.Provider>
          <DataContext.Provider value={{ setdata, dataEx, dataType }}>
            <userContext.Provider value={{ user }}>
              <Outlet />
            </userContext.Provider>
          </DataContext.Provider>
        </div>
      ) : (
        <div className="use-big-screen">
          <p>Please Use bigger screen</p>
        </div>
      )}
    </>
  );
}

export default Dashboard;
