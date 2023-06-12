import React, { useState } from 'react';
import '../../css/Dashboard/Dropdown.css'

const Dropdown = ({changeModel,CalcModel}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // for multiple check boxes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    changeModel(value,checked);
  };

  return (
    <div className='dropdown__container'>
      <button onClick={toggleDropdown}>Model</button>
      {isOpen && (
        <div className='dropdown-menu'>
          <ul>
            <li>
              <input
                type="checkbox"
                value="Randomforest"
                onChange={handleCheckboxChange}
                checked={CalcModel.includes("Randomforest")}
              />
              Randomforest
            </li>
            <li>
              <input
                type="checkbox"
                value="Light Gradient Boosting Machine"
                onChange={handleCheckboxChange}
                checked={CalcModel.includes("Light Gradient Boosting Machine")}
              />
              Light Gradient Boosting Machine
            </li>
            <li>
              <input
                type="checkbox"
                value="K-Nearest Neighbour"
                onChange={handleCheckboxChange}
                checked={CalcModel.includes("K-Nearest Neighbour")}
              />
              K-Nearest Neighbour
            </li>
            <li>
              <input
                type="checkbox"
                value="Support Vector Regression"
                onChange={handleCheckboxChange}
                checked={CalcModel.includes("Support Vector Regression")}
              />
              Support Vector Regression
            </li>
            <li>
              <input
                type="checkbox"
                value="NAMEMD + FFT + AM + LSTM"
                onChange={handleCheckboxChange}
                checked={CalcModel.includes("NAMEMD + FFT + AM + LSTM")}
              />
              NAMEMD + FFT + AM + LSTM
            </li>
          </ul>
        </div>
      )}
      
    </div>
  );
};

export default Dropdown;
