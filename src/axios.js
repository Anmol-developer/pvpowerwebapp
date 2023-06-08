// import dotenv from 'dotenv';
import axios from "axios";
// dotenv.config();

const instance = axios.create({
    baseURL: `http://localhost:8080`,
    withCredentials:true
  });

  export default instance;