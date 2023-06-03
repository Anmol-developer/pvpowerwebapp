import React, { useContext } from "react";
import "../../css/Dashboard/UserHistory.css";
import { AiFillDelete } from "react-icons/ai";
import userContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserHistoy() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const showView = () => {
    navigate(`/dashboard/graph/${user._id}`);
    toast.info('Viewing data uploaded on MM/DD/YYYY.', {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "light",
      });
  };
  return (
    <div className="main__container">
      <div className="main__header">
        <p className="dheader__title">DASHBOARD &gt; History</p>
      </div>
      <div className="main__history">
        <div className="history__item">
          <p className="item__date">Dec 05 2022</p>
          <button className="view-history" onClick={showView}>
            View
          </button>
          <button className="delete-history">
            <AiFillDelete />
          </button>
        </div>
        <div className="history__item">
          <p className="item__date">Dec 05 2022</p>
          <button className="view-history" onClick={showView}>
            View
          </button>
          <button className="delete-history">
            <AiFillDelete />
          </button>
        </div>
        <div className="history__item">
          <p className="item__date">Dec 05 2022</p>
          <button className="view-history" onClick={showView}>
            View
          </button>
          <button className="delete-history">
            <AiFillDelete />
          </button>
        </div>
        <div className="history__item">
          <p className="item__date">Dec 05 2022</p>
          <button className="view-history" onClick={showView}>
            View
          </button>
          <button className="delete-history">
            <AiFillDelete />
          </button>
        </div>
      </div>
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
  );
}

export default UserHistoy;
