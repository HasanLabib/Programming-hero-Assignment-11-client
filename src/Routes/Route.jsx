import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import DashboardContent from "../Components/Dashboard/DashboardContent";
import ServiceAnalytics from "../Components/Dashboard/ServiceAnalytics";
import Revenue from "../Components/Dashboard/Revenue";
import DecoratorApproval from "../Components/Dashboard/DecoratorApproval";
import PaymentStatus from "../Components/Dashboard/PaymentStatus";
import AssignDecorator from "../Components/Dashboard/AssignDecorator";
import Bookings from "../Components/Dashboard/Bookings";
import ManageServices from "../Components/Dashboard/ManageServices";
import ManageDecorators from "../Components/Dashboard/ManageDecorators";
import SignUp from "../Pages/SignUp/SignUp";

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
      ],
    },
    {
      path: "dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "dashboard",
          element: <DashboardContent />,
        },
        {
          path: "decorators",
          element: <ManageDecorators />,
        },
        {
          path: "services",
          element: <ManageServices />,
        },
        {
          path: "bookings",
          element: <Bookings />,
        },
        {
          path: "assign-decorator",
          element: <AssignDecorator />,
        },
        {
          path: "payments",
          element: <PaymentStatus />,
        },
        {
          path: "decorator-approval",
          element: <DecoratorApproval />,
        },
        {
          path: "revenue",
          element: <Revenue />,
        },
        {
          path: "analytics",
          element: <ServiceAnalytics />,
        },
      ],
    },
  ]);
