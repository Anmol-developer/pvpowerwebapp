import React, { useState } from "react";
import '../../../css/Pages/Regulations/Calculation.css'

function Calculator() {
  const [penaltyError, setPenaltyError] = useState("");
  const [forecastPower, setForecastPower] = useState("");
  const [ppaValue, setPpaValue] = useState("");
  const [calculatedValue1, setCalculatedValue1] = useState("");
  const [calculatedValue2, setCalculatedValue2] = useState("");

  const handlePenaltyErrorChange = (event) => {
    setCalculatedValue1('')
    setPenaltyError(event.target.value);
  };

  const handleForecastPowerChange = (event) => {
    setCalculatedValue1('')
    setForecastPower(event.target.value);
  };
  const handleCalc1 = (e) => {
    e.preventDefault();
    const calculatedValue =
      Math.round(
        10000 *
          ((1 - forecastPower / 100) *
            1.25 *
            (1 - penaltyError / 100) *
            (1 - penaltyError / 100))
      ) / 10000;
    setCalculatedValue1(calculatedValue);
  };
  const handleCalc2 = (e) => {
    e.preventDefault();
    const calculatedValue =
      Math.round((100 * 100 * calculatedValue1) / (ppaValue)) / 100;
    setCalculatedValue2(calculatedValue);
  };

  const handlePpaValueChange = (event) => {
    setCalculatedValue2('')
    setPpaValue(event.target.value);
  };

  return (
    <div className="calculator__container">
      <h2>
        Cost of Penalties for deviation of Variable Renewable Power Forecasting
      </h2>
      <form>
        <div style={{marginBottom:'40px'}}>
          <label htmlFor="penaltyError">
            <b>Enter No Penalty Error Band (%) :{" "}</b>
          </label>
          <input
            type="number"
            id="penaltyError"
            value={penaltyError}
            onChange={handlePenaltyErrorChange}
            required
          />
          <p style={{color:'grey', fontSize:'14px', margin:'8px 5px'}}>
            [ For CERC reguation No Penalty Error Band is 15%, for FOR reguation
            No Penalty Error Band is 10% (new projects) and 15% (old progects),
            for TNERC regulation No Penalty Error Band is 5% for Solar and 10%
            for Wind etc. ]
          </p>
        </div>

        <div>
          <label htmlFor="forecastPower">
            <b>Enter the probability value that the forecast power is inside the No
            penalty error band (%) : </b>
          </label>
          <input
            type="number"
            id="forecastPower"
            value={forecastPower}
            onChange={handleForecastPowerChange}
            required
          />
        </div>
        <button onClick={handleCalc1}>Calculate</button>
          <p>
            <b>Approximate average cost per available capcity due to deviation
            charge (INR / kW-Hr) : {calculatedValue1}</b><br/>
          {!calculatedValue1 && <span style={{color:'red', marginTop:'4px'}}>[ This needs to be calculated first before further calculations. ]</span>}
          </p>
        <div style={{marginTop:'30px'}}>
          <label htmlFor="ppaValue">
            <b>Enter the PPA value of the project (INR/kW-Hr) : </b>
          </label>
          <input
            type="number"
            id="ppaValue"
            value={ppaValue}
            onChange={handlePpaValueChange}
            required
          />
    
        </div>
          <button onClick={handleCalc2}>Calculate</button>
          <p>
          <b>Approximate Cost due to deviation charge w.r.t PPA (%):{" "}
            {calculatedValue2}</b>
          </p>
      </form>
      <p style={{marginTop:'50px'}}>
        For further details please contact at
        abc@gmail.com
      </p>
    </div>
  );
}

export default Calculator;
