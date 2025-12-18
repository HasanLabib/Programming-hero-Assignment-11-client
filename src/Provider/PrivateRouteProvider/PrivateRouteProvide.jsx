import React, { use } from "react";
import { AuthContext } from "../AuthContext";
import { Navigate, useLocation } from "react-router";
import { ClimbingBoxLoader } from "react-spinners";

const PrivateRouteProvide = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  console.log(location);

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <ClimbingBoxLoader color="#e74c3c" />
      </div>
    );
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRouteProvide;
