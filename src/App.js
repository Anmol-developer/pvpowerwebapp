import "./App.css";
import Navigation from "./components/Pages/Navigation";
import Footer from "./components/Pages/Footer";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className="app__container">
      <Navigation />
        <Outlet />
      <Footer />
    </div>
  );
}

export default App;
