import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Bookings from "./Bookings";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [isCancel, setIsCancel] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bookings/user/${user?.email}`)
        .then((res) => setBookings(res.data));
    }
  }, [axiosSecure, user?.email, isCancel]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <Bookings
            key={booking._id}
            booking={booking}
            isCancel={isCancel}
            setIsCancel={setIsCancel}
          />
        ))}
      </tbody>
    </table>
  );
};

export default MyBookings;
