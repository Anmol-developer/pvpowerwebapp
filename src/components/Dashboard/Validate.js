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
      console.log(response.data);
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

  const randomforestData = randomforest.map((row) => row.PredictedPV);
  const knnData = knn.map((row) => row.PredictedPV);
  const lgbmData = lgbm.map((row) => row.PredictedPV);
  const svrData = svr.map((row) => row.PredictedPV);
  const actual = Acdata.map((row) => row.Actualpv);
  const dates = randomforestData.map((row) => row.date);
  
  const filteredrandomforest = randomforestData.filter((elem) =>
  elem.date === startDate
  );
  const time = filteredrandomforest.map((row) => row.time);

  const filteredknn = knnData.filter((elem) =>
  elem.date === startDate
  );

  const filteredlgbm = lgbmData.filter((elem) =>
  elem.date === startDate
  );

  const filteredsvr = svrData.filter((elem) =>
  elem.date === startDate
  );

  const filteredActualpv = actual.filter((elem) =>
  elem.date === startDate
  );
  // const filteredTime = time.filter((elem) =>
  // elem.date === startDate
  // );

  // Prepare the plot data
  const plotData = [
    {
      y: filteredrandomforest,
      x: time,
      type: "scatter",
      mode: "lines+markers",
      name: "Predicted from Randomforest",
      marker: { color: "blue" },
      visible:
        filteredrandomforest[0] !== undefined && Acdata[0] ? true : false,
    },
    {
      y: filteredknn,
      // x: filteredTime,
      x: time,
      type: "scatter",
      mode: "lines+markers",
      name: "Predicted from Randomforest",
      marker: { color: "orange" },
      visible: filteredknn[0] !== undefined && Acdata[0] ? true : false,
    },
    {
      y: filteredlgbm,
      x: time,
      type: "scatter",
      mode: "lines+markers",
      name: "Predicted from Randomforest",
      marker: { color: "black" },
      visible: filteredlgbm[0] !== undefined && Acdata[0] ? true : false,
    },
    {
      y: filteredsvr,
      x: time,
      type: "scatter",
      mode: "lines+markers",
      name: "Predicted from Randomforest",
      marker: { color: "green" },
      visible: filteredsvr[0] !== undefined && Acdata[0] ? true : false,
    },
    {
      y: filteredActualpv,
      x: time,
      type: "scatter",
      mode: "lines+markers",
      name: "Actual Data of the day",
      marker: { color: "red" },
      visible: filteredActualpv[0] !== undefined ? true : false,
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
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    setStartDate(`${month}/${day}/${year}`);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();

    const workbook = read(data);

    const SheetName = workbook.SheetNames[0];
    const Sheet = workbook.Sheets[SheetName];

    const excelData = utils.sheet_to_json(Sheet, { header: 1 });

    const extractedData = excelData.slice(1).map((row) => {
      const numericValue = parseFloat(row[3]);
      const dateObject = SSF.parse_date_code(numericValue);

      return {
        date: `${String(dateObject.m).padStart(2, "0")}/${String(
          dateObject.d
        ).padStart(2, "0")}/${String(dateObject.y)}`,
        time: dateObject.H + ":" + dateObject.M + ":" + dateObject.S,
        Actualpv: row[1],
      };
    });

    setAcData(extractedData);
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
