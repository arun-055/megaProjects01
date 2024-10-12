import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Point to the correct backend server
  withCredentials: true, // To send cookies for auth
});

export default instance;
