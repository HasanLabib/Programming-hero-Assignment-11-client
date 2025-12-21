import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";

const EditService = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/services/${id}`)
      .then((res) => setService(res.data))
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  const handleEditService = async (e) => {
    e.preventDefault();
    const form = e.target;

    const serviceData = {
      service_name: form.service_name.value,
      cost: Number(form.cost.value),
      unit: form.unit.value,
      category: form.category.value,
      description: form.description.value,
      createdByEmail: user.email,
      updatedAt: new Date(),
    };

    try {
      await axiosSecure.put(`/services/edit/${id}`, serviceData);
      toast.success("Service updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update service");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-5 px-3 sm:px-6">
      <form
        onSubmit={handleEditService}
        className="fieldset bg-base-200 shadow-xl flex flex-col border-base-300 rounded-box w-full max-w-md border p-6 sm:p-8"
      >
        <legend className="fieldset-legend text-lg font-semibold text-center mb-4">
          Edit Decoration Service
        </legend>

        <label className="label">Service Name</label>
        <input
          type="text"
          name="service_name"
          className="input input-bordered w-full"
          defaultValue={service?.service_name || ""}
          required
        />

        <label className="label">Cost (BDT)</label>
        <input
          type="number"
          name="cost"
          className="input input-bordered w-full"
          defaultValue={service?.cost || ""}
          required
        />

        <label className="label">Unit</label>
        <input
          type="text"
          name="unit"
          className="input input-bordered w-full"
          defaultValue={service?.unit || ""}
          required
        />

        <label className="label">Category</label>
        <select
          name="category"
          className="select select-bordered w-full"
          defaultValue={service?.category || ""}
          required
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="home">Home</option>
          <option value="wedding">Wedding</option>
          <option value="office">Office</option>
          <option value="seminar">Seminar</option>
          <option value="meeting">Meeting</option>
        </select>

        <label className="label">Description</label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full resize-none"
          rows="4"
          defaultValue={service?.description || ""}
          required
        ></textarea>

        <button className="btn btn-neutral mt-4 w-full">Update Service</button>
      </form>
    </div>
  );
};

export default EditService;
