import React, { useContext, useEffect, useReducer } from "react";
import ShowModal from "./ShowModal";
import "../../../css/Dashboard/Modal/Modal.css";
import { AiOutlineWarning } from "react-icons/ai";
import axios from "axios";
import SubmitModal from "./SubmitModal";
import ProgressBar from "@ramonak/react-progress-bar";
import { read } from "xlsx";
import { utils, SSF } from "xlsx";
import { reducer, InitialState } from "../../../reducer/DataReducer";
import { useNavigate } from "react-router-dom";
import DataContext from "../../../context/Data";

function ModalPopUp({ lat, lon }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, InitialState);

  const { setdata } = useContext(DataContext);

  //getting input address's lat and lon using forward geocoding and loading functionality
  useEffect(() => {
    const location__adrs = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const result = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?key=9ab902a1269a44849e0d0200437bac80&q=${lat},${lon}&pretty=1`
        );
        const location = result.data.results[0].formatted;
        dispatch({ type: "SET_ADDRESS", payload: location });
      } catch (error) {
        alert(error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false }); // Set isLoading state back to false after the request is completed
      }
    };

    location__adrs();
    dispatch({ type: "SET_VALUE", payload: 10 });
    dispatch({ type: "SET_INCREMENT", payload: false });
  }, [lat, lon]);

  //for progress bar
  useEffect(() => {
    let interval;

    if (state.isIncrementing) {
      interval = setInterval(() => {
        if (state.value >= 100) {
          clearInterval(interval);
          dispatch({ type: "SET_INCREMENT", payload: false });
        } else {
          dispatch({ type: "SET_INCVALUE" });
        }
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [state.isIncrementing]);

  const handleFileChange = async (event) => {
    //initializing state so that it is default every time file changes
    dispatch({ type: "SET_VALUE", payload: 10 });
    dispatch({ type: "SET_FORMAT", payload: true });
    dispatch({ type: "SET_INCREMENT", payload: false });
    dispatch({type:'SET_DISABLED', payload: true})

    //declaring an array to check format with
    const format1 = [
      "Date",
      "PV Power (kW)",
      "Solar Irradiation",
      "Ambient Temperature",
      "Wind Speed",
      "Relative Humidity",
      "Cloud Cover",
      "Rainfall",
    ];
    const format2 = ["Date", "PV Power (kW)"];
    const data_format = state.dataType === "pv__data" ? format2 : format1;

    //handling file
    const file = event.target.files[0];
    dispatch({ type: "SET_FILE", payload: file });

    //converting file to array buffer
    const data = await file.arrayBuffer();
    const workbook = read(data);

    // Access the user-input sheet
    const userInputSheetName = workbook.SheetNames[0];
    const userInputSheet = workbook.Sheets[userInputSheetName];

    //extracting data for graph plotting
    const excelData = utils.sheet_to_json(userInputSheet, { header: 1 });
    // console.log(excelData);
    const extractedData = excelData.slice(1).map((row) => {
      const numericValue = parseFloat(row[0]);
      const dateObject = SSF.parse_date_code(numericValue);
      if (state.dataType === "pv__data") {
        return {
          date: `${String(dateObject.m).padStart(2, "0")}/${String(
            dateObject.d
          ).padStart(2, "0")}/${String(dateObject.y)}`,
          time: dateObject.H + ":" + dateObject.M + ":" + dateObject.S,
          pv: row[1],
        };
      }
      return {
        date: `${String(dateObject.m).padStart(2, "0")}/${String(
          dateObject.d
        ).padStart(2, "0")}/${String(dateObject.y)}`,
        time: dateObject.H + ":" + dateObject.M + ":" + dateObject.S,
        pv: row[1],
        solarRadiation: row[2],
        Temperature: row[3],
        windSpeed: row[4],
        RHumidity: row[5],
        CloudCover: row[6],
        Rainfall: row[7],
      };
    });

    dispatch({ type: "SET_DATA", payload: extractedData });
    dispatch({ type: "SET_DISABLED", payload: false });

    // Getting the names of headers to check for format
    const rowNum = 1; // Assuming row number 2 (index starts at 1)
    const rowValues = [];

    // Iterate over each column in the row
    for (let colNum = 1; ; colNum++) {
      const cellAddress = utils.encode_cell({ r: rowNum - 1, c: colNum - 1 }); //look in docs of 'npm xlsx'
      const cell = userInputSheet[cellAddress];

      if (!cell || !cell.v) {
        //.v signifies .value
        break; // Exit loop if cell is empty or does not exist
      }

      rowValues.push(cell.v);
    }

    //checking for file format
    for (let i = 0; i < rowValues.length; i++) {
      const element = rowValues[i];
      // console.log(element)
      if (rowValues.length !== data_format.length) {
        dispatch({ type: "SET_FORMAT", payload: false });
        dispatch({ type: "SET_DISABLED", payload: true });
        break;
      } else if (element !== data_format[i]) {
        dispatch({ type: "SET_FORMAT", payload: false });
        dispatch({ type: "SET_DISABLED", payload: true });
        break;
      }
    }

    dispatch({ type: "SET_DATAFORMAT", payload: data_format });
  };

  const closeModal = () => {
    dispatch({ type: "SET_SHOWMODAL", payload: false });
    //setting everything back to default
    dispatch({ type: "SET_FORMAT", payload: true });
    dispatch({ type: "SET_FILE", payload: null });
    dispatch({ type: "SET_DISABLED", payload: true });
    dispatch({ type: "SET_DATATYPE", payload: "pv__data" });
  };
  const closeSubmitModal = () => {
    dispatch({ type: "SET_SUBMODAL", payload: false });

    //setting everything back to default
    dispatch({ type: "SET_DISABLED", payload: true });
    dispatch({ type: "SET_DATATYPE", payload: "pv__data" });
    dispatch({ type: "SET_FORMAT", payload: true });
    dispatch({ type: "SET_FILE", payload: null });
  };

  const setLocation = () => {
    dispatch({ type: "SET_SHOWMODAL", payload: true });
  };

  const handleDataType = (e) => {
    dispatch({ type: "SET_DATATYPE", payload: e.target.value });

    state.isFormat
      ? dispatch({ type: "SET_FORMAT", payload: false })
      : dispatch({ type: "SET_FORMAT", payload: true });
    !state.isFormat && state.selectedFile !== null
      ? dispatch({ type: "SET_DISABLED", payload: false })
      : dispatch({ type: "SET_DISABLED", payload: true });
  };

  const redirectToGraph = () => {
    navigate("/dashboard/graph/1");
  };

  const handleInfoSubmit = () => {
    dispatch({ type: "SET_SHOWMODAL", payload: false });
    dispatch({ type: "SET_SUBMODAL", payload: true });
    dispatch({ type: "SET_INCREMENT", payload: true });
    setdata([state.data, state.dataFormat]);
  };
  return (
    <div className="modal__container">
      <button className="modal-btn" onClick={setLocation}>
        set this location
      </button>

      <ShowModal open={state.showModal} closeModal={closeModal}>
        <h2 className="modal__heading">Fill the information</h2>
        <p className="modal__lat">
          <b>Latitude: </b>
          {lat}
        </p>
        <p className="modal__lng">
          <b>Longitude: </b>
          {lon}
        </p>
        <p className="modal__adrs">
          <b>Address: </b>
          {state.isLoading && <span>Loading...</span>}
          {!state.isLoading && state.address && state.address}
        </p>

        <form className="data-type-form">
          <label htmlFor="data-type">
            <b>Select Data type: </b>
          </label>
          <select id="data-type" name="data-type" onChange={handleDataType}>
            <option value="pv__data">pv data</option>
            <option value="both">pv data + weather data</option>
          </select>
        </form>

        <div className="sample__table">
          <p className="pls-upload">
            Format of your data sheet should be same as in sample table
          </p>
          {state.dataType === "pv__data" ? (
            <a
              href={
                "https://docs.google.com/spreadsheets/d/1gUmeH_IQ8DKPmq1_UxcVWg4ws-LUgo4C9yO7qSUho_c/edit?usp=sharing"
              }
              rel="noreferrer"
              target="_blank"
            >
              Sample table for pv data
            </a>
          ) : (
            <a
              href={
                "https://docs.google.com/spreadsheets/d/12V6K4fs46bQihzyUmSWe54kf2x-bvJcLHLonCgqthsk/edit?usp=sharing"
              }
              rel="noreferrer"
              target="_blank"
            >
              Sample table for pv data + weather
            </a>
          )}
        </div>

        <div className="file__upload">
          <p className="upload-text">
            <b>Upload your .xlsx or .xls file: </b>
          </p>
          <p className="upload-warn">
            <AiOutlineWarning className="warn-icon" /> Format of your file must
            be same as the sample table shown above
          </p>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".xlsx, .xls"
          />
          {state.selectedFile === null && (
            <p className="pls-upload">pls upload file</p>
          )}
          {state.isFormat && state.disabled && state.selectedFile !== null && (
            <p style={{ marginTop: "5px", fontSize: "13px" }}>
              checking pls wait...
            </p>
          )}
          {state.isFormat === false && state.selectedFile !== null && (
            <p className="pls-upload">Format not correct</p>
          )}
        </div>

        {state.disabled ? (
          <button className="sb-disabled">Submit</button>
        ) : (
          <button className="sb-active" onClick={handleInfoSubmit}>
            Submit
          </button>
        )}
      </ShowModal>

      <SubmitModal open={state.showSubmitModal} closeModal={closeSubmitModal}>
        <p style={{ marginBottom: "5px" }}>Calculating</p>
        <ProgressBar completed={state.value} className="progress__bar" />
        <button className="sample-graph" onClick={redirectToGraph}>
          Sample graph
        </button>
        <button className="cancel-sbmt" onClick={closeSubmitModal}>
          cancel
        </button>
      </SubmitModal>
    </div>
  );
}

export { ModalPopUp };
