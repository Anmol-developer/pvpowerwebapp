import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import 'leaflet/dist/leafelt.css'
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Hero from './components/Pages/Hero';
import Support from './components/Pages/Support';
import Signup from '../src/components/Signup/Signup'
import Pricing from '../src/components/Pages/Pricing'
import About from '../src/components/Pages/About'
import History from '../src/components/Pages/History'
import Login from '../src/components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard';
import { Error } from './components/Pages/Error'
import Main from './components/Dashboard/Main';
import ShowGraph from './components/Dashboard/ShowGraph';
import UserHistory from './components/Dashboard/UserHistoy';
import UserAccount from './components/Dashboard/UserAccount';
import UserForecast from './components/Dashboard/UserForecast';
import GraphError from './components/Dashboard/GraphError'
import Validate from './components/Dashboard/Validate';

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
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
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
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
