import { FaBuilding, FaChurch, FaHome, FaUsers } from "react-icons/fa";

import { MdDescription } from "react-icons/md";

const ServiceCard = ({ service }) => {
  const {
    service_name: serviceName,
    cost,
    unit,
    category,
    description,
  } = service;

  const categoryIcons = {
    home: <FaHome className="text-blue-500" />,
    wedding: <FaChurch className="text-pink-500" />,
    office: <FaBuilding className="text-gray-500" />,
    seminar: <FaUsers className="text-green-500" />,
    meeting: <FaUsers className="text-purple-500" />,
  };

  return (
    <div className="relative group w-full max-w-[300px] aspect-[1/1.1] flex items-center justify-center mx-auto">
      <div
        className="absolute inset-0 bg-red-100 opacity-60 transition-transform duration-500 group-hover:scale-105"
        style={{
          clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
          borderRadius: "20%",
        }}
      />
      <div
        className="relative w-[88%] h-[88%] bg-white shadow-lg flex flex-col items-center justify-center p-6 text-center transition-all duration-300 group-hover:shadow-2xl"
        style={{
          clipPath:
            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        }}
      >
        <div className="text-3xl mb-3 text-slate-700">
          {categoryIcons[category]}
        </div>

        <h2 className="text-slate-800 text-base md:text-lg font-black uppercase tracking-widest">
          {serviceName}
        </h2>

        <p className="text-[12px] text-slate-400 mt-2 line-clamp-2 px-4">
          {description}
        </p>

        <div className="mt-4 pt-3 border-t border-slate-50 w-2/3">
          <div className="text-lg font-bold text-red-500">
            ৳{cost}
            <span className="text-[10px] text-slate-400 font-normal uppercase ml-1">
              Per: {unit} sqr
            </span>
          </div>
        </div>
        <div className="absolute bottom-2 bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold border border-red-100">
          {category}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
