import React from "react";
import Plot from 'react-plotly.js';
import '../../css/Dashboard/ShowGraph.css'

function ShowGraph() {

    return (
        <>
            <div className='main__container'>
                <div className='main__header'>
                    <p className='dheader__title'>DASHBOARD</p>
                    {/* <ModalPopUp/> */}
                    <p className='dheader__greet'>welcome back User</p>
                </div>
                <div className='main__plot'>
                    <button className="params-btn">Select Parameters</button>
                <Plot
                    className="plot"
                    data={[
                        {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'lines',
                            marker: { color: 'red' },
                        },
                        { type: 'lines', x: [1, 2, 3], y: [2, 5, 3] },
                    ]}
                    layout={{ title: 'A Fancy Plot' }}
                />
                </div>
            </div>
        </>
    )
}
export default ShowGraph;