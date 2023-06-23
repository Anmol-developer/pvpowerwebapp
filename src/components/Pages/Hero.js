import React, { useState, useEffect } from "react";
import imagex from "../../Images/pv.jpg";
import "../../css/Pages/Hero.css";
import { Link } from "react-router-dom";
import axios from "../../axios";
// import Services from "./Services";
function Hero() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    const user = await axios.get("/");
    if (user.status === 200) {
      setUser(true);
    } else {
      setUser(false);
    }
  };
  return (
    <>
      <div className="hero__container">
        {/* <div className="hero__image"></div> */}
        <div className="hero__text">
          <p className="hero__header">Power up your day with PV forecasts!</p>
          <p className="hero__desc">
            Get real-time predictions for your solar power output with our PV
            power forecast website. Never miss a beat with accurate and reliable
            forecasting technology.
          </p>
          {user ? (
            <Link to={"/dashboard/main"} className="hero__btn">
              Dashboard
            </Link>
          ) : (
            <Link to={"/login"} className="hero__btn">
              Dashboard
            </Link>
          )}
        </div>
        <img src={imagex} alt="a hero" className="hero__img" />
      </div>
    </>
  );
}

export default Hero;
