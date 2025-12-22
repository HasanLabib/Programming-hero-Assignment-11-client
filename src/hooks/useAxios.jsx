import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://programming-hero-assignment-11-serv.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
