import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DecoratorTable from "./DecoratorTable";

const ManageDecorators = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [decorators, setDecorators] = useState([]);
  const [refresh, setRefresh] = useState(false); // To trigger reload after toggle

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get("/admin/decorators")
        .then((res) => setDecorators(res.data))
        .catch((err) => {
          console.error(err);
          setDecorators([]);
        });
    }
  }, [axiosSecure, user?.email, refresh]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Decorators</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {decorators.map((decorator) => (
            <DecoratorTable
              key={decorator._id}
              decorator={decorator}
              reload={() => setRefresh(!refresh)} // trigger reload
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDecorators;
