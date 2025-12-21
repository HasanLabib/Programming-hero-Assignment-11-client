import axios from "axios";
import { use, useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:4000",
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          console.error("Unauthorized access - logging out user");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
