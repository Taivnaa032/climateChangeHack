import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

instance.interceptors.request.use((req) => {
  if (localStorage.getItem('climateAuth')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('climateAuth')).token}`
  };
  return req;
})

export default instance;
