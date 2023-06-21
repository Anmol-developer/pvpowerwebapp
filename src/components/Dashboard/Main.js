import React, { useContext, useState, useReducer, useEffect } from "react";
import Map from "../Map/Map";
import "../../css/Dashboard/Main.css";
import axios from "../../axios";
import MyContext from "../../context/Context";
import userContext from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reducer, InitialState } from "../../reducer/DataReducer";
import SubmitModal from "../Modal/SubmitModal";
import AfterCalcModal from "../Modal/AfterCalcModal";
import ReactLoading from "react-loading";
import donegif from "../../Images/41793-correct.gif";
import { useNavigate } from "react-router-dom";

function Main() {
  const [searchInput, setSearchInput] = useState("");
  const { user } = useContext(userContext);
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [location, setLocation] = useState([]);
  const navigate = useNavigate();

  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
  }
  useEffect(() => {
    handleCalc();
  }, []);

  const handleCalc = async () => {
    const isCalcDone = await axios.get("/calc-state");
    if (isCalcDone.data === true) {
      dispatch({ type: "SET_AFTERCALCMODAL", payload: true });
      dispatch({ type: "SET_SUBMODAL", payload: false });
    } else if (isCalcDone.data === false) {
      dispatch({ type: "SET_AFTERCALCMODAL", payload: false });
      dispatch({ type: "SET_SUBMODAL", payload: true });
    }else{
      dispatch({ type: "SET_AFTERCALCMODAL", payload: false });
      dispatch({ type: "SET_SUBMODAL", payload: false });
    }
  };

  const forwardGeocode = async (e) => {
    e.preventDefault();
    let lat, lon;
    try {
      const result = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=9ab902a1269a44849e0d0200437bac80&q=${encodeURIComponent(
          searchInput
        )}&pretty=1`
      );
      lat = result.data.results[0].geometry.lat;
      lon = result.data.results[0].geometry.lng;
      setLocation([lat, lon]);
    } catch (error) {
      if (searchInput === "" || !lat) {
        toast.warn("Please fill correct address", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        });
      } else {
        toast.error("An error occured!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
        });
      }
    }
  };

  const redirectToGraph = () => {
    navigate(`/dashboard/graph`);
  };

  const closeSubmitModal = async() => {
    await axios.get('/close-calc');
    dispatch({ type: "SET_SUBMODAL", payload: false });
    dispatch({ type: "SET_SHOWMODAL", payload: false });

    //setting everything back to default
    dispatch({ type: "SET_DEFAULT" });
  };

  const closeAfterCalcModal = async() => {
    await axios.get('/close-calc');
    dispatch({ type: "SET_AFTERCALCMODAL", payload: false });
    dispatch({ type: "SET_SHOWMODAL", payload: false });

    //setting everything back to default
    dispatch({ type: "SET_DEFAULT" });
  };

  const redirectToForecastResult = () => {
    navigate(`/dashboard/forecast`);
  };

  return (
    <>
      <div className="main__container">
        <div className="main__header">
          <p className="dheader__title">DASHBOARD &gt; Home</p>
          {/* <ModalPopUp/> */}
          <p className="dheader__greet">welcome {user.username}</p>
        </div>
        <div className="main__map">
          <form onSubmit={forwardGeocode}>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              className="map__location"
              placeholder="Search location"
            />
            <button type="submit" style={{ display: "none" }}></button>
          </form>
          <MyContext.Provider value={location}>
            <Map />
          </MyContext.Provider>
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
      </div>
      <SubmitModal open={state.showSubmitModal} closeModal={closeSubmitModal}>
        <div className="sbmt-modal-childs">
          <p
            style={{ marginBottom: "5px", fontSize: "22px", fontWeight: "550" }}
            className="calculating"
          >
            Calculating
          </p>
          <ReactLoading
            type={"bars"}
            color={"blue"}
            height={"100px"}
            width={"100px"}
          />
          <p className="desc-txt">
            Calculation will take around 3 hours. You can close the window or
            view your data
          </p>
          <div className="btns">
            <button className="sample-graph" onClick={redirectToGraph}>
              Visualize Data
            </button>
            <button className="cancel-sbmt" onClick={closeSubmitModal}>
              cancel calculation
            </button>
          </div>
        </div>
      </SubmitModal>

      <AfterCalcModal
        open={state.showAfterCalcModal}
        closeModal={closeAfterCalcModal}
      >
        <div className="sbmt-modal-childs">
          <p
            style={{ marginBottom: "5px", fontSize: "22px", fontWeight: "550" }}
            className="calculating"
          >
            Calculating Done!
          </p>
          {/* <ProgressBar completed={state.value} className="progress__bar" /> */}
          <img src={donegif} alt="correct gif" />
          <p className="desc-txt">
            You can view your today's calculation at any time in history tab
          </p>
          <div className="btns">
            <button className="sample-graph" onClick={redirectToForecastResult}>
              view results
            </button>
            <button className="cancel-sbmt" onClick={closeAfterCalcModal}>
              cancel
            </button>
          </div>
        </div>
      </AfterCalcModal>
    </>
  );
}

export default Main;
