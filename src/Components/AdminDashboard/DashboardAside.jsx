import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import AdminAside from "./AdminAside";
import UserAside from "./UserAside";
import DecoratorAside from "./DecoratorAside";
import { AuthContext } from "../../Provider/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const navItemClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg transition ${
    isActive
      ? "bg-amber-500 text-white font-semibold"
      : "text-gray-300 hover:bg-gray-700"
  }`;

const DashboardAside = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        const userRes = await axiosSecure.get(`/users/${user?.email}`);
        console.log("Fetched user role:", userRes?.data.role);
        setUserRole(userRes?.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchUserRole();
    }
  }, [user, axiosSecure]);

  if (!user) return null;

  if (userRole === "admin") {
    return <AdminAside navItemClass={navItemClass} />;
  }

  if (userRole === "decorator") {
    return <DecoratorAside navItemClass={navItemClass} />;
  }

  return <UserAside navItemClass={navItemClass} />;
};

export default DashboardAside;
