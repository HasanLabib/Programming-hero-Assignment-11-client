import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DecoratorEarning = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [summary, setSummary] = useState({
    totalEarnings: 0,
    totalProjects: 0,
  });

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/decorator/earnings/${user.email}`)
      .then((res) => setSummary(res.data));
  }, [user?.email]);

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">Total Earnings</div>
        <div className="stat-value text-success">৳{summary.totalEarnings}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Completed Projects</div>
        <div className="stat-value">{summary.totalProjects}</div>
      </div>
    </div>
  );
};

export default DecoratorEarning;
