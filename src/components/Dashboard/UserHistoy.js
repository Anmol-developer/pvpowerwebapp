import React, { useContext, useEffect, useState } from "react";
import "../../css/Dashboard/UserHistory.css";
import { AiFillDelete } from "react-icons/ai";
import userContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from '../../axios'

function UserHistoy() {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const [history, setHistory] = useState([]);

  useEffect(()=>{
    const getHistory=async()=>{
      try {
        const history = await axios.get(`/history/${user._id}`);
        setHistory([...history.data]);
      } catch (error) {
        console.log(error);
      }
    }
    getHistory();
  },[])

  const showView = (date) => {
    navigate(`/dashboard/forecast/${user._id}?date=${date}`);
    toast.info(`Viewing Forecast for Data uploaded on ${new Date(date).toLocaleDateString('en-US')}.`, {
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

  const deleteHistory = async(id)=>{
    try {
      console.log(history);
      const deleteHistory = await axios.delete(`/delete/${user._id}?data=${id}`)
      if(deleteHistory.status===200){
        alert('Deleted')
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main__container">
      <div className="main__header">
        <p className="dheader__title">DASHBOARD &gt; History</p>
        <p className="dheader__greet">welcome {user.username}</p>
      </div>
      <div className="main__history">
        {history.map((data)=>{
          return(<div className="history__item" key={data._id}>
          <p className="item__date"><span className="date">{new Date(data.date).toLocaleDateString('en-US')}</span><span className="time" style={{display:'block'}}>{new Date(data.date).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit'})}</span></p>
          <button className="view-history" onClick={()=>showView(data.date)}>
            View
          </button>
          <button className="delete-history" onClick={()=>deleteHistory(data._id)}>
            <AiFillDelete />
          </button>
        </div>)
        })}
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
