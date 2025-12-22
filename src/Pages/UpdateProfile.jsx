import React, { use, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

const UpdateProfile = () => {
  const [loadingSpin, setLoadingSpin] = useState(true);
  setInterval(() => {
    setLoadingSpin(false);
  }, 500);
  const navigate = useNavigate();

  const { user, updateUser, setUser, setLoading } = useContext(AuthContext);
  const form = useRef(null);
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.files[0];
    // const password = e.target.password?.value;
    //const Email = e.target.email?.value;

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      {
        image: photo,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const photoUrl = res.data.data.display_url;
    const userData = {
      displayName: name,
      photoURL: photoUrl,
    };
    updateUser(userData)
      .then(() => {
        setUser({
          ...user,
          displayName: name,
          photoURL: photoUrl,
        });
        const mongoData = {
          name: name,
          photoUrl: photoUrl,
          // ...(password && { password: password }),
          // ...(Email && { email: Email }),
        };
        axiosSecure.put(`/users/update/${user?.email}`, mongoData);
        navigate(-1);
        setLoading(false);
        form.current.reset();
      })
      .catch((error) => console.log(error));
  };
  return loadingSpin ? (
    <div className="h-[97vh] flex items-center justify-center">
      <ClimbingBoxLoader color="#e74c3c" />
    </div>
  ) : (
    <section className="w-11/12 mx-auto flex-col  items-center-safe justify-center-safe place-content-center-safe place-items-center-safe ">
      <section className="flex-1 text-center  py-5 ">
        <h1 className="text-3xl md:text-4xl font-black text-[rgb(26, 30, 33)]">
          Update Your Profile
        </h1>
        <p className="text-[0.9rem] text-[rgb(50, 52, 55)]">
          It's so Satisfying
        </p>
      </section>
      <section className="flex-1 ">
        <form
          onSubmit={handleUpdate}
          ref={form}
          className="space-y-4 w-full bg-[#fff6c8] "
        >
          <fieldset className="fieldset  rounded-box  border p-7">
            <legend className="fieldset-legend">Update Profile</legend>

            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="input rounded-2xl p-6 w-full"
              required
              aria-required
            />
            <div>
              <label className="label">Photo</label>
              <input
                type="file"
                name="photo"
                placeholder="Your photo here"
                className="input rounded-2xl p-6 w-full"
                required
                aria-required
              />
            </div>
            <button className="btn btn-neutral bg-amber-600 mt-4">
              Update
            </button>
          </fieldset>
        </form>
      </section>
    </section>
  );
};

export default UpdateProfile;
