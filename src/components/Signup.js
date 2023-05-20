import React, { useState } from "react";
import imageSignup from "../undraw_sign_up_n6im.svg";
import "../css/Signup.css";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { GoogleLoginButton } from "react-social-login-buttons";
// import { LoginSocialGoogle } from "reactjs-social-login";
// import { initialState, reducer } from "../reducer/UserReducer";

function Signup() {
  // const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [passwordEqual, setPasswordEqual] = useState("");
  // const [state,dispatch] = useReducer(reducer,initialState)

  // const onLoginStart = useCallback(() => {
  //   alert('login start')
  // }, [])


  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    if (agreement) {
      if (confirmPassword !== password)
        setPasswordEqual(
          <p className="pls-upload">Password and confirm password unequal</p>
        );
      else setPasswordEqual("");
      alert("clicked");
    } else {
      alert("please check the box!");
    }
  };

  const handleChange = (event) => {
    setAgreement(event.target.checked);
  };

  const handlePasswordCheck = (event) => {
    setConfirmPassword(event.target.value);
  };

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
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="username input"
            placeholder="Username"
          />
        </label>

        <label>
          <AiOutlineMail className="signupicon" />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="email input"
            placeholder="Email"
          />
        </label>

        <label>
          <RiLockPasswordLine className="signupicon" />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="password input"
            placeholder="Password"
          />
        </label>

        <label>
          <FaKey className="signupicon" />
          <input
            type="password"
            value={confirmPassword}
            onChange={handlePasswordCheck}
            className="cpassword input"
            placeholder="Conform password"
          />
        </label>

        {/* className = "pls-upload" is given so that same css styles are applied to this element as in p element of ModalPopUp with same className */}
        {passwordEqual}
        {/* <p className="or">or</p>
        <div className="google__signup">
          <LoginSocialGoogle
            client_id="272131417205-oa55svk2q1gfcue7i4qioade22fpbs8c.apps.googleusercontent.com"
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              dispatch({type: 'SET_PROVIDER',payload :provider});
              dispatch({type: 'SET_PROFILE',payload :data});
              console.log('data: ', data);
              navigate('/dashboard/main/1')
            }}
            cookie_policy = 'single_host_origin'
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton>
            Sign up with Google
            </GoogleLoginButton>
          </LoginSocialGoogle>
        </div> */}
        <label style={{marginTop:'10px'}}>
          <input type="checkbox" checked={agreement} onChange={handleChange} style={{marginRight:'5px'}}/>I
          accept Terms and services
        </label>
        <br />
        <button className={`signup__btn ${!agreement && 'disabled'}`} type="submit">
          Register
        </button>
        <Link to={"/login"}>Already a member? Login</Link>
      </form>
    </div>
  );
}

export default Signup;
