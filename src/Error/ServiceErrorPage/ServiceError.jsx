import { useNavigate } from "react-router";
import ServiceErrorTemplate from "./ServiceErrorTemplate";

const ServiceError = () => {
  let navigate = useNavigate();
  return (
    <div className="grow flex flex-col items-center justify-center">
      <ServiceErrorTemplate />
      <button
        onClick={() => navigate(-1)}
        className="my-4 btn bg-gradient-to-br from-[#e3bf2e] to-[#f2e662] text-white border-none w-fit"
      >
        Go back!
      </button>
    </div>
  );
};

export default ServiceError;
