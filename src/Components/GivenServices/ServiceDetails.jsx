import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import { AuthContext } from "../../Provider/AuthContext"; // assuming you have this
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ServiceDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingModal, setBookingModal] = useState(false);

  const [bookingData, setBookingData] = useState({
    bookingDate: "",
    location: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/service/${id}`);
        setService(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id, axiosSecure]);

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("You must be logged in to book a service");
    }

    try {
      const payload = {
        userName: user.displayName,
        userEmail: user.email,
        serviceId: service._id,
        serviceName: service.service_name,
        serviceCost: service?.cost,
        bookingDate: bookingData.bookingDate,
        location: bookingData.location,
      };
      const res = await axiosSecure.post("/bookings", payload);
      toast.success("Booking successful! ID: " + res?.data.bookingId);
      setBookingModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    }
  };

  if (loading) return <ClimbingBoxLoader color="#e74c3c" />;

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="absolute inset-0 rounded-3xl border-2 border-amber-300 pointer-events-none"></div>

          <div className="text-center space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 capitalize">
              {service?.service_name}
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              {service?.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="badge badge-outline">
                Category: {service?.category}
              </span>
              <span className="badge badge-outline">Cost: {service?.cost}</span>
              <span className="badge badge-outline">Unit: {service?.unit}</span>
            </div>
            <button
              className="btn btn-warning btn-wide mt-6"
              onClick={
                user
                  ? () => setBookingModal(true)
                  : () => toast.error("Please Login")
              }
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {bookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Book {service.service_name}
            </h2>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={user.displayName}
                disabled
                className="input input-bordered w-full"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                disabled
                className="input input-bordered w-full"
              />
              <input
                type="date"
                name="bookingDate"
                value={bookingData.bookingDate}
                onChange={handleBookingChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={bookingData.location}
                onChange={handleBookingChange}
                className="input input-bordered w-full"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setBookingModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
