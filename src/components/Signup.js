import React, { useState } from "react";
import imageSignup from '../undraw_sign_up_n6im.svg'
import '../css/Signup.css'
import {BiUserCircle} from 'react-icons/bi'
import {RiLockPasswordLine} from 'react-icons/ri'
import {FaKey} from 'react-icons/fa'
import {AiOutlineMail} from 'react-icons/ai'
import {Link} from 'react-router-dom'

function Signup() {
  const [btn, setBtn] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agreement, setAgreement] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    if (agreement) {
      alert('clicked')
    }else{
      alert('please check the box!')
    }
  };

  const handleChange = (event) => {
    setAgreement(event.target.checked)
    agreement ? setBtn({backgroundColor:'rgb(106, 106, 210)',color:'rgb(198, 198, 218)', cursor:'not-allowed'}) : setBtn({})
  }

  return (
    <div className="form__container">
    <div className="form__img">
      <img src={imageSignup} alt="abc"/>
    </div>
    <form className="form" onSubmit={handleSubmit}>
      <p className="signup__title">Sign Up</p>
      <label>
        <BiUserCircle className="signupicon"/>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="username input"
          placeholder="Username"
        />
      </label>
      
      <label>
        <AiOutlineMail className="signupicon"/>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="email input"
          placeholder="Email"
        />
      </label>

      <label>
        <RiLockPasswordLine className="signupicon"/>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="password input"
          placeholder="Password"
        />
      </label>
      
      <label>
        <FaKey className="signupicon"/>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="cpassword input"
          placeholder="Conform password"
        />
      </label>
      
      <p className="or">or</p>
      <div className="0auth__signup"></div>
      <label>
        <input
          type="checkbox"
          checked={agreement}
          onChange={handleChange}
        />
        I accept Terms and services
      </label>
      <br />
      <button className="signup__btn" type="submit" style={btn}>
        Register
      </button>
      <Link to={'/login'}>Already a member? Login</Link>
    </form>
    </div>
  );
}

export default Signup;
