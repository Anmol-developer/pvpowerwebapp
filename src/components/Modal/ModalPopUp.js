import React, { useContext, useEffect, useReducer } from "react";
import ShowModal from "./ShowModal";
import "../../css/Modal/Modal.css";
import { AiOutlineWarning } from "react-icons/ai";
import axios from "axios";
import SubmitModal from "./SubmitModal";
import { read } from "xlsx";
import { utils, SSF } from "xlsx";
import { reducer, InitialState } from "../../reducer/DataReducer";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/Data";
import ReactLoading from "react-loading";
import donegif from "../../Images/41793-correct.gif";
import AfterCalcModal from "./AfterCalcModal";
import userContext from "../../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

function ModalPopUp({ lat, lon }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, InitialState);
  const { setdata } = useContext(DataContext);
  const { user } = useContext(userContext);

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
  }, [lat, lon]);

  const NotifyCalc = async (email) => {
    const send_calc_email = await axios.post("/send-calc-mail", { email });
  };

  const handleFileChange = async (event) => {
    //initializing state so that it is default every time file changes
    dispatch({ type: "SET_FORMAT", payload: true });
    dispatch({ type: "SET_DISABLED", payload: true });

    const data_format =
      state.dataType === "pv__data" ? state.format2 : state.format1;

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
    const extractedData = excelData.slice(1).map((row) => {
      const numericValue = parseFloat(row[0]);
      const dateObject = SSF.parse_date_code(numericValue);

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
    dispatch({ type: "SET_DEFAULT" });
  };
  const closeSubmitModal = async() => {
    await axios.get('/close-calc');
    dispatch({ type: "SET_SUBMODAL", payload: false });
    dispatch({ type: "SET_SHOWMODAL", payload: false });

    //setting everything back to default
    dispatch({ type: "SET_DEFAULT" });
  };

  const closeAfterCalcModal = async () => {
    await axios.get("/close-calc");
    dispatch({ type: "SET_AFTERCALCMODAL", payload: false });
    dispatch({ type: "SET_SHOWMODAL", payload: false });

    //setting everything back to default
    dispatch({ type: "SET_DEFAULT" });
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

  const redirectToGraph = async() => {
    await axios.get("/close-calc");
    navigate(`/dashboard/graph`);
  };
  const redirectToForecastResult = async() => {
    await axios.get("/close-calc");
    navigate(`/dashboard/forecast`);
  };

  const handleInfoSubmit = async () => {
    setdata([state.data, state.dataFormat]);
    dispatch({ type: "SET_SUBMODAL", payload: true });
    dispatch({ type: "SET_AFTERCALCMODAL", payload: false });

    const formData = new FormData();
    formData.append("file", state.selectedFile);
    const result = await fetch(`http://127.0.0.1:5000/api/flask/processing`, {
      method: "POST",
      // headers:{"Content-Type": "application/json"},
      body: formData,
    });
    console.log("File response: ", await result.json());

    //making request to /forecast to save data in mongoDB
    const saveData = await axios.get(`/forecast/${user._id}`);
    if (saveData.status === 200) {
      dispatch({ type: "SET_AFTERCALCMODAL", payload: true });
      dispatch({ type: "SET_SUBMODAL", payload: false });
      NotifyCalc(user.email);
    }

    dispatch({ type: "SET_SHOWMODAL", payload: false });
  };

  return (
    <>
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

          <form className="data-type-form">
            <label htmlFor="data-type">
              <b>Select Data type: </b>
            </label>
            <select
              id="data-type"
              name="data-type"
              onChange={handleDataType}
              style={{ marginTop: "5px" }}
            >
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
              <AiOutlineWarning className="warn-icon" /> Format of your file
              must be same as the sample table shown above
            </p>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              accept=".xlsx, .xls, .csv"
            />
            {state.selectedFile === null && (
              <p className="pls-upload">pls upload file</p>
            )}
            {state.isFormat &&
              state.disabled &&
              state.selectedFile !== null && (
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
      </div>
      <SubmitModal open={state.showSubmitModal} closeModal={closeSubmitModal}>
        <div className="sbmt-modal-childs">
          <p
            style={{ marginBottom: "5px", fontSize: "22px", fontWeight: "550" }}
            className="calculating"
          >
            Calculating
          </p>
          {/* <ProgressBar completed={state.value} className="progress__bar" /> */}
          <ReactLoading
            type={"bars"}
            color={"blue"}
            height={"100px"}
            width={"100px"}
          />
          <p className="desc-txt">
            Calculation will take around 3 hours. You can close the window or
            view your data
          </p>
          <div className="btns">
            <button className="sample-graph" onClick={redirectToGraph}>
              Check Trend
            </button>
            <button className="cancel-sbmt" onClick={closeSubmitModal}>
              cancel calculation
            </button>
          </div>
        </div>
      </SubmitModal>

      <AfterCalcModal
        open={state.showAfterCalcModal}
        closeModal={closeAfterCalcModal}
      >
        <div className="sbmt-modal-childs">
          <p
            style={{ marginBottom: "5px", fontSize: "22px", fontWeight: "550" }}
            className="calculating"
          >
            Calculating Done!
          </p>
          {/* <ProgressBar completed={state.value} className="progress__bar" /> */}
          <img src={donegif} alt="correct gif" />
          <p className="desc-txt">
            You can view your today's calculation at any time in history tab
          </p>
          <div className="btns">
            <button className="sample-graph" onClick={redirectToForecastResult}>
              view results
            </button>
            <button className="cancel-sbmt" onClick={closeAfterCalcModal}>
              cancel
            </button>
          </div>
        </div>
      </AfterCalcModal>
    </>
  );
}

export { ModalPopUp };
