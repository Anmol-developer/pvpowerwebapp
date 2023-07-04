import React, { useEffect, useContext, useReducer, useState } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../axios";
import "../../css/Dashboard/UserForecast.css";
import userContext from "../../context/UserContext";
import DataContext from "../../context/Data";
import { useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";
// import Slider from "@mui/material/Slider";
import { initialState, reducer } from "../../reducer/ForecastReducer";

function getDaysBetweenDates(date1,date2){
  const diff = new Date(date1).getTime()-new Date(date2).getTime()
  const days = Math.floor(diff / (1000 * 24 * 3600));
  return days;
}

function ShowGraph() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { dataEx } = useContext(DataContext);
  let date = queryParams.get("date");
  const model = ["rf", "knn", "lgbm", "svr"];
  const { user } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [state.CalcModel]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/forecast/data/${user._id}`);
      const ResponseData = response.data;
      if (ResponseData.length === 0) {
        dispatch({ type: "SET_RANDOMFOREST", payload: [] });
        return;
      }
      if (!date) {
        dispatch({
          type: "SET_STARTDATE",
          payload: new Date(
            // payload:
            ResponseData[ResponseData.length - 1].randomforest[
              ResponseData[ResponseData.length - 1].randomforest.length - 1
            ].date //forecast date
          ).toLocaleDateString("en-US"),
        });
        dispatch({
          type: "SET_FILL",
          payload: ResponseData[ResponseData.length - 1],
        });
        dispatch({
          type: "SET_DATADATE",
          payload: new Date(
            // payload:
            ResponseData[ResponseData.length - 1].date
          ).toLocaleDateString("en-US"),
        });
      } else {
        const data = ResponseData.filter(
          (Data) =>
            new Date(Data.date).toLocaleDateString("en-US") ===
            new Date(date).toLocaleDateString("en-US")
        );
        dispatch({
          type: "SET_STARTDATE",
          payload: new Date(
            data[data.length - 1].randomforest[
              data[data.length - 1].randomforest.length - 1
            ].date
          ).toLocaleDateString("en-US"),
        });
        dispatch({ type: "SET_FILL", payload: data[data.length - 1] }); //sets the value of all model's result forecast
      }
    } catch (error) {
      dispatch({ type: "SET_EMPTY" }); //sets all the data of each model to []
      console.log(error);
    }
  };
  // const tempDataEx = dataEx.slice(-6);
  const predicted_RF = state.randomforest.map((row) => row.PredictedPV);
  const predicted_KNN = state.knn.map((row) => row.PredictedPV);
  const predicted_LGBM = state.lgbm.map((row) => row.PredictedPV);
  const predicted_SVR = state.svr.map((row) => row.PredictedPV);
  const time_RF = state.randomforest.map((row) => row.time);
  const dates = state.randomforest.map((row) => {
    const date = row.date;
    return new Date(date).toLocaleDateString("en-US");
  });

  // useEffect(()=>{
  //   const days = getDaysBetweenDates(state.startDate,state.endDate);
  //   setMaxDay(days)
  //   setValue([0,days])
  // })

  const filteredPredictedpv_RF = predicted_RF.filter((_, index) =>
    dates[index].startsWith(state.startDate)
  );
  const filteredPredictedpv_KNN = predicted_KNN.filter((_, index) =>
    dates[index].startsWith(state.startDate)
  );
  const filteredPredictedpv_LGBM = predicted_LGBM.filter((_, index) =>
    dates[index].startsWith(state.startDate)
  );
  const filteredPredictedpv_SVR = predicted_SVR.filter((_, index) =>
    dates[index].startsWith(state.startDate)
  );

  const filteredTime_RF = time_RF.filter((_, index) =>
    dates[index].startsWith(state.startDate)
  );
  const filteredDateTime = filteredTime_RF.map(
    (row) => new Date(state.startDate).toLocaleDateString("en-US") + " " + row
  );

  const dateToPlot = [];
  for (let i = 0; i < 5; i++) {
    const tempDate = new Date(state.startDate).setDate(
      new Date(state.startDate).getDate() - i - 1
    );
    dateToPlot[i] = new Date(tempDate).toLocaleDateString("en-US");
  }
  // console.log(dateToPlot);
  const filteredPV = dataEx.filter((_, index) => {
    return (
      new Date(dataEx[index].date).valueOf() >=
      new Date(dateToPlot[dateToPlot.length - 1]).valueOf()
    );
  });
  const filteredPVDate = filteredPV.map(
    (row) => new Date(row.date).toLocaleDateString("en-US") + " " + row.time
  );
  const filterPVData = filteredPV.map((row) => row.pv);
  const normalizedData = filterPVData.map((row) => (row %= 200));
  // Prepare the plot data
  const plotData = [
    {
      y: normalizedData,
      x: filteredPVDate,
      type: "scatter",
      mode: "lines",
      name: "User Data",
      marker: { color: "green" },
      visible: true,
      fill: "tozeroy",
      fillcolor: "rgba(0, 255, 0, 0.1)",
    },
    {
      y: filteredPredictedpv_RF,
      x: filteredDateTime,
      type: "scatter",
      mode: "lines",
      name: "randomforest",
      marker: { color: "blue" },
      visible:
        filteredPredictedpv_RF[0] !== undefined &&
        state.CalcModel.includes("randomforest") !== false
          ? true
          : false,
      fill: "tozeroy",
      fillcolor: "rgba(0, 0, 255, 0.1)",
    },
    {
      y: filteredPredictedpv_KNN,
      x: filteredDateTime,
      type: "scatter",
      mode: "lines",
      name: "KNN",
      marker: { color: "orange" },
      visible:
        filteredPredictedpv_KNN[0] !== undefined &&
        state.CalcModel.includes("knn") !== false
          ? true
          : false,
      fill: "tozeroy",
      fillcolor: "rgba(255, 165, 0,0.1)",
    },
    {
      y: filteredPredictedpv_LGBM,
      x: filteredDateTime,
      type: "scatter",
      mode: "lines",
      name: "LGBM",
      marker: { color: "violet" },
      visible:
        filteredPredictedpv_LGBM[0] !== undefined &&
        state.CalcModel.includes("lgbm") !== false
          ? true
          : false,
    },
    {
      y: filteredPredictedpv_SVR,
      x: filteredDateTime,
      type: "scatter",
      mode: "lines",
      name: "SVR",
      marker: { color: "red" },
      visible:
        filteredPredictedpv_SVR[0] !== undefined &&
        state.CalcModel.includes("svr") !== false
          ? true
          : false,
      fill: "tozeroy",
      fillcolor: "rgba(143, 0, 255,0.2)",
    },
  ];
  const layout = {
    title: `PV Data for ${new Date(state.startDate).toLocaleDateString(
      "en-US"
    )}`,
    yaxis: {
      title: `Predicted Data`,
      showgrid: false,
    },
    xaxis: {
      title: "Time (drag axis)",
      showgrid: false,
      showticklabels: false,
    },
  };

  const handleSetDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    dispatch({ type: "SET_STARTDATE", payload: `${month}/${day}/${year}` });
  };

  const handleDownload = async () => {
    try {
      for (let i = 0; i < model.length; i++) {
        const response = await axios.get(`/download/${model[i]}`, {
          responseType: "blob",
        });
        // Create a download link for the Excel file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `processed_data_${model[i]}.csv`);
        document.body.appendChild(link);
        link.click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeModel = (value, checked) => {
    if (checked) {
      dispatch({ type: "SET_CALCMODEL", payload: [...state.CalcModel, value] });
    } else {
      dispatch({
        type: "SET_CALCMODEL",
        payload: state.CalcModel.filter((val) => val !== value),
      });
    }
  };

  // const handleChange=(event,newValue)=>{
  //   if (newValue[0] > value[0]) {
  //     increaseStartDate(state.startDate, newValue);
  //   } else if (newValue[0] < value[0]) {
  //     decreaseStartDate(state.startDate, newValue);
  //   }

  //   if (newValue[1] > value[1]) {
  //     increaseEndDate(state.endDate, newValue);
  //   } else if (newValue[1] < value[1]) {
  //     decreaseEndDate(state.endDate, newValue);
  //   }
  //   setValue(newValue);
  //   console.log(state.startDate);
  // }

  // const increaseEndDate = (date, newValue) => {
  //   const tdate = new Date(date);
  //   const month = String(
  //     new Date(
  //       tdate.getTime() +
  //         Math.abs(newValue[1] - value[1]) * 24 * 60 * 60 * 1000
  //     ).getMonth() + 1
  //   ).padStart(2, "0");
  //   const year = new Date(
  //     tdate.getTime() + Math.abs(newValue[1] - value[1]) * 24 * 60 * 60 * 1000
  //   ).getFullYear();
  //   const day = String(
  //     new Date(
  //       tdate.getTime() +
  //         Math.abs(newValue[1] - value[1]) * 24 * 60 * 60 * 1000
  //     ).getDate()
  //   ).padStart(2, "0");
  //   dispatch({ type: "SET_STARTDATE", payload: `${month}/${day}/${year}` });
  // };

  // const decreaseEndDate = (date, newValue) => {
  //   const tdate = new Date(date);
  //   const month = String(
  //     new Date(
  //       tdate.getTime() -
  //         Math.abs(newValue[1] - value[1]) * 24 * 60 * 60 * 1000
  //     ).getMonth() + 1
  //   ).padStart(2, "0");
  //   const year = new Date(
  //     tdate.getTime() - Math.abs(newValue[1] - value[1]) * 24 * 60 * 60 * 1000
  //   ).getFullYear();
  //   const day = String(
  //     new Date(
  //       tdate.getTime() -
  //         Math.abs(newValue[1] - value[1]) * 24 * 60 * 60 * 1000
  //     ).getDate()
  //   ).padStart(2, "0");
  //   setEndDate(`${month}/${day}/${year}`);
  // };

  // const decreaseStartDate = (date, newValue) => {
  //   const tdate = new Date(date);
  //   const month = String(
  //     new Date(
  //       tdate.getTime() -
  //         Math.abs(value[0] - newValue[0]) * 24 * 60 * 60 * 1000
  //     ).getMonth() + 1
  //   ).padStart(2, "0");
  //   const year = new Date(
  //     tdate.getTime() - Math.abs(value[0] - newValue[0]) * 24 * 60 * 60 * 1000
  //   ).getFullYear();
  //   const day = String(
  //     new Date(
  //       tdate.getTime() -
  //         Math.abs(value[0] - newValue[0]) * 24 * 60 * 60 * 1000
  //     ).getDate()
  //   ).padStart(2, "0");
  //   dispatch({ type: "SET_STARTDATE", payload: `${month}/${day}/${year}` });
  // };

  // const increaseStartDate = (date, newValue) => {
  //   const tdate = new Date(date);
  //   const month = String(
  //     new Date(
  //       tdate.getTime() + (newValue[0] - value[0]) * 24 * 60 * 60 * 1000
  //     ).getMonth() + 1
  //   ).padStart(2, "0");
  //   const year = new Date(
  //     tdate.getTime() + (newValue[0] - value[0]) * 24 * 60 * 60 * 1000
  //   ).getFullYear();
  //   const day = String(
  //     new Date(
  //       tdate.getTime() + (newValue[0] - value[0]) * 24 * 60 * 60 * 1000
  //     ).getDate()
  //   ).padStart(2, "0");
  //   dispatch({ type: "SET_STARTDATE", payload: `${month}/${day}/${year}` });
  // };

  if (loading) {
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
          ) : (
            <p className="dheader__date">Date: {state.dataDate}</p>
          )}
        </div>
        <div className="main__plot">
          <div style={{ marginBottom: "10px", display: "flex" }}>
            <span>Date: </span>
            <DatePicker
              selected={new Date(state.startDate)}
              onChange={handleSetDate}
              dateFormat={"MM/dd/yyyy"}
              minDate={new Date(dates[0])}
              maxDate={new Date(dates[dates.length - 1])}
            />
            <div className="dropdown-model" style={{ display: "flex" }}>
              <Dropdown changeModel={changeModel} CalcModel={state.CalcModel} />
            </div>
          </div>
          {state.randomforest.length !== 0 ? (
            <>
              <Plot
                className="plot"
                data={plotData}
                config={{ responsive: true }}
                layout={layout}
              />
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <p style={{ color: "grey", margin: "auto" }}>{new Date(state.startDate).toLocaleDateString('en-US')}</p>
                <Slider
                  className="visualize__range"
                  value={value}
                  min={0}
                  max={maxDay}
                  onChange={handleChange}
                  style={{
                    width: "73%",
                    marginLeft: "20px",
                    marginRight: "20px",
                    color: "green",
                  }}
                />
                <p style={{ color: "grey", margin: "auto" }}>{new Date(endDate).toLocaleDateString('en-US')}</p>
              </div> */}
            </>
          ) : (
            <p className="no-data-available">No Data Available</p>
          )}
        </div>
        <button onClick={handleDownload} className="download-btn">
          Download Excel
        </button>
      </div>
    </>
  );
}
export default ShowGraph;
