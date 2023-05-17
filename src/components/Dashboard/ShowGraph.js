import React, { useContext, useState } from "react";
import Plot from 'react-plotly.js';
import '../../css/Dashboard/ShowGraph.css'
import DataContext from "../../context/Data";
import ShowGraphModal from "./Modal/ShowGraphModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ShowGraph() {
  const { dataEx, dataType } = useContext(DataContext)
  const [showModal, setShowModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  
  // Extract the data and time from the Excel sheet columns
  // const selectedDate = '12/5/2022'; // format - MM/d/yyyy
  const dates = dataEx.map((row) => row.date);
  const [startDate, setStartDate] = useState(new Date(dates[0]));
  const pvValues = dataEx.map((row) => row.pv);
  const time = dataEx.map((row) => row.time);

  // Filter the data for the selected date
  const filteredPVValues = pvValues.filter((_, index) => dates[index].startsWith(`${startDate.getMonth()+1}/${startDate.getDay()+4}/${startDate.getFullYear()}`));
  const filteredTime = time.filter((_, index) => dates[index].startsWith(`${startDate.getMonth()+1}/${startDate.getDay()+4}/${startDate.getFullYear()}`));

  // Prepare the plot data
  const plotData = [
    {
      y: filteredPVValues,
      x: filteredTime,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
    },
  ];

  // Set the layout options for the plot
  const layout = {
    title: `PV Data for ${startDate.getMonth()+1}/${startDate.getDay()+4}/${startDate.getFullYear()}`,
    yaxis: {
      title: 'Time'
    },
    xaxis: {
      title: 'PV Data',
    }
  };

  const handleData = () => {
    console.log(dates)
    setShowModal(true)
  }

  const closeGraphModal = () => {
    setShowModal(false)
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  return (
    <>
      <div className='plot__container'>
        <div className='main__header'>
          <p className='dheader__title'>DASHBOARD &gt; Graph</p>
          <p className='dheader__greet'>welcome User</p>
        </div>
        <div className='main__plot'>
          <button className="params-btn" onClick={handleData}>Select Parameters</button>
          <Plot
            className="plot"
            data={plotData}
            config={{ responsive: true }}
            layout={layout}
          />
        </div>
      </div>

      <ShowGraphModal closeGraphModal={closeGraphModal} open={showModal}>
        <h2 className='modal__heading'>Select Parameters</h2>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)}  dateFormat={'M/d/yyyy'}/>
        <div className="radio-opt">
          {dataType.map((type) => {
            return (
              <label className="radio__label">
                <input className="radio" type="radio" value={type} onChange={handleOptionChange} checked={selectedOption === `${type}`} />
                <p className="radio__txt">{type}</p>
              </label>
            )
          })}
        </div>
      </ShowGraphModal>
    </>
  )
}
export default ShowGraph;