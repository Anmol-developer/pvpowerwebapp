import React, { useReducer } from "react";
import Plot from 'react-plotly.js';
import '../../css/Dashboard/ShowGraph.css'
import { InitialState, reducer } from "../../reducer/DataReducer";

function ShowGraph() {
    const [state,dispatch] = useReducer(reducer,InitialState)

    const handleData = ()=>{
        dispatch({type:'give_data'})
        console.log(state)
    }

    return (
        <>
            <div className='main__container'>
                <div className='main__header'>
                    <p className='dheader__title'>DASHBOARD &gt; Graph</p>
                    {/* <ModalPopUp/> */}
                    <p className='dheader__greet'>welcome back User</p>
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