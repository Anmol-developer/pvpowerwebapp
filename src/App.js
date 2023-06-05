import "./App.css";
import Navigation from "./components/Pages/Navigation";
import Footer from "./components/Pages/Footer";
import { Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import userLogin from "./context/UserLogin";
// import axios from "./axios";

function App() {
  // const [user, setUser] = useState(null)
  // useEffect(() => {
  //   getUser();
  //   console.log(user);
  // }, []);

  // const getUser = async()=>{
  //   try{
  //     const url = 'http://localhost:5000/login/success'
  //     const {data} = await axios.get(url,{withCredentials:true})
  //     setUser(data.user.json()) 
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  return (
    <div className="app__container">
      <Navigation />
      {/* <userLogin.Provider value={{user}}> */}
        <Outlet />
      {/* </userLogin.Provider> */}
      <Footer />
    </div>
  );
}

export default App;
