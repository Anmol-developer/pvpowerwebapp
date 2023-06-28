import React from "react";
import "../../css/Pages/About.css";
import target from "../../Images/target.svg";
import WhyUs from "./WhyUs";

function About() {
  return (
    <div className="about__container">
      <p style={{ color: "purple", fontSize: "25px", fontWeight: "500" }}>
        OUR MISSION
      </p>
      <p style={{ fontSize: "30px", color: "gray", textAlign: "center" }}>
        To be India's best forecasting and Penalty reduction Tool
      </p>
      <img src={target} alt="target_image"/>

      <WhyUs />
      <div className="about__team">
        <p>Meet our Team</p>
        <p style={{ color: "grey", fontSize: "20px" }}>
          Powered by team of industry experts, engineers and enthusiasts
        </p>
        <div className="team-card">
          <div>
            <div className="team-member1"></div>
            <div className="team-member1-txt">
              <p>Mr.Abhijeet Rathore</p>
              <p>ML engineer</p>
            </div>
          </div>

          <div>
            <div className="team-member2"></div>
            <div className="team-member2-txt">
              <p>Prof. Raksha Sharma</p>
              <p>Founder, Assistant professor at Department of CS, IIT Roorkee</p>
            </div>
          </div>

          <div>
            <div className="team-member3"></div>
            <div className="team-member3-txt">
              <p>Prof. Rhythm Singh</p>
              <p>
                Founder, Assistant Professor at Department of HRE, IIT Roorkee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
