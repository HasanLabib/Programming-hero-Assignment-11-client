import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";
import { AuthContext } from "../Provider/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  setInterval(() => {
    setLoading(false);
  }, 1500);

  const { displayName, email, photoURL } = user || {};
  console.log(user);
  return loading ? (
    <div className="h-[97vh] flex items-center justify-center">
      <ClimbingBoxLoader color="#e74c3c" />
    </div>
  ) : (
    <div className="w-11/12 mx-auto mt-10 shadow-2xl p-6 flex flex-col ">
      <figure className="w-[30%]">
        <img src={photoURL} />
      </figure>
      <div className="flex flex-col space-y-5">
        <p className="font-bold text-3xl">Name: {displayName}</p>
        <p className="font-light text-xl">Email: {email}</p>
        <Link
          to={`update`}
          className="btn btn-primary bg-amber-600 border-none"
        >
          Update Profile
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
