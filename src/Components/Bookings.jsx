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
      <td>{booking.status}</td>
      <td>{booking.paymentStatus}</td>
      <td>
        {booking.paymentStatus != "paid" ? (
          <>
            <button onClick={handlePayment} className="btn btn-success btn-xs">
              Pay Now
            </button>
            <button onClick={handleCancel} className="btn btn-error btn-xs ml-3">
              Cancel Now
            </button>
          </>
        ) : (
          <span className="btn btn-ghost">Paid</span>
        )}
      </td>
    </tr>
  );
};

export default Bookings;
