import './App.css';
// import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Navigation/>
      <Outlet/>
      {/* <Hero/> */}
      <Footer/>
    </>
  );
}

export default App;
