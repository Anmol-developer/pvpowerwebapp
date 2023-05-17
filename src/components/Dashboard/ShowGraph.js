import React, { useContext, useState } from "react";
import Plot from 'react-plotly.js';
import '../../css/Dashboard/ShowGraph.css'
import DataContext from "../../context/Data";
import ShowGraphModal from "./Modal/ShowGraphModal";

function ShowGraph() {
  const { dataEx } = useContext(DataContext)
  const [showModal, setShowModal] = useState(false)
  // Extract the data and time from the Excel sheet columns
  const selectedDate = '12/5/2022';
  const dates = dataEx.map((row) => row.date);
  const pvValues = dataEx.map((row) => row.pv);
  const time = dataEx.map((row) => row.time);

  // Filter the data for the selected date
  const filteredPVValues = pvValues.filter((_, index) => dates[index].startsWith(selectedDate));
  const filteredTime = time.filter((_, index) => dates[index].startsWith(selectedDate));

  // Prepare the plot data
  const plotData = [
    {
      y: filteredTime,
      x: filteredPVValues,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
    },
  ];

  // Set the layout options for the plot
  const layout = {
    title: `PV Data for ${selectedDate}`,
    yaxis: {
      title: 'Time'
    },
    xaxis: {
      title: 'PV Data',
    }
  };


  const handleData = () => {
    // console.log(dataEx)
    setShowModal(true)
  }

  const closeGraphModal = ()=>{
    setShowModal(false)
  }

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
            layout={layout}
          />
        </div>
      </div>
      <ShowGraphModal closeGraphModal={closeGraphModal} open={showModal}>
        <p>Hello Modal</p>
      </ShowGraphModal>
    </>
  )
}
export default ShowGraph;