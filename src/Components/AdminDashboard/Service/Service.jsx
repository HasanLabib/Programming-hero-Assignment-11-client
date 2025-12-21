import { useContext, useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const Service = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get("/services").then((res) => {
        setServices(res.data);
        setLoading(false);
      });
    }
  }, [user, axiosSecure]);

  const handleDelete = async () => {
    await axiosSecure.delete(`/services/${deleteId}`);
    setServices(services.filter((s) => s._id !== deleteId));
    setDeleteId(null);
  };

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center-safe w-11/12 mx-auto">
        <h2 className="text-2xl font-semibold mb-5">Decoration Services</h2>
        <Link to="/dashboard/services/add" className="btn btn-soft">
          Add Service
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Category</th>
              <th>Cost (BDT)</th>
              <th>Unit</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.service_name}</td>
                <td className="capitalize">{service.category}</td>
                <td>{service.cost}</td>
                <td>{service.unit}</td>
                <td className="max-w-xs truncate">{service.description}</td>
                <td className="flex justify-start gap-2 items-center">
                  <span>
                    <Link
                      to={`/dashboard/services/edit/${service._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </Link>
                  </span>
                  <span>
                    <button
                      onClick={() => setDeleteId(service._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">
              Are you sure you want to delete this service?
            </p>
            <div className="modal-action">
              <button onClick={handleDelete} className="btn btn-error">
                Confirm
              </button>
              <button onClick={() => setDeleteId(null)} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Service;
