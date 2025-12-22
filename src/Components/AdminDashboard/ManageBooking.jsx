import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BookingTableAdmin from "./BookingTableAdmin";

const ManageBooking = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);

  const loadBookings = async () => {
    const res = await axiosSecure.get("/admin/bookings");
    setBookings(res.data);
  };

  const loadDecorators = async () => {
    const res = await axiosSecure.get("/admin/decorators");
    setDecorators(res.data);
  };

  useEffect(() => {
    loadBookings();
    loadDecorators();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Bookings</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>User</th>
            <th>Service</th>
            <th>Payment</th>
            <th>Decorator</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <BookingTableAdmin
              key={booking._id}
              booking={booking}
              decorators={decorators}
              reload={loadBookings}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBooking;
