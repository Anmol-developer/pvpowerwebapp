import React, { useContext, useState } from "react";
import Plot from "react-plotly.js";
import "../../css/Dashboard/ShowGraph.css";
import DataContext from "../../context/Data";
import ShowGraphModal from "./Modal/ShowGraphModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ShowGraph() {
  const { dataEx, dataType } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("PV Power (kW)");
  // const [filteredData, setFilteredData]  = useState({
  //   time:{
  //     data: []
  //   },
  //   pv: {
  //     data: [],
  //     color:'blue'
  //   },
  //   radiation: {
  //     data: [],
  //     color:'orange'
  //   },
  //   temperature: {
  //     data: [],
  //     color:'red'
  //   },
  //   wspeed: {
  //     data: [],
  //     color:'pink'
  //   },
  //   rhumidity: {
  //     data: [],
  //     color:'green'
  //   },
  //   ccover: {
  //     data: [],
  //     color:'grey'
  //   },
  //   rfall: {
  //     data: [],
  //     color:'black'
  //   }
  // })
  // Extract the data and time from the Excel sheet columns
  // const selectedDate = '12/5/2022'; // format - MM/d/yyyy
  const dates = dataEx.map((row) => row.date);
  const [startDate, setStartDate] = useState(dates[0]);
  const pvValues = dataEx.map((row) => row.pv);
  const time = dataEx.map((row) => row.time);
  const solarRadiation = dataEx.map((row)=> row.solarRadiation)
  const Temperature = dataEx.map((row)=> row.Temperature)
  const windSpeed = dataEx.map((row)=> row.windSpeed)
  const RHumidity = dataEx.map((row)=> row.RHumidity)
  const CloudCover = dataEx.map((row)=> row.CloudCover)
  const Rainfall = dataEx.map((row)=> row.Rainfall)

  // Filter the data for the selected date
  const filteredPVValues = pvValues.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  // setFilteredData({...filteredData, pv:{...filteredData.pv,data:filteredPVValues}})

  const filteredTime = time.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  // setFilteredData({...filteredData, time:{data:filteredTime}})

  const filteredsolarRadiation = solarRadiation.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  // setFilteredData({...filteredData, radiation:{...filteredData.radiation,data:filteredsolarRadiation}})

  const filteredTemperature = Temperature.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  // setFilteredData({...filteredData, temperature:{...filteredData.temperature,data:filteredTemperature}})

  const filteredwindSpeed = windSpeed.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  // setFilteredData({...filteredData, wspeed:{...filteredData.wspeed,data:filteredwindSpeed}})
  
  const filteredRHumidity = RHumidity.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  // setFilteredData({...filteredData, rhumidity:{...filteredData.rhumidity,data:filteredRHumidity}})

  const filteredCloudCover = CloudCover.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  // setFilteredData({...filteredData, ccover:{...filteredData.ccover,data:filteredCloudCover}})

  const filteredRainfall = Rainfall.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  // setFilteredData({...filteredData, rfall:{...filteredData.rfall,data:filteredRainfall}})


  // Prepare the plot data
  const plotData = [
    {
      y: filteredPVValues,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: 'PV',
      marker: { color: 'blue' },
    },
    {
      y: filteredsolarRadiation,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: 'Solar radiation',
      marker: { color: 'red' },
    },
    {
      y: filteredTemperature,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: 'Temperature',
      marker: { color: 'green' },
    },
    {
      y: filteredwindSpeed,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: 'Wind Speed',
      marker: { color: 'pink' },
    },
    {
      y: filteredRainfall,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: 'black' },
      name: 'rainfall'
    },
    {
      y: filteredRHumidity,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: 'orange' },
      name: 'relative humidity'
    },
    {
      y: filteredCloudCover,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      marker: { color: 'grey' },
      name: 'Cloud Cover'
    },
  ];

  // Set the layout options for the plot
  const layout = {
    title: `PV Data for ${startDate}`,
    yaxis: {
      title: "Time",
    },
    xaxis: {
      title: selectedOption,
    },
  };

  const handleData = () => {
    // console.log(dataEx)
    setShowModal(true);
  };

  const closeGraphModal = () => {
    setShowModal(false);
  };

  const handleOptionChange = (value, isChecked) => {
    if (isChecked) {
      setSelectedOption((prevValues) =>
        prevValues !== value ? prevValues + ", " + value : value
      );
    } else {
      setSelectedOption((prevValues) => prevValues.replace(value, ""));
    }
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
          <p className="dheader__greet">welcome User</p>
        </div>
        <div className="main__plot">
          <button className="params-btn" onClick={handleData}>
            Select Parameters
          </button>
          <Plot
            className="plot"
            data={plotData}
            config={{ responsive: true }}
            layout={layout}
          />
        </div>
      </div>

      <ShowGraphModal closeGraphModal={closeGraphModal} open={showModal}>
        <h2 className="modal__heading">Select Parameters</h2>
        <span>Date: </span>
        <DatePicker
          selected={new Date(startDate)}
          onChange={handleSetDate}
          dateFormat={"MM/dd/yyyy"}
        />
        <div className="radio-opt">
          {dataType.map((type) => {
            if (type === "Date") {
              return null;
            }
            return (
              <label className="radio__label">
                <input
                  className="radio"
                  type="checkbox"
                  value={type}
                  onChange={(e) =>
                    handleOptionChange(e.target.value, e.target.checked)
                  }
                />
                <span className="radio__txt">{type}</span>
              </label>
            );
          })}
        </div>
      </ShowGraphModal>
    </>
  );
}
export default ShowGraph;
