import React, { useEffect, useState } from "react";
import "../../../css/Pages/Regulations/Regulations.css";
import Calculator from "./Calculator";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CERC from "../../../Docs/SOR7.pdf";
import FOR from "../../../Docs/FOR.pdf";
import axios from '../../../axios'

function Regulations() {
  const [user, setUser] = useState(false)

  useEffect(()=>{
    getUser();
  },[])

  const getUser= async()=>{
    const user = await axios.get('/')
    if(user.status===200){
      setUser(true)
    }else{
      setUser(false)
    }
  }
  const openPDF = (str) => {
    switch (str) {
      case "cerc":
        window.open(CERC, "_blank");
        break;

      case "for":
        window.open(FOR, "_blank");
        break;

      case "mp":
        window.open("https://mperc.in/index.htm", "_blank");
        break;

      case "rj":
        window.open("https://rerc.rajasthan.gov.in/", "_blank");
        break;

      case "tn":
        window.open(
          "https://windpro.org/windproarticles/Forecasting%20and%20scheduling%20of%20renewable%20energy%20in%20Tamil%20Nadu-converted.pdf",
          "_blank"
        );
        break;

      case "mh":
        window.open(
          "https://mahasldc.in/wp-content/uploads/2018/12/Procedure%20F%20%26%20S%20MERC%20approved-35MB%20(1).pdf",
          "_blank"
        );
        break;

      case "kntk":
        window.open(
          "https://kerc.karnataka.gov.in/uploads/22411664528139.pdf",
          "_blank"
        );
        break;

      case "gj":
        window.open(
          "https://gercin.org/regulation/gerc-forecasting-scheduling-deviation-settlement-and-related-matters-of-solar-and-wind-generation-sources-regulations-2019/",
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  if(!user){ 
    return(
    <div className="regulations__container">
      <h1>Unauthorized</h1>
    </div>
  )}
   else return (
    <div className="regulations__container">
      <h1>Regulations</h1>
      <p style={{marginTop:'20px', color:'grey'}}>
        Welcome to our website! At PVcast, we understand the importance of
        accurate forecasting, regulatory compliance, and efficient scheduling.
        Our team is dedicated to leveraging cutting-edge technology and data
        analysis to forecast future trends and events, helping you make informed
        decisions and stay ahead of the competition. We also prioritize
        compliance with relevant regulations to ensure your operations run
        smoothly and within legal boundaries. With our expertise in scheduling,
        we can assist you in optimizing your resources, managing timelines, and
        maximizing productivity. Trust us to provide reliable forecasting,
        adhere to regulations, and streamline your scheduling processes for a
        successful and efficient future.
      </p>
      <Tabs className="tab">
        <TabList>
          <Tab>Regulations</Tab>
          <Tab>Calculator</Tab>
        </TabList>

        <TabPanel>
          <div className="docs-links">
            <h4>Important Docs and Links</h4>
            <ul>
              <li>
                <p className="pdf" onClick={() => openPDF("cerc")}>
                  CERC
                </p>
              </li>
              <li>
                <p className="pdf" onClick={() => openPDF("for")}>
                  FOR
                </p>
              </li>
            </ul>
            <h4>State wise forecasting and scheduling regulations</h4>
            <ul>
              <li className="pdf" onClick={() => openPDF("ap")}>
                Andhra Pradesh
              </li>
              <li className="pdf" onClick={() => openPDF("gj")}>
                Gujarat
              </li>
              <li className="pdf" onClick={() => openPDF("kntk")}>
                Karnataka
              </li>
              <li className="pdf" onClick={() => openPDF("mp")}>
                Madhya Pradesh
              </li>
              <li className="pdf" onClick={() => openPDF("mh")}>
                Maharashtra
              </li>
              <li className="pdf" onClick={() => openPDF("rj")}>
                Rajasthan
              </li>
              <li className="pdf" onClick={() => openPDF("tm")}>
                Tamil Nadu
              </li>
            </ul>
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <Calculator />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Regulations;
