import './App.css';
// import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
// import { useEffect } from 'react';

function App() {
  const location = useLocation()
  
  if(location.pathname!=='/dashboard'){
    return (
      <div className='app__container'>
        <Navigation/>
        <Outlet/>
        {/* <Hero/> */}
        <Footer/>
      </div>
    );
  } else{
    return (
      <div className='app__container'>
        {/* <Navigation/> */}
        <Outlet/>
        {/* <Hero/> */}
        {/* <Footer/> */}
      </div>
    );
  }
  
}

export default App;
