import React, { useContext, useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "../../css/Dashboard/ShowGraph.css";
import DataContext from "../../context/Data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userContext from "../../context/UserContext";
import Slider from "@mui/material/Slider";
// import 'react-slider/dist/index.css';

function ShowGraph() {
  const { dataEx } = useContext(DataContext);
  const { user } = useContext(userContext);
  const [maxDay, setMaxDay] = useState(null);
  const [Tvalue, setTValue] = useState([0, maxDay]);
  // Extract the data and time from the Excel sheet columns
  const dates = dataEx.map((row) => row.date);
  const [startDate, setStartDate] = useState(dates[0]);
  const [endDate, setEndDate] = useState(dates[dates.length - 1]);

  useEffect(() => {
    const date1 = new Date(dates[0]);
    // const date2 = new Date(endDate);
    const date2 = new Date(dates[dates.length - 1]);
    const diff = date2.getTime() - date1.getTime();
    const days = Math.floor(diff / (1000 * 24 * 3600));
    setMaxDay(days);
    setTValue([0, days]);
  }, []);

  const time = dataEx[0] && dataEx.map((row) => row.time);
  const pvValues = dataEx.map((row) => row.pv);
  const solarRadiation = dataEx.map((row) => row.solarRadiation);
  const Temperature = dataEx.map((row) => row.Temperature);
  const windSpeed = dataEx.map((row) => row.windSpeed);
  const RHumidity = dataEx.map((row) => row.RHumidity);
  const CloudCover = dataEx.map((row) => row.CloudCover);
  const Rainfall = dataEx.map((row) => row.Rainfall);

  // Filter the data for the selected date
  const filteredPVValues = pvValues.filter(
    (_, index) =>
      new Date(dates[index]).valueOf() >= new Date(startDate).valueOf() &&
      new Date(dates[index]).valueOf() <= new Date(endDate).valueOf()
  );

  const filteredTime =
    dataEx[0] &&
    time.filter(
      (_, index) =>
        new Date(dates[index]).valueOf() >= new Date(startDate).valueOf() &&
        new Date(dates[index]).valueOf() <= new Date(endDate).valueOf()
    );

  const filteredsolarRadiation = solarRadiation.filter(
    (_, index) =>
      new Date(dates[index]).valueOf() >= new Date(startDate).valueOf() &&
      new Date(dates[index]).valueOf() <= new Date(endDate).valueOf()
  );

  const filteredTemperature = Temperature.filter(
    (_, index) =>
      new Date(dates[index]).valueOf() >= new Date(startDate).valueOf() &&
      new Date(dates[index]).valueOf() <= new Date(endDate).valueOf()
  );

  const filteredwindSpeed = windSpeed.filter(
    (_, index) =>
      new Date(dates[index]).valueOf() >= new Date(startDate).valueOf() &&
      new Date(dates[index]).valueOf() <= new Date(endDate).valueOf()
  );

  const filteredRHumidity = RHumidity.filter(
    (_, index) =>
      new Date(dates[index]).valueOf() >= new Date(startDate).valueOf() &&
      new Date(dates[index]).valueOf() <= new Date(endDate).valueOf()
  );

  const filteredCloudCover = CloudCover.filter(
    (_, index) =>
      new Date(dates[index]).valueOf() >= new Date(startDate).valueOf() &&
      new Date(dates[index]).valueOf() <= new Date(endDate).valueOf()
  );

  const filteredRainfall = Rainfall.filter(
    (_, index) =>
      new Date(dates[index]).valueOf() >= new Date(startDate).valueOf() &&
      new Date(dates[index]).valueOf() <= new Date(endDate).valueOf()
  );

  const filteredDT = dataEx.filter(
    (row) =>
      new Date(row.date).valueOf() <= new Date(endDate).valueOf() &&
      new Date(row.date).valueOf() >= new Date(startDate).valueOf()
  );
  const dt = filteredDT.map((row) => row.date + " " + row.time);
  //  console.log(dt)
  // Prepare the plot data
  const plotData = [
    {
      y: filteredPVValues,
      x: startDate === endDate ? filteredTime : dt,
      type: "line",
      mode: "lines",
      name: "PV",
      marker: {
        color: "blue",
        line: {
          shape: "spline", // Apply spline interpolation for smoother curves
        },
      },
      visible: filteredPVValues[0] !== undefined ? true : false,
      fill: "tozeroy", // Fill the area under the line graph
      fillcolor: "rgba(0, 0, 255, 0.1)", // Set the color and opacity of the filled area
    },
    {
      y: filteredsolarRadiation.map((elem) => (elem *= 5)),
      x: startDate === endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      name: "Solar radiation",
      marker: {
        color: "red",
        line: {
          shape: "spline", // Apply spline interpolation for smoother curves
        },
      },
      visible: filteredsolarRadiation[0] !== undefined ? "legendonly" : false,
      fill: "tozeroy",
      fillcolor: "rgba(255, 0, 0, 0.1)",
    },
    {
      y: filteredTemperature.map((elem) => (elem *= 50)),
      x: startDate === endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      name: "Temperature",
      marker: {
        color: "green",
        line: {
          shape: "spline", // Apply spline interpolation for smoother curves
        },
      },
      visible: filteredTemperature[0] !== undefined ? "legendonly" : false,
      fill: "tozeroy",
      fillcolor: "rgba(0, 255, 0, 0.1)",
    },
    {
      y: filteredwindSpeed.map((elem) => (elem *= 1200)),
      x: startDate === endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      name: "Wind Speed",
      marker: {
        color: "pink",
        line: {
          shape: "spline", // Apply spline interpolation for smoother curves
        },
      },
      visible: filteredwindSpeed[0] !== undefined ? "legendonly" : false,
      fill: "tozeroy",
      fillcolor: "rgba(255, 192, 203,0.3)",
    },
    {
      y: filteredRainfall.map((elem) => (elem *= 3000)),
      x: startDate === endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      marker: {
        color: "violet",
        line: {
          shape: "spline", // Apply spline interpolation for smoother curves
        },
      },
      name: "rainfall",
      visible: filteredRainfall[0] !== undefined ? "legendonly" : false,
      fill: "tozeroy",
      fillcolor: "rgba(143, 0, 255,0.2)",
    },
    {
      y: filteredRHumidity.map((elem) => (elem *= 10)),
      x: startDate === endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      marker: {
        color: "orange",
        line: {
          shape: "spline", // Apply spline interpolation for smoother curves
        },
      },
      name: "relative humidity",
      visible: filteredRHumidity[0] !== undefined ? "legendonly" : false,
      fill: "tozeroy",
      fillcolor: "rgba(255, 165, 0,0.1)",
    },
    {
      y: filteredCloudCover.map((elem) => (elem *= 500)),
      x: startDate === endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      marker: {
        color: "grey",
        line: {
          shape: "spline", // Apply spline interpolation for smoother curves
        },
      },
      name: "Cloud Cover",
      visible: filteredCloudCover[0] !== undefined ? "legendonly" : false,
      fill: "tozeroy",
      fillcolor: "rgba(0, 0, 0,0.2)",
    },
  ];

  // Set the layout options for the plot
  const layout = {
    title: `Data from ${startDate} to ${endDate}`,
    yaxis: {
      title: "Normalized Data",
      showgrid: false,
    },
    xaxis: {
      title: "Time (drag axis from side)",
      showgrid: false,
      showticklabels: startDate === endDate ? true : false,
    },
  };

  const handleSetDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    setStartDate(`${month}/${day}/${year}`);
  };

  const handleSetEndDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    setEndDate(`${month}/${day}/${year}`);
  };

  const handleChange = (event, newValue) => {
    if (newValue[0] > Tvalue[0]) {
      increaseStartDate(startDate, newValue);
    } else if (newValue[0] < Tvalue[0]) {
      decreaseStartDate(startDate, newValue);
    }

    if (newValue[1] > Tvalue[1]) {
      increaseEndDate(endDate, newValue);
    } else if (newValue[1] < Tvalue[1]) {
      decreaseEndDate(endDate, newValue);
    }
    setTValue(newValue);
    console.log(startDate);
  };

  const increaseEndDate = (date, newValue) => {
    const tdate = new Date(date);
    const month = String(
      new Date(
        tdate.getTime() +
          Math.abs(newValue[1] - Tvalue[1]) * 24 * 60 * 60 * 1000
      ).getMonth() + 1
    ).padStart(2, "0");
    const year = new Date(
      tdate.getTime() + Math.abs(newValue[1] - Tvalue[1]) * 24 * 60 * 60 * 1000
    ).getFullYear();
    const day = String(
      new Date(
        tdate.getTime() +
          Math.abs(newValue[1] - Tvalue[1]) * 24 * 60 * 60 * 1000
      ).getDate()
    ).padStart(2, "0");
    setEndDate(`${month}/${day}/${year}`);
  };

  const decreaseEndDate = (date, newValue) => {
    const tdate = new Date(date);
    const month = String(
      new Date(
        tdate.getTime() -
          Math.abs(newValue[1] - Tvalue[1]) * 24 * 60 * 60 * 1000
      ).getMonth() + 1
    ).padStart(2, "0");
    const year = new Date(
      tdate.getTime() - Math.abs(newValue[1] - Tvalue[1]) * 24 * 60 * 60 * 1000
    ).getFullYear();
    const day = String(
      new Date(
        tdate.getTime() -
          Math.abs(newValue[1] - Tvalue[1]) * 24 * 60 * 60 * 1000
      ).getDate()
    ).padStart(2, "0");
    setEndDate(`${month}/${day}/${year}`);
  };

  const decreaseStartDate = (date, newValue) => {
    const tdate = new Date(date);
    const month = String(
      new Date(
        tdate.getTime() -
          Math.abs(Tvalue[0] - newValue[0]) * 24 * 60 * 60 * 1000
      ).getMonth() + 1
    ).padStart(2, "0");
    const year = new Date(
      tdate.getTime() - Math.abs(Tvalue[0] - newValue[0]) * 24 * 60 * 60 * 1000
    ).getFullYear();
    const day = String(
      new Date(
        tdate.getTime() -
          Math.abs(Tvalue[0] - newValue[0]) * 24 * 60 * 60 * 1000
      ).getDate()
    ).padStart(2, "0");
    setStartDate(`${month}/${day}/${year}`);
  };

  const increaseStartDate = (date, newValue) => {
    const tdate = new Date(date);
    const month = String(
      new Date(
        tdate.getTime() + (newValue[0] - Tvalue[0]) * 24 * 60 * 60 * 1000
      ).getMonth() + 1
    ).padStart(2, "0");
    const year = new Date(
      tdate.getTime() + (newValue[0] - Tvalue[0]) * 24 * 60 * 60 * 1000
    ).getFullYear();
    const day = String(
      new Date(
        tdate.getTime() + (newValue[0] - Tvalue[0]) * 24 * 60 * 60 * 1000
      ).getDate()
    ).padStart(2, "0");
    setStartDate(`${month}/${day}/${year}`);
  };

  return (
    <>
      <div className="plot__container">
        <div className="main__header">
          <p className="dheader__title">DASHBOARD &gt; Visualize</p>
          <p className="dheader__greet">welcome {user.username}</p>
        </div>
        {dataEx[0] ? (
          <div className="main__plot">
            <Plot
              className="plot"
              data={plotData}
              config={{ responsive: true }}
              layout={layout}
            />

            <div style={{ display: "flex", justifyContent:'center', alignItems:'center', marginTop:'20px' }}>
              <p style={{ color: "grey", margin:'auto' }}>{startDate}</p>
              <Slider
                className="visualize__range"
                value={Tvalue}
                min={0}
                max={maxDay}
                onChange={handleChange}
                style={{width:'73%', marginLeft:'20px', marginRight:'20px', color:'green'}}
              />
              <p style={{ color: "grey", margin:'auto' }}>{endDate}</p>
            </div>
          </div>
        ) : (
          <div className="main__plot">
            <p>Please Upload data</p>
          </div>
        )}
      </div>
    </>
  );
}
export default ShowGraph;
