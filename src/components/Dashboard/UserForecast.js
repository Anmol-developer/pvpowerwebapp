import React, { useContext, useState } from "react";
import Plot from "react-plotly.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ShowGraph() {

    const file = './'
 
  // Prepare the plot data
  const plotData = [
    {
      y: filteredPVValues,
      x: filteredTime,
      type: "scatter",
      mode: "lines+markers",
      name: 'PV',
      marker: { color: 'blue' },
      visible: (filteredPVValues[0] !== undefined ? true : false)
    }
]
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
    // console.log(filteredPVValues[0])
    // if(startDate) setShowModal(true);
    // else alert('please upload data')
  };

  const handleOptionChange = (value, isChecked) => {
    // if (isChecked) {
    //   setSelectedOption((prevValues) =>
    //     prevValues !== value ? prevValues + ", " + value : value
    //   );
    // } else {
    //   setSelectedOption((prevValues) => prevValues.replace(value, ""));
    // }
  };

  const handleSetDate = (date) => {
    // const month = String(date.getMonth() + 1).padStart(2, "0");
    // const day = String(date.getDate()).padStart(2, "0");
    // const year = date.getFullYear();
    // setStartDate(`${month}/${day}/${year}`);
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
      <div>
        <span>Date: </span>
        <DatePicker
          selected={new Date(startDate)}
          onChange={handleSetDate}
          dateFormat={"MM/dd/yyyy"}
        />
        </div>
    </>
  );
}
export default ShowGraph;
