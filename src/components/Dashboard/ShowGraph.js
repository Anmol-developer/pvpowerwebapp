import React, { useContext, useState } from "react";
import Plot from "react-plotly.js";
import "../../css/Dashboard/ShowGraph.css";
import DataContext from "../../context/Data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userContext from "../../context/UserContext";

function ShowGraph() {
  const { dataEx } = useContext(DataContext);
  const {user} = useContext(userContext)
  // Extract the data and time from the Excel sheet columns
  const dates = dataEx.map((row) => row.date);
  const [startDate, setStartDate] = useState(dates[0]);

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
    dates[index].startsWith(startDate)
  );
  
  const filteredTime = dataEx[0] && time.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  
  const filteredsolarRadiation = solarRadiation.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  
  const filteredTemperature = Temperature.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  
  const filteredwindSpeed = windSpeed.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  
  const filteredRHumidity = RHumidity.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  
  const filteredCloudCover = CloudCover.filter((_, index) =>
    dates[index].startsWith(startDate)
  );

  const filteredRainfall = Rainfall.filter((_, index) =>
    dates[index].startsWith(startDate)
  );

  // Prepare the plot data
  const plotData = [
    {
      y: filteredPVValues,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: "PV",
      marker: { color: "blue" },
      visible: filteredPVValues[0] !== undefined ? true : false,
    },
    {
      y: filteredsolarRadiation,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: "Solar radiation",
      marker: { color: "red" },
      visible: filteredsolarRadiation[0] !== undefined ? "legendonly" : false,
    },
    {
      y: filteredTemperature,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: "Temperature",
      marker: { color: "green" },
      visible: filteredTemperature[0] !== undefined ? "legendonly" : false,
    },
    {
      y: filteredwindSpeed,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: "Wind Speed",
      marker: { color: "pink" },
      visible: filteredwindSpeed[0] !== undefined ? "legendonly" : false,
    },
    {
      y: filteredRainfall,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "black" },
      name: "rainfall",
      visible: filteredRainfall[0] !== undefined ? "legendonly" : false,
    },
    {
      y: filteredRHumidity,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "orange" },
      name: "relative humidity",
      visible: filteredRHumidity[0] !== undefined ? "legendonly" : false,
    },
    {
      y: filteredCloudCover,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: "grey" },
      name: "Cloud Cover",
      visible: filteredCloudCover[0] !== undefined ? "legendonly" : false,
    },
  ];

  // Set the layout options for the plot
  const layout = {
    title: `PV Data for ${startDate}`,
    yaxis: {
      title: "Time",
    },
    xaxis: {
      title: "PV Data",
    },
  };

  const handleSetDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    setStartDate(`${month}/${day}/${year}`);
  };

  return (
    <>
      <div className="plot__container">
        <div className="main__header">
          <p className="dheader__title">DASHBOARD &gt; Graph</p>
          <p className="dheader__greet">welcome {user.username}</p>
        </div>
        {dataEx[0]?(<div className="main__plot">
          <div>
            <span>Date: </span>
            <DatePicker
              selected={new Date(startDate)}
              onChange={handleSetDate}
              dateFormat={"MM/dd/yyyy"}
              minDate={new Date(dates[0])}
              maxDate={new Date(dates[dates.length-1])}
            />
          </div>
          <Plot
            className="plot"
            data={plotData}
            config={{ responsive: true }}
            layout={layout}
          />
        </div>):(<div className="main__plot">Please Upload data</div>)}
      </div>
    </>
  );
}
export default ShowGraph;
