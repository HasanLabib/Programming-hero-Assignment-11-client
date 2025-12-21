import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useServiceHook = () => {
  const [service, setService] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosS = useAxiosSecure();
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const result = await axiosS.get("/services");

        setService(result.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [axiosS]);
  return { service, error, loading };
};

export default useServiceHook;
