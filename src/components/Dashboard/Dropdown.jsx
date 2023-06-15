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
                value="randomforest"
                onChange={handleCheckboxChange}
                checked={CalcModel.includes("randomforest")}
              />
              Randomforest
            </li>
            <li>
              <input
                type="checkbox"
                value="lgbm"
                onChange={handleCheckboxChange}
                checked={CalcModel.includes("lgbm")}
              />
              Light Gradient Boosting Machine
            </li>
            <li>
              <input
                type="checkbox"
                value="knn"
                onChange={handleCheckboxChange}
                checked={CalcModel.includes("knn")}
              />
              K-Nearest Neighbour
            </li>
            <li>
              <input
                type="checkbox"
                value="svr"
                onChange={handleCheckboxChange}
                checked={CalcModel.includes("svr")}
              />
              Support Vector Regression
            </li>
            {/* <li>
              <input
                type="checkbox"
                value="NAMEMD + FFT + AM + LSTM"
                onChange={handleCheckboxChange}
                checked={CalcModel.includes("NAMEMD + FFT + AM + LSTM")}
              />
              NAMEMD + FFT + AM + LSTM
            </li> */}
          </ul>
        </div>
      )}
      
    </div>
  );
};

export default Dropdown;
