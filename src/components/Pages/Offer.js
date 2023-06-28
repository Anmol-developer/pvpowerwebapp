import React from "react";
import "../../css/Pages/Offer.css";
import Offer1 from "../../Images/dashboard.png";
import Offer2 from "../../Images/forecast.png";
import Offer3 from "../../Images/validate.png";

function Offer() {
  return (
    <>
      <div className="offer__container" style={{backgroundColor:'rgb(92, 92, 245)'}}>
        <div className="offer_txt">
          <p style={{ color: "white", fontSize: "40px" }}>
            User Friendly Interface
          </p>
          <p style={{ color: "white", width: "80%", fontSize: "19px" }}>
            Discover our platform with a user-friendly interface that makes
            navigation a breeze.
            <br /> Enjoy a seamless experience that prioritizes your needs.
          </p>
          <ul style={{ color: "white", fontSize: "18px" }}>
            <li>Easy to Access</li>
            <li>Easy to use</li>
          </ul>
        </div>
        <img src={Offer1} alt="offer1" style={{boxShadow:'15px 15px 15px blue'}} />
      </div>

      <div className="offer__container" style={{backgroundColor:'white', flexDirection:'row-reverse'}}>
        <div className="offer_txt" style={{marginLeft:'7%'}}>
          <p style={{ color: "grey", fontSize: "40px" }}>
            Get Accurate Forecast
          </p>
          <p style={{ color: "grey", width: "80%", fontSize: "19px" }}>
            Get the best and most accurate forecast that reduces penalities and errors.
            <br /> Powered by various Machine Learning Models to select from.
          </p>
          <ul style={{ color: "grey", fontSize: "18px" }}>
            <li>Easy to select and use ML Models</li>
            <li>Accurate forecasting</li>
            <li>Good looking graphical interface</li>
            <li>Downloadable csv</li>
          </ul>
        </div>
        <img src={Offer2} alt="offer1" style={{boxShadow:'15px 15px 15px grey'}} />
      </div>

      <div className="offer__container" style={{backgroundColor:'rgb(238, 237, 237)'}}>
        <div className="offer_txt">
          <p style={{ color: "grey", fontSize: "40px" }}>
          Validate your Forecast
          </p>
          <p style={{ color: "grey", width: "80%", fontSize: "19px" }}>
          Easy system to compare your forecast result from different models with actual data just by clicking and uploading your file!
          </p>
          <ul style={{ color: "grey", fontSize: "18px" }}>
          <li>Easy to Compare</li>
            <li>Easy to Access any date's data</li>
          </ul>
        </div>
        <img src={Offer3} alt="offer1" style={{boxShadow:'15px 15px 15px grey'}} />
      </div>

      
    </>
  );
}

export default Offer;
