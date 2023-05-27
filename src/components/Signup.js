import React, { useState } from "react";
import imageSignup from "../undraw_sign_up_n6im.svg";
import "../css/Signup.css";
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [passwordEqual, setPasswordEqual] = useState("");
  // const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (agreement) {
      if (confirmPassword !== password)
        setPasswordEqual(
          <p className="pls-upload">Password and confirm password unequal</p>
        );
      else{ setPasswordEqual("");
      try {
        const result = await axios.post("/signup", {
          username,
          email,
          password,
        });
        if (result.data) {
          if (result.data !== "user already exists") {
            navigate(`/dashboard/main/${result.data._id}`);
          } else {
            alert(result.data);
            navigate("/signup");
          }
        } else {
          navigate("/signup");
        }
      } catch (error) {
        console.log(error);
      }}
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
            required
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
            required
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
            required
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
            required
          />
        </label>

        {passwordEqual}
        <label style={{ marginTop: "10px" }}>
          <input
            type="checkbox"
            checked={agreement}
            onChange={handleChange}
            style={{ marginRight: "5px" }}
          />
          I accept Terms and services
        </label>
        <br />
        <button
          className={`signup__btn ${!agreement && "disabled"}`}
          type="submit"
        >
          Register
        </button>
        <Link to={"/login"}>Already a member? Login</Link>
      </form>
    </div>
  );
}

export default Signup;
