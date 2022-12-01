import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const socialClient = axios.create({
  withCredentials: true,
  //http://localhost:8080
  //http://ec2-54-196-94-234.compute-1.amazonaws.com

  // baseURL: 'http://ec2-54-196-94-234.compute-1.amazonaws.com',
  baseURL: 'http://ec2-54-196-94-234.compute-1.amazonaws.com',

  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
  },
});

export interface socialApiResponse {
  status: number;
  payload: any;
}

export default socialClient;
