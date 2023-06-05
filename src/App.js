import "./App.css";
import Navigation from "./components/Pages/Navigation";
import Footer from "./components/Pages/Footer";
import { Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";
// import userLogin from "./context/UserLogin";
// import axios from "./axios";

function App() {
  // const [user, setUser] = useState({})
  // useEffect(() => {
  //   userLogedIn();
  //   console.log(user);
  // }, []);

  // const userLogedIn = async () => {
  //   try {
  //     const user = await axios.get("/dashboard");
  //     if(user.status===200){
  //       setUser({...user.data})
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
