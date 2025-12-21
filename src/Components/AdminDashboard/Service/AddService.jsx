import React, { use, useContext } from "react";

import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthContext";
import { Navigate, useNavigate } from "react-router";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleAddService = async (e) => {
    e.preventDefault();
    const form = e.target;

    const service_name = form.service_name.value;
    const cost = Number(form.cost.value);
    const unit = form.unit.value;
    const category = form.category.value;
    const description = form.description.value;
    const createdByEmail = user.email;
    const createdAt = new Date();

    const serviceData = {
      service_name,
      cost,
      unit,
      category,
      description,
      createdByEmail,
      createdAt,
    };

    try {
      await axiosSecure.post("/admin/services", serviceData);
      toast.success("Service added successfully");
      form.reset();
      navigate(-1)
    } catch (error) {
      toast.error("Failed to add service");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center mt-5 px-3 sm:px-6">
      <form
        onSubmit={handleAddService}
        className="fieldset bg-base-200 shadow-xl flex flex-col border-base-300 rounded-box w-full max-w-md border p-6 sm:p-8"
      >
        <legend className="fieldset-legend text-lg font-semibold text-center mb-4">
          Add Decoration Service
        </legend>

        <label className="label">Service Name</label>
        <input
          type="text"
          name="service_name"
          className="input input-bordered w-full"
          placeholder="Enter service name"
          required
        />

        <label className="label">Cost (BDT)</label>
        <input
          type="number"
          name="cost"
          className="input input-bordered w-full"
          placeholder="Enter cost"
          required
        />

        <label className="label">Unit</label>
        <input
          type="text"
          name="unit"
          className="input input-bordered w-full"
          placeholder="e.g., per sq-ft, per floor"
          required
        />

        <label className="label">Category</label>
        <select
          name="category"
          className="select select-bordered w-full"
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
          placeholder="Enter service description"
          rows="4"
          required
        ></textarea>

        <button className="btn btn-neutral mt-4 w-full">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;
