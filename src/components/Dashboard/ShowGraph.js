import React, { useContext } from "react";
import Plot from 'react-plotly.js';
import '../../css/Dashboard/ShowGraph.css'
import DataContext from "../../context/Data";

function ShowGraph() {
    const {dataEx} = useContext(DataContext)

    const handleData = ()=>{
        console.log(dataEx)
    }

    return (
        <>
            <div className='main__container'>
                <div className='main__header'>
                    <p className='dheader__title'>DASHBOARD &gt; Graph</p>
                    <p className='dheader__greet'>welcome User</p>
                </div>
                <div className='main__plot'>
                    <button className="params-btn" onClick={handleData}>Select Parameters</button>
                    <Plot
                        className="plot"
                        data={[

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