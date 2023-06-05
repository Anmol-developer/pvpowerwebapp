import React, { useState } from "react";
import imageSignup from "../../Images/undraw_sign_up_n6im.svg";
import "../../css/Login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios";
import ResetModal from "../Modal/ResetModal";
 import { AiOutlineArrowLeft } from "react-icons/ai";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      navigate(`/dashboard/main/${data._id}`);
      // window.location.reload();
      // navigate(`/`);
      toast.success("Successfully logged in!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    } else {
      toast.warn("Incorrect credentials!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
      });
      navigate("/login");
    }
  };

  const resetPassword = async () => {
    const sentResult = await axios.post("/send-reset-password",{
      email
    });
    if (sentResult.status === 200) {
      toast.info("Reset Password link has been sent on your registered email", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setShowResetModal(false);
    } else {
      toast.error("OOPS! An error occured.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setShowResetModal(false);
    }
  };

  // const handleGoogle=()=>{
  //   window.open('http://localhost:5000/google/callback', "_self")
  // }

  const closeModal = () => {
    setShowResetModal(false);
  };

  const handleResetModal = () => {
    setShowResetModal(true);
  };
  return (
    <div className="form__container">
      <Link to='/' className="back-to-home"><AiOutlineArrowLeft/></Link>
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
        <Link to={"/signup"} style={{ marginTop: "5px" }}>
          Not a member? Sign up
        </Link>
        <p className="forgotP" onClick={handleResetModal}>
          Forgot password?
        </p>
      </form>
      
        {/* <button className="login__btn" onClick={handleGoogle}>
          Google
        </button> */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ResetModal open={showResetModal} closeModal={closeModal}>
        <div className="resetP__heading">
          <h2>Enter Email</h2>
          <input
            type="email"
            className="code_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Registered Email"
            required
          />
          <button className="signup__btn" onClick={resetPassword}>
            Reset
          </button>
        </div>
      </ResetModal>
    </div>
  );
}

export default Login;
