import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Hero from './components/Pages/Hero';
import Signup from '../src/components/Signup/Signup'
import Pricing from '../src/components/Pages/Pricing'
import About from '../src/components/Pages/About'
import Contact from '../src/components/Pages/Contact'
// import Services from '../src/components/Pages/Services'
import Login from '../src/components/Login/Login'
import ResetPassword from '../src/components/Login/ResetPassword'
import Dashboard from './components/Dashboard/Dashboard';
import { Error } from './components/Pages/Error'
import Main from './components/Dashboard/Main';
import ShowGraph from './components/Dashboard/ShowGraph';
import UserHistory from './components/Dashboard/UserHistoy';
import UserAccount from './components/Dashboard/UserAccount';
import UserForecast from './components/Dashboard/UserForecast';
import GraphError from './components/Dashboard/GraphError'
import Validate from './components/Dashboard/Validate';
import Faq from './components/Pages/FAQ/Faq'
import Tutorial from './components/Pages/Tutorial';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [

      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      // {
      //   path: "/services",
      //   element: <Services />,
      // },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/tut",
        element: <Tutorial />,
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: 'main/:userId',
        element: <Main/>
      },
      {
        path: 'graph/:userId',
        element: <ShowGraph/>,
        errorElement: <GraphError/>
      },
      {
        path: 'history/:userId',
        element: <UserHistory/>
      },
      {
        path: 'account/:userId',
        element: <UserAccount/>
      },
      {
        path: 'forecast/:userId',
        element: <UserForecast/>
      },
      {
        path: 'validateData/:userId',
        element: <Validate/>
      },

    ]
  },
  {
    path:'/signup',
    element:<Signup/>,
    errorElement: <Error/>
  },
  {
    path:'/login',
    element:<Login/>,
    errorElement: <Error/>
  },
  {
    path:'/reset-password/:userId',
    element:<ResetPassword/>,
    errorElement: <Error/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);