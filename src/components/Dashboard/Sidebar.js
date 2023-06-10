import React, { useContext } from "react";
import "../../css/Dashboard/Sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import {
  MdWorkHistory,
  MdOnlinePrediction,
  MdCompareArrows,
} from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import userContext from "../../context/UserContext";

function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useContext(userContext);
  const logout = async () => {
    fetch('/logout', { method: 'GET', credentials: 'include' })
      .then(response => {
        if (response.ok) {
          // Redirect to login page or perform other actions upon successful logout
          navigate('/login')
        } else {
          console.error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div className="sidebar__container">
      <div className="user-sideInfo">
        <FaUserCircle className="username-icon" />
        <p className={`user-account`}>Account</p>
        <Link
          to={`/dashboard/account`}
          className={`account-info ${
            pathname === `/dashboard/account` && "active-sb"
          }`}
        >
          &gt;
        </Link>
      </div>
      <Link
        className={`link-to-home ${
          pathname === `/dashboard/main` && "active-sb"
        }`}
        to={`/dashboard/main`}
      >
        <AiFillHome className="home-icon" />
        Home
      </Link>
      <Link
        className={`link-to-graph ${
          pathname === `/dashboard/graph` && "active-sb"
        }`}
        to={`/dashboard/graph`}
      >
        <BsFillFileBarGraphFill className="graph-icon" />
        Visualize
      </Link>
      <div className="link-to-logout" onClick={logout}>
        <FiLogOut className="logout-icon" />
        Log out
      </div>

      <Link
        to={`/dashboard/forecast`}
        className={`link-to-forecast ${
          pathname === `/dashboard/forecast` && "active-sb"
        }`}
      >
        <MdOnlinePrediction className="forecast-icon" />
        Forecast
      </Link>
      <Link
        to={`/dashboard/validateData`}
        className={`link-to-compare ${
          pathname === `/dashboard/validateData` && "active-sb"
        }`}
      >
        <MdCompareArrows className="compare-icon" />
        Validate
      </Link>
      <Link
        to={`/dashboard/history`}
        className={`link-to-history ${
          pathname === `/dashboard/history` && "active-sb"
        }`}
      >
        <MdWorkHistory className="history-icon" />
        History
      </Link>
    </div>
  );
}

export default Sidebar;
