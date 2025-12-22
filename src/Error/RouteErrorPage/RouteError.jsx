import React from "react";

import { Link, Navigate, useNavigate } from "react-router";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import errorImage from "../../assets/error-404.png";

const RouteError = () => {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="grow flex flex-col items-center justify-center">
        <img src={errorImage} alt="404 Error" className="w-[40%]" />
        <h1 className="text-5xl font-bold mt-4 text-center">
          Oops, page not found!
        </h1>
        <p className="text-center mt-4">
          The page you are looking for is not available.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="my-4 btn bg-gradient-to-br from-[#e3bf2e] to-[#f2e662] text-slate-700 border-none w-fit"
        >
          Go back!
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default RouteError;
