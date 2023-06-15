import React, { useEffect, useState, useContext } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../axios";
import "../../css/Dashboard/UserForecast.css";
import userContext from "../../context/UserContext";
import { useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";

function ShowGraph() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [CalcModel, setCalcModel] = useState(["randomforest"]);
  
  let date = queryParams.get("date");
  const[dataDate, setRandomforestDate] = useState(null)
  const [randomforest, setRandomforest] = useState([]);
  const [knn, setKnn] = useState([]);
  const [lgbm, setLgbm] = useState([]);
  const [svr, setSvr] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/forecast/data/${user._id}`);
        const ResponseData = response.data;
        if(ResponseData.length===0){
          setRandomforest([])
          return;
        }
        if (!date) {
          setStartDate(
            new Date(
              ResponseData[ResponseData.length - 1].randomforest[ResponseData[ResponseData.length - 1].randomforest.length-1].date //forecast date
            ).toLocaleDateString("en-US")
          );
          setRandomforest([...ResponseData[ResponseData.length - 1].randomforest]);
          setKnn([...ResponseData[ResponseData.length - 1].knn]);
          setLgbm([...ResponseData[ResponseData.length - 1].lgbm]);
          setSvr([...ResponseData[ResponseData.length - 1].svr]);
          setRandomforestDate(new Date(ResponseData[ResponseData.length-1].date).toLocaleDateString('en-US'))
        } else {
          const data = ResponseData.filter(
            (Data) =>
              new Date(Data.date).toLocaleDateString("en-US") ===
              new Date(date).toLocaleDateString("en-US")
          );
          setStartDate(
            new Date(
              data[data.length - 1].randomforest[data[data.length - 1].randomforest.length-1].date
            ).toLocaleDateString("en-US")
          );
          setRandomforest([...data[data.length - 1].randomforest]);
          setKnn([...data[data.length - 1].knn]);
          setLgbm([...data[data.length - 1].lgbm]);
          setSvr([...data[data.length - 1].svr]);
        }
      } catch (error) {
        setRandomforest([]);
        setKnn([]);
        setLgbm([]);
        setSvr([]);
        console.log(error);
      }
    };

    fetchData();
  }, [CalcModel]);

  const predicted_RF = randomforest.map((row) => row.PredictedPV);
  const predicted_KNN = knn.map((row) => row.PredictedPV);
  const predicted_LGBM = lgbm.map((row) => row.PredictedPV);
  const predicted_SVR = svr.map((row) => row.PredictedPV);

  // const time_RF = randomforest.map((row) => row.time);
  const time_RF = randomforest.map((row) => row.time);
  // const time_KNN = randomforest.map((row) => row.time);
  // const time_LGBM = randomforest.map((row) => row.time);
  // const time_SVR = randomforest.map((row) => row.time);

  const dates = randomforest.map((row) => {
    const date = row.date;
    return new Date(date).toLocaleDateString("en-US");
  });

  const filteredPredictedpv_RF = predicted_RF.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  const filteredPredictedpv_KNN = predicted_KNN.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  const filteredPredictedpv_LGBM = predicted_LGBM.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  const filteredPredictedpv_SVR = predicted_SVR.filter((_, index) =>
    dates[index].startsWith(startDate)
  );

  const filteredTime_RF = time_RF.filter((_, index) =>
    dates[index].startsWith(startDate)
  );

  // Prepare the plot data
  const plotData = [
    {
      y: filteredPredictedpv_RF,
      x: filteredTime_RF,
      type: "scatter",
      mode: "lines+markers",
      name: "randomforest",
      marker: { color: "blue" },
      visible: (filteredPredictedpv_RF[0] !== undefined && CalcModel.includes("randomforest")!==false) ? true : false,
    },
    {
      y: filteredPredictedpv_KNN,
      x: filteredTime_RF,
      type: "scatter",
      mode: "lines+markers",
      name: "KNN",
      marker: { color: "green" },
      visible: (filteredPredictedpv_KNN[0] !== undefined && CalcModel.includes("knn")!==false) ? true : false,
    },
    {
      y: filteredPredictedpv_LGBM,
      x: filteredTime_RF,
      type: "scatter",
      mode: "lines+markers",
      name: "LGBM",
      marker: { color: "black" },
      visible: (filteredPredictedpv_LGBM[0] !== undefined && CalcModel.includes("lgbm")!==false) ? true : false,
    },
    {
      y: filteredPredictedpv_SVR,
      x: filteredTime_RF,
      type: "scatter",
      mode: "lines+markers",
      name: "SVR",
      marker: { color: "red" },
      visible: (filteredPredictedpv_SVR[0] !== undefined && CalcModel.includes("svr")!==false) ? true : false,
    },
  ];
  const layout = {
    title: `PV Data for ${startDate}`,
    yaxis: {
      title: `Predicted Data`,
    },
    xaxis: {
      title: "Time",
    },
  };

  const handleSetDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    setStartDate(`${month}/${day}/${year}`);
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get("/download", {
        responseType: "blob",
      });
      // Create a download link for the Excel file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "processed_data.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const changeModel = (value, checked) => {
    // const { value, checked } = e.target;
    if (checked) {
      setCalcModel([...CalcModel, value]);
    } else {
      setCalcModel(CalcModel.filter((val) => val !== value));
    }
  };

  if (!startDate) {
    return (
      <>
        <div className="plot__container">
          <div className="main__header">
            <p className="dheader__title">DASHBOARD &gt; Forecast</p>
            <p className="dheader__greet">welcome {user.username}</p>
            <p className="dheader__date">
              Date:{" "}
              {date
                ? new Date(date).toLocaleDateString("en-US")
                : new Date().toLocaleDateString("en-US")}
            </p>
          </div>
          <div className="main__plot">Loading....</div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="plot__container">
        <div className="main__header">
          <p className="dheader__title">DASHBOARD &gt; Forecast</p>
          <p className="dheader__greet">welcome {user.username}</p>
          {date ? (
            <p className="dheader__date">
              Date: {new Date(date).toLocaleDateString("en-US")}
            </p>
          ):(<p className="dheader__date">
          Date: {dataDate}
        </p>)}
        </div>
        <div className="main__plot">
          <div style={{ marginBottom: "10px", display: "flex" }}>
            <span>Date: </span>
            <DatePicker
              selected={new Date(startDate)}
              onChange={handleSetDate}
              dateFormat={"MM/dd/yyyy"}
              minDate={new Date(dates[0])}
              maxDate={new Date(dates[dates.length - 1])}
            />
            <div className="dropdown-model" style={{display:'flex'}}>
              <Dropdown changeModel={changeModel} CalcModel={CalcModel}/>
            </div>
          </div>
          {randomforest.length!==0 ? (<Plot
            className="plot"
            data={plotData}
            config={{ responsive: true }}
            layout={layout}
          />):(<p className="no-data-available">No Data Available</p>)}
        </div>
        <button onClick={handleDownload} className="download-btn">
          Download Excel
        </button>
      </div>
    </>
  );
}
export default ShowGraph;
