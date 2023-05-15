import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

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
        <Outlet/>
      </div>
    );
  }
  
}

export default App;
