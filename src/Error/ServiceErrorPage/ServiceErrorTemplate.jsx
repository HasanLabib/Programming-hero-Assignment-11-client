import React from "react";
const errorImage = "../../../assets/error-404.png";
const ServiceErrorTemplate = () => {
  return (
    <>
      <img src={errorImage} alt="App Error" />
      <h1 className="text-5xl font-bold mt-4 text-center">
        OPPS!! Service NOT FOUND!
      </h1>
      <p className="text-center mt-4">
        The Service you are requesting is not found on our system. Please try
        again.
      </p>
    </>
  );
};

export default ServiceErrorTemplate;
