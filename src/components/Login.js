import React, {useState} from 'react'
import imageSignup from '../undraw_sign_up_n6im.svg'
import '../css/Login.css'
import {Link, useNavigate} from 'react-router-dom'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineMail} from 'react-icons/ai'
// import { GoogleLoginButton } from "react-social-login-buttons";
// import { LoginSocialGoogle } from "reactjs-social-login";


function Login() {
  const navigate = useNavigate();
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [provider, setProvider] = useState('')
  // const [profile, setProfile] = useState(null)

  // const onLoginStart = useCallback(() => {
  //   alert('login start')
  // }, [])

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
      
      {/* <p className='or'>or</p>
      <div className="google__signup">
          <LoginSocialGoogle
            client_id="272131417205-oa55svk2q1gfcue7i4qioade22fpbs8c.apps.googleusercontent.com"
            onLoginStart={onLoginStart}
            cookie_policy = 'single_host_origin'
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
              navigate('/dashboard/main/1')
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <GoogleLoginButton>
            Sign in with Google
            </GoogleLoginButton>
          </LoginSocialGoogle>
        </div> */}
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