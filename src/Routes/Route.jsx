import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import SignUp from "../Pages/SignUp/SignUp";
import Service from "../Components/AdminDashboard/Service/Service";
import AddService from "../Components/AdminDashboard/Service/AddService";
import EditService from "../Components/AdminDashboard/Service/EditService";
import Login from "../Pages/Login/Login";

export const route = () =>
  createBrowserRouter([
    {
      path: "/",
      Component: App,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: "/signup",
          Component: SignUp,
        },
        {
          path: "/login",
          Component: Login,
        }
      ],
    },
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "services",
          element: <Service />,
        },
        {
          path: "services/add",
          element: <AddService />,
        },
        {
          path: "services/edit/:id",
          element: <EditService />,
        }
      ],
    },
  ]);
