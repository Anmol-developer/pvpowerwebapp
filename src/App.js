import './App.css';
// import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='app__container'>
      <Navigation/>
      <Outlet/>
      {/* <Hero/> */}
      <Footer/>
    </div>
  );
}

export default App;
