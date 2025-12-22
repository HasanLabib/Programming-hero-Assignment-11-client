import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthContext";


const MyProject = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/decorator/projects/${user.email}`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Assigned Projects</h2>

      {projects.length === 0 ? (
        <p>No assigned projects yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="card bg-base-100 shadow-md"
            >
              <div className="card-body">
                <h3 className="card-title">
                  {project.serviceName}
                </h3>

                <p>
                  <strong>Client:</strong> {project.userEmail}
                </p>

                <p>
                  <strong>Date:</strong> {project.bookingDate}
                </p>

                <p>
                  <strong>Status:</strong>
                  <span className="ml-2 badge badge-info">
                    {project.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProject
