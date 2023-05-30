import React, { useState } from "react";
import imageSignup from "../undraw_sign_up_n6im.svg";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // alert("clicked");
    const result = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (result.status === 200) {
      const user = await fetch("/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await user.json();
      // console.log(data);
      navigate(`/dashboard/main/${data._id}`);
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
