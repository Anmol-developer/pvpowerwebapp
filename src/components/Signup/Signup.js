import React, { useReducer } from "react";
import imageSignup from "../../Images/undraw_sign_up_n6im.svg";
import "../../css/Signup/Signup.css";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import VerifyEmailModal from "../Modal/VerifyEmailModal";
import { initialState, reducer } from "../../reducer/SignupReducer";
import Agreement from "./Agreement";

function Signup() {
  const [state, dispatch] = useReducer(reducer,initialState);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.agreement) {
      if (state.confirmPassword !== state.password)
        dispatch({type:"SET_PASSEQUAL", payload: (<p className="pls-upload">Password and confirm password unequal</p>)})
      else {
        const status = await fetch("/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: state.email }),
        });
        
        const isUserExist = status.status;
        if (isUserExist === 200) {
          dispatch({type:"SET_PASSEQUAL", payload: ""})
          dispatch({type: "SET_SHOWVERMODAL", payload:true})
        } else if (isUserExist === 409) {
          alert("User already exists");
        }
      }
    } else {
      alert("please check the box!");
    }
  };

  const handleSignup = async () => {
    try {
      //request to /verify-email and send code
      const result = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email:state.email,
          password:state.password,
          username:state.username,
          verifyCode:state.verifyCode,
        }),
      });
      if (result) {
        const data = await result.json();
        console.log(data);
        if (data) {
          navigate(`/dashboard/main/${data._id}`);
          dispatch({type: "SET_SHOWVERMODAL", payload:false})
          dispatch({type: "SET_VERCODE", payload:""})
        }
      }
    } catch (error) {
      alert("code not equal");
      dispatch({type: "SET_SHOWVERMODAL", payload:false})
      console.log(error);
    }
  };

  const handleChange = (event) => {
    dispatch({type:"SET_AGREEMENT", payload: event.target.checked});
  };

  const handlePasswordCheck = (event) => {
    dispatch({type:"SET_CPASS", payload: event.tartget.value});

  };

  const closeModal = () => {
    dispatch({type: "SET_VERCODE", payload:""})
    dispatch({type: "SET_SHOWVERMODAL", payload:false})

  };

  const closeAgreementModal = ()=>{
    dispatch({type:"SET_SHOWAGREE", payload:false})
  }

  return (
    <div className="form__container">
      <div className="form__img">
        <img src={imageSignup} alt="abc" />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <p className="signup__title">Sign Up</p>
        <label>
          <BiUserCircle className="signupicon" />
          <input
            type="text"
            value={state.username}
            onChange={(event) => dispatch({type:"SET_USERNAME", payload: event.target.value})}
            className="username input"
            placeholder="Username"
            required
          />
        </label>

        <label>
          <AiOutlineMail className="signupicon" />
          <input
            type="email"
            value={state.email}
            onChange={(event) => dispatch({type:"SET_EMAIL", payload: event.target.value})}
            className="email input"
            placeholder="Email"
            required
          />
        </label>

        <label>
          <RiLockPasswordLine className="signupicon" />
          <input
            type="password"
            value={state.password}
            onChange={(event) => dispatch({type:"SET_PASS", payload: event.target.value})}
            className="password input"
            placeholder="Password"
            required
          />
        </label>

        <label>
          <FaKey className="signupicon" />
          <input
            type="password"
            value={state.confirmPassword}
            onChange={handlePasswordCheck}
            className="cpassword input"
            placeholder="Confirm password"
            required
          />
        </label>

        {state.passwordEqual}
        <label style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={state.agreement}
            onChange={handleChange}
            style={{ marginRight: "5px" }}
          />
          <span className="accept_tns" onClick={()=>dispatch({type:"SET_SHOWAGREE", payload:true})}>I accept Terms and services</span>
        </label>
        <br />
        <button
          className={`signup__btn ${!state.agreement && "disabled"}`}
          type="submit"
        >
          Submit
        </button>
        <Link to={"/login"}>Already a member? Login</Link>
      </form>
      <VerifyEmailModal open={state.showVerifyModal} closeModal={closeModal}>
        <div className="verify__heading">
          <h2>Verify Email</h2>
          <input
            type="number"
            className="code_input"
            value={state.verifyCode}
            onChange={(e) => dispatch({type:"SET_VERCODE",payload:e.target.value})}
            placeholder="Enter your 4 digit code"
            required
          />
          <button className="signup__btn" onClick={handleSignup}>
            Sign up
          </button>
        </div>
      </VerifyEmailModal>
      <Agreement open={state.showAgreement} closeModal={closeAgreementModal} />
    </div>
  );
}

export default Signup;
