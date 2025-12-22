import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://programming-hero-assignment-11-serv.vercel.app/admin/users"
      );
      setUsers(response.data);
      console.log("Fetched users:", response.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const makeDecorator = async (email) => {
    try {
      await axios.patch(
        `https://programming-hero-assignment-11-serv.vercel.app/admin/make-decorator/${email}`
      );
      alert(`${email} is now a decorator`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to make decorator:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== "decorator" ? (
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => makeDecorator(user.email)}
                  >
                    Make Decorator
                  </button>
                ) : (
                  <span className="badge badge-success">Decorator</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
