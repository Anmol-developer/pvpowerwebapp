import React, { useContext, useState } from "react";
import Plot from "react-plotly.js";
import "../../css/Dashboard/ShowGraph.css";
import DataContext from "../../context/Data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userContext from "../../context/UserContext";

function ShowGraph() {
  const { dataEx } = useContext(DataContext);
  const { user } = useContext(userContext);
  // Extract the data and time from the Excel sheet columns
  const dates = dataEx.map((row) => row.date);
  const [startDate, setStartDate] = useState(dates[0]);
  const [endDate, setEndDate] = useState(dates[0]);

  const time = dataEx[0] && dataEx.map((row) => row.time);
  const pvValues = dataEx.map((row) => row.pv);
  const solarRadiation = dataEx.map((row) => row.solarRadiation);
  const Temperature = dataEx.map((row) => row.Temperature);
  const windSpeed = dataEx.map((row) => row.windSpeed);
  const RHumidity = dataEx.map((row) => row.RHumidity);
  const CloudCover = dataEx.map((row) => row.CloudCover);
  const Rainfall = dataEx.map((row) => row.Rainfall);

  // Filter the data for the selected date
  const filteredPVValues = pvValues.filter((_, index) =>
    (dates[index]>=(startDate) && dates[index]<=(endDate))
  );

  const filteredTime =dataEx[0] && time.filter((_, index) => dates[index]>=(startDate) && dates[index]<=(endDate));

  const filteredsolarRadiation = solarRadiation.filter((_, index) =>
  dates[index]>=(startDate) && dates[index]<=(endDate)
  );

  const filteredTemperature = Temperature.filter((_, index) =>
  dates[index]>=(startDate) && dates[index]<=(endDate)
  );

  const filteredwindSpeed = windSpeed.filter((_, index) =>
  dates[index]>=(startDate) && dates[index]<=(endDate)
  );

  const filteredRHumidity = RHumidity.filter((_, index) =>
  dates[index]>=(startDate) && dates[index]<=(endDate)
  );

  const filteredCloudCover = CloudCover.filter((_, index) =>
  dates[index]>=(startDate) && dates[index]<=(endDate)
  );

  const filteredRainfall = Rainfall.filter((_, index) =>
  dates[index]>=(startDate) && dates[index]<=(endDate)
  );

  const filteredDT = dataEx.filter((row)=> row.date<=endDate && row.date>=startDate);
  const dt = filteredDT.map((row)=> row.date + ' ' + row.time)
 console.log(dt)
  // Prepare the plot data
  const plotData = [
    {
      y: filteredPVValues,
      x: startDate===endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      name: "PV",
      marker: { color: "blue" },
      visible: filteredPVValues[0] !== undefined ? true : false,
    },
    {
      y: filteredsolarRadiation.map((elem)=> elem *= 5),
      x: startDate===endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      name: "Solar radiation",
      marker: { color: "red" },
      visible: filteredsolarRadiation[0] !== undefined ? "legendonly" : false,
    },
    {
      y: filteredTemperature.map((elem)=> elem *= 50),
      x: startDate===endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      name: "Temperature",
      marker: { color: "green" },
      visible: filteredTemperature[0] !== undefined ? "legendonly" : false,
    },
    {
      y: filteredwindSpeed.map((elem)=> elem *= 1200),
      x: startDate===endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      name: "Wind Speed",
      marker: { color: "pink" },
      visible: filteredwindSpeed[0] !== undefined ? "legendonly" : false,
    },
    {
      y: filteredRainfall.map((elem)=> elem *= 3000),
      x: startDate===endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      marker: { color: "black" },
      name: "rainfall",
      visible: filteredRainfall[0] !== undefined ? "legendonly" : false,
    },
    {
      y: filteredRHumidity.map((elem)=> elem *= 10),
      x: startDate===endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      marker: { color: "orange" },
      name: "relative humidity",
      visible: filteredRHumidity[0] !== undefined ? "legendonly" : false,
    },
    {
      y: filteredCloudCover.map((elem)=> elem *= 500),
      x: startDate===endDate ? filteredTime : dt,
      type: "scatter",
      mode: "lines",
      marker: { color: "grey" },
      name: "Cloud Cover",
      visible: filteredCloudCover[0] !== undefined ? "legendonly" : false,
    },
  ];

  // Set the layout options for the plot
  const layout = {
    title: `Data from ${startDate} to ${endDate}`,
    yaxis: {
      title: "Normalized Data",
    },
    xaxis: {
      title: "",
      // rangeslider:{}
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

  return (
    <>
      <div className="plot__container">
        <div className="main__header">
          <p className="dheader__title">DASHBOARD &gt; Visualize</p>
          <p className="dheader__greet">welcome {user.username}</p>
        </div>
        {dataEx[0] ? (
          <div className="main__plot">
            <div style={{ display: "flex" }}>
              <div>
                <span style={{color:'grey'}}>From: </span>
                <DatePicker
                  selected={new Date(startDate)}
                  onChange={handleSetDate}
                  dateFormat={"MM/dd/yyyy"}
                  style={{ border: "1px solid red" }}
                  minDate={new Date(dates[0])}
                  maxDate={new Date(dates[dates.length - 1])}
                />
              </div>
              <div>
                <span style={{color:'grey'}}>To: </span>
                <DatePicker
                  selected={new Date(endDate)}
                  onChange={handleSetEndDate}
                  dateFormat={"MM/dd/yyyy"}
                  minDate={new Date(dates[0])}
                  maxDate={new Date(dates[dates.length - 1])}
                />
              </div>
              <div style={{color:'grey', position:'absolute', right:'1rem', top:'15px'}}>
                *Please select dates of same year
              </div>
            </div>

            <Plot
              className="plot"
              data={plotData}
              config={{ responsive: true }}
              layout={layout}
            />
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
