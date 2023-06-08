import React, { useEffect, useState, useContext } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../axios";
import '../../css/Dashboard/UserForecast.css'
import userContext from "../../context/UserContext";
import DataContext from "../../context/Data";

function ShowGraph() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const { user } = useContext(userContext);
  const { dataEx } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/forecast/data/${user._id}`);
        // console.log(response.data[0]);
        console.log(response.data);
        setStartDate(new Date(response.data[0].data[response.data[0].data.length - 2].date).toLocaleDateString('en-US'));
        // setStartDate(response.data[0].date);
        setData([...response.data[0].data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  
  console.log('data', data);
  console.log(startDate);
  const predicted = data.map((row) => row.PredictedPV);
  const time = data.map((row) => row.time);
  const dates = data.map((row) => {
    const date = row.date;
    return new Date(date).toLocaleDateString('en-US');
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
    }
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

  if(!dataEx[0]){ return(<>
    <div className="plot__container">
        <div className="main__header">
          <p className="dheader__title">DASHBOARD &gt; Forecast</p>
          <p className="dheader__greet">welcome {user.username}</p>
        </div>
        <div>Please Upload Data</div>
      </div>
  </>)}
  else {return (
    <>
      <div className="plot__container">
        <div className="main__header">
          <p className="dheader__title">DASHBOARD &gt; Forecast</p>
          <p className="dheader__greet">welcome {user.username}</p>
        </div>
        <div className="main__plot">
          <div style={{marginBottom:'10px',display:'flex'}}>
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
        </div>
            <button onClick={handleDownload} className="download-btn">Download Excel</button>
      </div>
    </>
  );}
}
export default ShowGraph;
