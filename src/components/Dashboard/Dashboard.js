import React, { useState, useEffect } from "react";
import "../../css/Dashboard/Dashboard.css";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import DataContext from "../../context/Data";
import userContext from "../../context/UserContext";
import axios from "axios";
import Loading from "../Modal/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const navigate = useNavigate();
  const [dataEx, setData] = useState([]);
  const [user, setUser] = useState({});
  const [dataType, setDataType] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    isLoggedIn();
  }, []);

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
      toast.warn("You are logged out!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      navigate("/login");
    }
  };

  const setdata = (data) => {
    setData(data[0]);
    setDataType(data[1]);
  };
  if (!user.email) {
    return (
      <>
        <Loading/>
      </>
    );
  }
  return (
    <>
      {windowWidth > 900 ? (
        <div className="container">
          <userContext.Provider value={{ user }}>
            <Sidebar />
          </userContext.Provider>
          <DataContext.Provider value={{ setdata, dataEx, dataType }}>
            <userContext.Provider value={{ user }}>
              <Outlet />
            </userContext.Provider>
          </DataContext.Provider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
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
