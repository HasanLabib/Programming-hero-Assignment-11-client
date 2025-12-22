import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";


const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/payments/user/${user?.email}`)
      .then((res) => setPayments(res?.data));
  }, [axiosSecure, user?.email]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Booking ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment) => (
            <tr key={payment?._id}>
              <td>${payment?.amount}</td>
              <td>{payment?.bookingId}</td>
              <td>{new Date(payment?.paymentDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
