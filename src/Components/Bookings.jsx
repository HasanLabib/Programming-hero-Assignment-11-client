import useAxiosSecure from "../hooks/useAxiosSecure";

const Bookings = ({ booking, setIsCancel, isCancel }) => {
  const axiosSecure = useAxiosSecure();

  const handlePayment = async () => {
    const res = await axiosSecure.post("/create-checkout-session", {
      bookingId: booking._id,
    });

    window.location.href = res.data.url;
  };
  const handleCancel = async () => {
    const result = await axiosSecure.delete(`/bookings/${booking._id}`);
    if (result) {
      setIsCancel(true);
    }
  };
  return (
    <tr>
      <td>{booking.serviceName}</td>

      <td>
        <span
          className={`badge ${
            booking.status === "completed" ? "badge-success" : "badge-warning"
          }`}
        >
          {booking.status}
        </span>
      </td>

      <td>
        <span
          className={`badge ${
            booking.paymentStatus === "paid" ? "badge-success" : "badge-error"
          }`}
        >
          {booking.paymentStatus}
        </span>
      </td>

      <td className="space-x-2">
        {booking.paymentStatus !== "paid" && (
          <>
            <button onClick={handlePayment} className="btn btn-xs btn-success">
              Pay Now
            </button>

            <button onClick={handleCancel} className="btn btn-xs btn-error">
              Cancel
            </button>
          </>
        )}

        <Link
          to={`/dashboard/bookings/edit/${booking._id}`}
          className="btn btn-xs"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default Bookings;
