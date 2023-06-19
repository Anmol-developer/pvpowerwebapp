import React,{useState,useEffect} from "react";
import dashboardImg from "../../Images/dashboard.png";
import dashboardImg2 from "../../Images/dashboard_step2.png";
import dashboardImg3 from "../../Images/dashboard_step3.png";
import dashboardImg4 from "../../Images/dashboard_step4.png";
import dashboardImg5 from "../../Images/dashboard_step5.png";
import "../../css/Pages/Tutorial.css";
import visualize from "../../Images/visualize.png";
import account from "../../Images/userAccount.png";
import forecast from "../../Images/forecast.png";
import validate from '../../Images/validate.png'
import history from "../../Images/history.png";
import { Link } from "react-scroll";
import axios from '../../axios'
import Loading from '../Modal/Loading'

function Tutorial() {
  const [user, setUser] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    getUser();
  },[])

  const getUser= async()=>{
    const user = await axios.get('/')
    if(user.status===200){
      setUser(true)
    setLoading(false)

    }else{
      setUser(false)
    setLoading(false)

    }
  }
  if(loading===true){
    return(
      <div className="regulations__container">
        <Loading/> 
      </div>
  )}
  
  return (
    <div className="tut">
      <div className="tutorial__sidebar">
        <p>Tutorial</p>
        <ul>
          <li>
            <p>Overview</p>
          </li>
          <li>
            <p>How to Guide</p>
            <ul>
              <Link
                className="sidebar-link-to-content"
                to="upload"
                smooth={true}
                duration={500}
              >
                <li>Upload the data</li>
              </Link>
              <Link
                className="sidebar-link-to-content"
                to="visualize"
                smooth={true}
                duration={500}
              >
                <li>Visualize</li>
              </Link>
              <Link
                className="sidebar-link-to-content"
                to="account"
                smooth={true}
                duration={500}
              >
                <li>Account</li>
              </Link>
              <Link
                className="sidebar-link-to-content"
                to="forecast"
                smooth={true}
                duration={500}
              >
                <li>Get forecast</li>
              </Link>
              <Link
                className="sidebar-link-to-content"
                to="validate"
                smooth={true}
                duration={500}
              >
                <li>Validate Data</li>
              </Link>
              <Link
                className="sidebar-link-to-content"
                to="history"
                smooth={true}
                duration={500}
              >
                <li>View older Data</li>
              </Link>
            </ul>
          </li>
        </ul>
      </div>
      <div className="tutorial__container">
        <h1 className="tut__overview">Overview</h1>
        <p className="tut-overview-txt">
          In this tutorial, we explore the field of PV power prediction using
          our platform PVcast. By leveraging data and advanced algorithms, we
          accurately estimate the energy production of solar panels based on
          various input parameters.
        </p>
        <h2 style={{ marginTop: "30px" }}>How to Guide</h2>
        <div className="step" id="upload">
          <h3>1. Upload data for forecasting</h3>
          <p>After login, you will see a dashboard like this</p>
          <img src={dashboardImg} alt="dashboard" />
          <p>This is dahsboard home page.</p>
          <p>
            You need to select your desired location either by dragging the
            marker to that location or typing the location name.
          </p>
          <p>
            After your location is set, click on the marker and you will see a
            pop-up like this:
          </p>
          <img src={dashboardImg2} alt="dashboard" />
          <p>
            click on set location button and another pop-up will show like this:
          </p>
          <img src={dashboardImg3} alt="dashboard" />
          <p>
            select the type of data that you want to predict PV power for from
            the dropdown. You can check the sample table also for that data by
            clicking on the button below it.
          </p>
          <p>
            Note that format of your excel file must be same as shown in sample
            table. Also only .xlsx and .csv files are allowed
          </p>
          <p>
            After uploading the data, it will check for the format in the
            background. If the format is correct then you will be allowed to
            submit your data.
          </p>
          <p>
            After clicking submit, calculation will happen in the backend which
            can take around 3 to 4 hours to complete. Meanwhile you can cancel
            the calculations or you can view forecast for next day.
          </p>
          <img src={dashboardImg4} alt="dashboard" />
          <p>
            You don't need to wait for calculations to happen. You can close
            your browser and when the calculations will be completed, you will
            be notified on your registered mail
          </p>
          <p>After calculations are done, you will see a pop-up like this:</p>
          <img src={dashboardImg5} alt="dashboard" />
          <p>now you can view full forecast. it's that easy!</p>
        </div>

        <div className="step" id="visualize">
          <h3>2. Visualize Tab</h3>
          <p>
            After uploading data, this tab has the plot of your uploaded data
            which you can download.
            <br />
            It looks like this:
          </p>
          <img src={visualize} alt="visualize" />
          <p>You can view your data for different dates.</p>
        </div>

        <div className="step" id="account">
          <h3>3. Account</h3>
          <p>
            you can view your account details and also edit them from this tab.
            <br />
            It looks like this:
          </p>
          <img src={account} alt="account" />
        </div>

        <div className="step" id="forecast">
          <h3>4. Forecast</h3>
          <p>
            This tab shows you your latest forecast calculation on a plot. You
            can also download excel sheet of your forecast results from here.
            <br /> Also you can view results of different forecasting models.
            <br />
            It looks like this:
          </p>
          <img src={forecast} alt="forecast" />
        </div>

        <div className="step" id="validate">
          <h3>5. Validate</h3>
          <p>
            You can validate forecast results in this tab by uploading your
            actual data that you got on particular dates.
            <br />
            It looks like this:
          </p>
          <img src={validate} alt="forecast" />
        </div>

        <div className="step" id="history">
          <h3>6. History</h3>
          <p>
            In this tab you can view all your previous calculations. You can
            view and delete your history.
            <br />
            It looks like this:
          </p>
          <img src={history} alt="history" />
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
