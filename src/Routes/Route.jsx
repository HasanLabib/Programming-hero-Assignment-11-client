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
import Profile from "../Pages/Profile";
import UpdateProfile from "../Pages/UpdateProfile";
import ServiceCard from "../Components/GivenServices/ServiceCard";
import ServiceSection from "../Components/GivenServices/ServiceSection";
import ServiceDetails from "../Components/GivenServices/ServiceDetails";
import MyBookings from "../Components/MyBookings";
import PaymentSuccess from "../Components/PaymentSuccess";

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
        },
        {
          path: "/all-service",
          Component: ServiceSection,
        },
        {
          path: "/service/:id",
          Component: ServiceDetails,
        },
        {
          path: "payment-success",
          element: <PaymentSuccess />,
        },
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
          path: "bookings/user/:email",
          element: <MyBookings />,
        },
        {
          path: "profile",
          element: <Profile />,
          children: [
            {
              path: "update",
              element: <UpdateProfile />,
            },
          ],
        },
        {
          path: "services/add",
          element: <AddService />,
        },
        {
          path: "services/edit/:id",
          element: <EditService />,
        },
      ],
    },
  ]);
