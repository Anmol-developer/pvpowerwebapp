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
  const [startDate, setStartDate] = useState(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/forecast/data/${user._id}`);
        const randomforestData = response.data;
        if(randomforestData.length===0){
          setRandomforest([])
          return;
        }
        if (!date) {
          setStartDate(
            new Date(
              randomforestData[randomforestData.length - 1].randomforest[randomforestData[randomforestData.length - 1].randomforest.length-1].date //forecast date
            ).toLocaleDateString("en-US")
          );
          setRandomforest([...randomforestData[randomforestData.length - 1].randomforest]);
          setRandomforestDate(new Date(randomforestData[randomforestData.length-1].date).toLocaleDateString('en-US'))
        } else {
          const data = randomforestData.filter(
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
        }
      } catch (error) {
        setRandomforest([]);
        console.log(error);
      }
    };

    fetchData();
  }, [CalcModel]);

  const predicted = randomforest.map((row) => row.PredictedPV);
  const time = randomforest.map((row) => row.time);
  const dates = randomforest.map((row) => {
    const date = row.date;
    return new Date(date).toLocaleDateString("en-US");
  });

  const filteredPredictedpv = predicted.filter((_, index) =>
    dates[index].startsWith(startDate)
  );

  const filteredTime = time.filter((_, index) =>
    dates[index].startsWith(startDate)
  );

  // Prepare the plot data
  const plotData = [
    {
      y: filteredPredictedpv,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: "Predicted",
      marker: { color: "blue" },
      visible: filteredPredictedpv[0] !== undefined ? true : false,
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
