import React, { useState } from "react";

function Calculator() {
  const [penaltyError, setPenaltyError] = useState("");
  const [forecastPower, setForecastPower] = useState("");
  const [ppaValue, setPpaValue] = useState("");
  const [calculatedValue1, setCalculatedValue1] = useState("");
  const [calculatedValue2, setCalculatedValue2] = useState("");

  const handlePenaltyErrorChange = (event) => {
    setPenaltyError(event.target.value);
  };

  const handleForecastPowerChange = (event) => {
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
    setPpaValue(event.target.value);
  };

  return (
    <>
      <h1>
        Cost of Penalties for deviation of Variable Renewable Power Forecasting
      </h1>
      <form>
        <div>
          <label htmlFor="penaltyError">
            Enter No Penalty Error Band (%) :{" "}
          </label>
          <input
            type="number"
            id="penaltyError"
            value={penaltyError}
            onChange={handlePenaltyErrorChange}
            required
          />
          <p>
            [ For CERC reguation No Penalty Error Band is 15%, for FOR reguation
            No Penalty Error Band is 10% (new projects) and 15% (old progects),
            for TNERC regulation No Penalty Error Band is 5% for Solar and 10%
            for Wind etc. ]
          </p>
        </div>

        <div>
          <label htmlFor="forecastPower">
            Enter the probability value that the forecast power is inside the No
            penalty error band (%) :
          </label>
          <input
            type="number"
            id="forecastPower"
            value={forecastPower}
            onChange={handleForecastPowerChange}
            required
          />
          <button onClick={handleCalc1}>Click</button>
          <p>
            Approximate average cost per available capcity due to deviation
            charge (INR / kW-Hr) : {calculatedValue1}
          </p>
        </div>

        <div>
          <label htmlFor="ppaValue">
            Enter the PPA value of the project (INR/kW-Hr):
          </label>
          <input
            type="number"
            id="ppaValue"
            value={ppaValue}
            onChange={handlePpaValueChange}
            required
          />
          <button onClick={handleCalc2}>click</button>
          <p>
            Approximate Cost due to deviation charge w.r.t PPA (%):{" "}
            {calculatedValue2}
          </p>
        </div>
      </form>
      <p>
        For further details please contact at
        abc@gmail.com
      </p>
    </>
  );
}

export default Calculator;
