import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [serviceDemand, setServiceDemand] = useState([]);
  const [bookingHistogram, setBookingHistogram] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/analytics").then((res) => {
      setServiceDemand(res.data.serviceDemand);
      setBookingHistogram(res.data.bookingHistogram);
    });
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold mb-2">Service Demand</h2>
        <BarChart width={600} height={300} data={serviceDemand}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Bookings by Date</h2>
        <BarChart width={600} height={300} data={bookingHistogram}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalBookings" />
        </BarChart>
      </div>
    </div>
  );
};

export default Analytics;
