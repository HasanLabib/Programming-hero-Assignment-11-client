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
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="text-lg font-semibold">
            Total Earnings
          </h2>
          <p className="text-3xl font-bold text-green-600">
            ${summary.totalEarnings}
          </p>
        </div>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="text-lg font-semibold">
            Completed Projects
          </h2>
          <p className="text-3xl font-bold">
            {summary.totalProjects}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DecoratorEarning;
