import useAxiosSecure from "../../hooks/useAxiosSecure";

const DecoratorTable = ({ decorator, reload }) => {
  const axiosSecure = useAxiosSecure();

  const toggleStatus = () => {
    const newStatus =
      decorator?.status === "approved" ? "disabled" : "approved";

    axiosSecure
      .patch(`/admin/decorator-status/${decorator?.email}`, {
        status: newStatus,
      })
      .then(() => reload());
  };

  return (
    <tr>
      <td>{decorator?.name}</td>
      <td>{decorator?.email}</td>
      <td>
        <span
          className={`badge ${
            decorator?.status === "approved" ? "badge-success" : "badge-error"
          }`}
        >
          {decorator?.status}
        </span>
      </td>
      <td>
        <button onClick={toggleStatus} className="btn btn-xs">
          Toggle
        </button>
      </td>
    </tr>
  );
};

export default DecoratorTable;
