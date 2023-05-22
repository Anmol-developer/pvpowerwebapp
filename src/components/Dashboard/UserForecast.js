import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import '../../css/Dashboard/UserForecast.css'
import { read } from "xlsx";
import { utils, SSF } from "xlsx";

function ShowGraph() {
  const [data, setData] = useState([]);
  const [Acdata, setAcData] = useState([]);
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/forecast");
        console.log(response.data[response.data.length - 1]);
        setStartDate(response.data[response.data.length - 1].date);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const predicted = data.map((row) => row.Predictedpv);
  const actual = Acdata.map((row) => row.Actualpv);
  const time = data.map((row) => row.time);
  const dates = data.map((row) => row.date);

  const filteredPredictedpv = predicted.filter((_, index) =>
    dates[index].startsWith(startDate)
  );
  const filteredActualpv = actual.filter((_, index) =>
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
    {
      y: filteredActualpv,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: "Actual",
      marker: { color: "red" },
      visible: filteredActualpv[0] !== undefined ? true : false,
    },
  ];
  const layout = {
    title: `PV Data for ${startDate}`,
    yaxis: {
      title: "Time",
    },
    xaxis: {
      title: `Predicted Data ${Acdata.length!==0?(' & Actual Data'):('')}`,
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
      const response = await axios.get("http://localhost:5000/download", {
        responseType: "blob",
      });
      // Create a download link for the Excel file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data_predicted.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange= async(e)=>{
    const file = e.target.files[0];
    const data = await file.arrayBuffer();

    const workbook = read(data);

    const SheetName = workbook.SheetNames[0];
    const Sheet = workbook.Sheets[SheetName];

    const excelData = utils.sheet_to_json(Sheet, {header:1})

    const extractedData = excelData.slice(1).map((row) => {
      const numericValue = parseFloat(row[2]);
      const dateObject = SSF.parse_date_code(numericValue);
      
      return {
        date: `${String(dateObject.m).padStart(2, "0")}/${String(
          dateObject.d
        ).padStart(2, "0")}/${String(dateObject.y)}`,
        time: dateObject.H + ":" + dateObject.M + ":" + dateObject.S,
        Actualpv: row[0]
      };
    });

    setAcData(extractedData)
  }

  return (
    <>
      <div className="plot__container">
        <div className="main__header">
          <p className="dheader__title">DASHBOARD &gt; Graph</p>
          <p className="dheader__greet">welcome User</p>
        </div>
        <div className="main__plot">
          <div style={{marginBottom:'10px',display:'flex'}}>
            <span>Date: </span>
            <DatePicker
              selected={new Date(startDate)}
              onChange={handleSetDate}
              dateFormat={"MM/dd/yyyy"}
            />
            <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".xlsx, .xls, .csv"
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
  );
}
export default ShowGraph;
