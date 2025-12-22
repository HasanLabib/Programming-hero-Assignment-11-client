import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const BookingTableAdmin = ({ booking, decorators, reload }) => {
  const axiosSecure = useAxiosSecure();
  const [selectedDecorator, setSelectedDecorator] = useState("");

  const assignDecorator = async () => {
    await axiosSecure.patch(`/admin/assign-decorator/${booking._id}`, {
      decoratorEmail: selectedDecorator,
    });
    reload();
  };

  const deleteBooking = async () => {
    await axiosSecure.delete(`/admin/bookings/${booking._id}`);
    reload();
  };

  return (
    <tr>
      <td>{booking.userEmail}</td>
      <td>{booking.serviceName}</td>

      <td>
        <span
          className={`badge ${
            booking.paymentStatus === "paid" ? "badge-success" : "badge-warning"
          }`}
        >
          {booking.paymentStatus}
        </span>
      </td>

      <td>{booking.assignedDecorator || "Not Assigned"}</td>

      <td className="space-x-2">
        {booking.paymentStatus === "paid" && !booking.assignedDecorator && (
          <>
            <select
              className="select select-xs select-bordered"
              value={selectedDecorator}
              onChange={(e) => setSelectedDecorator(e.target.value)}
            >
              <option value="">Select Decorator</option>
              {decorators.map((dec) => (
                <option key={dec.email} value={dec.email}>
                  {dec.name || dec.email}
                </option>
              ))}
            </select>

            <button
              onClick={assignDecorator}
              disabled={!selectedDecorator}
              className="btn btn-xs btn-primary"
            >
              Assign
            </button>
          </>
        )}

        <button onClick={deleteBooking} className="btn btn-xs btn-error">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BookingTableAdmin;
