import React, { useState } from "react";
import imageSignup from "../undraw_sign_up_n6im.svg";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("clicked");
    const result = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    if (result) {
      if (result.data !== "user does not exists") {
        const user = await axios.get("http://localhost:5000/dashboard",{
          headers:{
            "auth":`Bearer ${result.data.tokens[result.data.tokens.length-1].token}`
          }
        });
        navigate(`/dashboard/main/${user.data._id}`);
      } else {
        alert(result.data);
        navigate("/login");
      }
    } else {
      navigate("/login");
      window.alert("Incorrect credentials");
    }
  };

  return (
    <div className="form__container">
      <div className="form__img">
        <img src={imageSignup} alt="abc" />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <p className="login__title">Login</p>
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
        <br />
        <button className="login__btn" type="submit">
          Login
        </button>
        <Link to={"/signup"}>Not a member? Sign up</Link>
      </form>
    </div>
  );
}

export default Login;
