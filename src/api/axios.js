import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/auth/",
});

export default instance;