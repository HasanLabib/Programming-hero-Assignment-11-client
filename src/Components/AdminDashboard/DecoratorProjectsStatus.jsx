import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const STATUS_FLOW = [
  "Assigned",
  "Planning Phase",
  "Materials Prepared",
  "On the Way to Venue",
  "Setup in Progress",
  "Completed",
];

const DecoratorProjectsStatus = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const res = await axiosSecure.get(`/decorator/projects/${user.email}`);
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, [user?.email]);

  const updateStatus = async (project) => {
    const currentIndex = STATUS_FLOW.indexOf(project.serviceProgress);
    const nextStatus = STATUS_FLOW[currentIndex + 1];

    if (!nextStatus) return;

    await axiosSecure.patch(`/decorator/update-status/${project._id}`, {
      nextStatus,
    });

    loadProjects();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Assigned Projects</h2>

      {projects.length === 0 ? (
        <p>No projects assigned.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => {
            const currentIndex = STATUS_FLOW.indexOf(project.serviceProgress);
            const nextStatus = STATUS_FLOW[currentIndex + 1];

            return (
              <div key={project._id} className="card bg-base-100 shadow">
                <div className="card-body">
                  <h3 className="card-title">{project.service_name}</h3>

                  <p>
                    <strong>Client:</strong> {project.userEmail}
                  </p>

                  <p>
                    <strong>Status:</strong>
                    <span className="badge badge-info ml-2">
                      {project.serviceProgress}
                    </span>
                  </p>

                  {nextStatus ? (
                    <button
                      onClick={() => updateStatus(project)}
                      className="btn btn-sm btn-primary mt-3"
                    >
                      Move to “{nextStatus}”
                    </button>
                  ) : (
                    <span className="badge badge-success mt-3">Completed</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DecoratorProjectsStatus;
