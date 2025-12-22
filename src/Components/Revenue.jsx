import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Revenue = () => {
  const axiosSecure = useAxiosSecure();
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    axiosSecure.get("/admin/revenue").then((res) => {
      setRevenue(res.data.totalRevenue);
    });
  }, [axiosSecure]);

  return (
    <div className="card bg-base-100 p-6 shadow">
      <h2 className="text-xl font-semibold">Total Revenue</h2>
      <p className="text-3xl mt-4">৳{revenue}</p>
    </div>
  );
};

export default Revenue;
