require('dotenv').config()
import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.SERVER_PORT}`,
    withCredentials:true
  });

  export default instance;