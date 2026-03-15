import axios from 'axios';

const api = axios.create({
  baseURL: `http://${window.location.hostname}:3000`, // Dynamically uses current Host (localhost or IP)
  withCredentials: true, // Crucial: Includes session cookie in every request
});

export default api;
