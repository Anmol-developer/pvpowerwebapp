import React, { useEffect, useState, useContext } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../axios";
import "../../css/Dashboard/Validate.css";
import { read } from "xlsx";
import { utils, SSF } from "xlsx";
import userContext from "../../context/UserContext";

function Validate() {
  const [randomforest, setRandomforest] = useState([]);
  const [knn, setKnn] = useState([]);
  const [lgbm, setLgbm] = useState([]);
  const [svr, setSvr] = useState([]);
  const [Acdata, setAcData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const { user } = useContext(userContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/validate/${user._id}`);
      // console.log(response.data);
      setStartDate(
        response.data.randomforest[response.data.randomforest.length - 1].date
      );
      setRandomforest(response.data.randomforest);
      setKnn(response.data.knn);
      setLgbm(response.data.lgbm);
      setSvr(response.data.svr);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(new Date(randomforest[0].date).toLocaleDateString('en-US'));
  
  
  const filteredrandomforest = randomforest.filter((elem) =>
  elem.date === startDate
  );
  const randomforestPlot = filteredrandomforest.map((row)=> row.PredictedPV)
  console.log(filteredrandomforest);
  const dates = randomforest.map((row) => row.date);// not in format
  // console.log(dates);
  const time = filteredrandomforest.map((row) => row.time);
  // console.log(time);

  const filteredknn = knn.filter((elem) =>
  elem.date === startDate
  );
  const knnPlot = filteredknn.map((row)=> row.PredictedPV)

  const filteredlgbm = lgbm.filter((elem) =>
  elem.date === startDate
  );
  const lgbmPlot = filteredlgbm.map((row)=> row.PredictedPV)

  const filteredsvr = svr.filter((elem) =>
  elem.date === startDate
  );
  const svrPlot = filteredsvr.map((row)=> row.PredictedPV)

  // console.log(Acdata);
  const filteredActualpv = Acdata.filter((elem) =>
  new Date(elem.date).toLocaleDateString('en-US') === new Date(startDate).toLocaleDateString('en-US')
  );
  const actualPlot = filteredActualpv.map((row)=> row.Actualpv)
  console.log(filteredActualpv);
  console.log(new Date(startDate).toLocaleDateString('en-US'));
  // console.log(new Date(Acdata[0].date).toLocaleDateString('en-US'));
  

  // Prepare the plot data
  const plotData = [
    {
      // y: filteredrandomforest,
      y: randomforestPlot,
      x: time,
      type: "scatter",
      mode: "lines+markers",
      name: "Predicted from Randomforest",
      marker: { color: "blue" },
      visible: randomforestPlot[0] !== undefined && Acdata[0] ? true : false,
      // filteredrandomforest[0] !== undefined ,
    },
    {
      y: knnPlot,
      x: time,
      type: "scatter",
      mode: "lines+markers",
      name: "Predicted from KNN",
      marker: { color: "orange" },
      visible: knnPlot[0] !== undefined && Acdata[0] ? true : false,
    },
    {
      y: lgbmPlot,
      x: time,
      type: "scatter",
      mode: "lines+markers",
      name: "Predicted from LGBM",
      marker: { color: "black" },
      visible: lgbmPlot[0] !== undefined && Acdata[0] ? true : false,
    },
    {
      y: svrPlot,
      x: time,
      type: "scatter",
      mode: "lines+markers",
      name: "Predicted from SVR",
      marker: { color: "green" },
      visible: svrPlot[0] !== undefined && Acdata[0] ? true : false,
    },
    {
      y: actualPlot,
      x: time,
      type: "scatter",
      mode: "lines+markers",
      name: "Actual Data of the day",
      marker: { color: "red" },
      visible: actualPlot[0] !== undefined ? true : false,
    },
  ];
  const layout = {
    title: Acdata[0]
      ? `Validate for ${new Date(startDate).toLocaleDateString("en-US")}`
      : "Please upload file",
    yaxis: {
      title: `Predicted And Actual Data`,
    },
    xaxis: {
      title: "Time",
    },
  };

  const handleSetDate = (date) => {
    setStartDate(`${new Date(date).toLocaleDateString('en-US')}`);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();

    const workbook = read(data);

    const SheetName = workbook.SheetNames[0];
    const Sheet = workbook.Sheets[SheetName];

    const excelData = utils.sheet_to_json(Sheet, { header: 1 });
    // console.log(exce);

    const extractedData = excelData.slice(1).map((row) => {
      const numericValue = parseFloat(row[3]);
      const dateObject = SSF.parse_date_code(numericValue);
// const formattedDate = new Date(dateObject.year, dateObject.month - 1, dateObject.day, dateObject.hour, dateObject.minute, dateObject.second).toISOString();
// console.log(dateObject);

      return {
        date: `${new Date(String(dateObject.y), String(dateObject.m-1 ), String(dateObject.d), dateObject.H, dateObject.M, dateObject.S)}`,
        Actualpv: row[1],
      };
    });
    // console.log(extractedData);
    setAcData([...extractedData]);
  };

  return (
    <>
      <div className="plot__container">
        <div className="main__header">
          <p className="dheader__title">DASHBOARD &gt; Validate</p>
          <p className="dheader__greet">welcome {user.username}</p>
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
      </div>
    </>
  );
}

export default Validate;
