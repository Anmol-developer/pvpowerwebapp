import React, {useState} from 'react'
import imageSignup from '../undraw_sign_up_n6im.svg'
import '../css/Login.css'
import {Link} from 'react-router-dom'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineMail} from 'react-icons/ai'


function Login() {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
      alert('clicked')
  };
  return (
    <div className="form__container">
    <div className="form__img">
      <img src={imageSignup} alt="abc"/>
    </div>
    <form className="form" onSubmit={handleSubmit}>
      <p className='login__title'>Login</p>
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
      {/* <br /> */}
      
      <p className='or'>or</p>
      <div className="0auth__login"></div>
      <br />
      <button className="login__btn" type="submit">
        Login
      </button>
      <Link to={'/signup'}>Not a member? Sign up</Link>
    </form>
    </div>
  )
}

export default Login