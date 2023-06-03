import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaKey } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../axios'
import { useParams } from 'react-router-dom';
import imageSignup from "../../Images/undraw_sign_up_n6im.svg";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const {userId} = useParams()

  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(password===cpassword){
        const resetResult = await axios.put(`/resetP/${userId}`, {
            password
        })
        if(resetResult.status===200){
          toast.success('Password set successfully!', {
            position: "top-center",
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
    }else{
        toast.warn('Password and Confirm Password not equal', {
            position: "top-center",
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
  }

  return (
    <div className="form__container">
      <div className="form__img">
        <img src={imageSignup} alt="abc" />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <p className="login__title">Reset Password</p>
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
            value={cpassword}
            onChange={(e)=>setCPassword(e.target.value)}
            className="cpassword input"
            placeholder="Confirm password"
            required
          />
        </label>
        <button className="login__btn" type="submit">
          Reset
        </button>
      </form>
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
    </div>
  )
}

export default ResetPassword