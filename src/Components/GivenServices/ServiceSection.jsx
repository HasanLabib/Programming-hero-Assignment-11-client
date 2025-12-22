import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import useServiceHook from "../../hooks/useServiceHook";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const ServiceSection = () => {
  const { service: allServices, loading, setLoading } = useServiceHook();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredServices, setFilteredServices] = useState([]);
  const categories = ["all", "home", "wedding", "office", "seminar", "meeting"];
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const AllService = () => {
      setLoading(true);
      if (selectedCategory === "all") {
        setFilteredServices(allServices);
        setLoading(false);
      } else {
        setFilteredServices(
          allServices.filter(
            (service) => service.category.toLowerCase() === selectedCategory
          )
        );
        setLoading(false);
      }
    };
    AllService();
  }, [selectedCategory, allServices, setLoading]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchService = async () => {
        try {
          setLoading(true);
          const minQuery = minPrice ? Number(minPrice) : undefined;
          const maxQuery = maxPrice ? Number(maxPrice) : undefined;

          const res = await axiosSecure.get("/service", {
            params: {
              search: search || "",
              min: minQuery,
              max: maxQuery,
            },
          });
          setFilteredServices(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      if (search.trim() !== "") {
        fetchService();
      } else {
        setFilteredServices(allServices);
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [search, allServices, minPrice, maxPrice, setLoading, axiosSecure]);

  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <section className="services-section w-11/12 mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:flex-[20%]">
          <h2 className="text-xl font-extrabold mb-4">Categories</h2>
          <ul className="flex md:flex-col flex-wrap gap-2">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer px-4 py-2 rounded-lg text-white font-semibold ${
                  selectedCategory === cat
                    ? "bg-amber-600"
                    : "bg-gray-300 text-gray-800 hover:bg-amber-400"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
            className="input input-bordered w-full mx-auto block mt-5"
          />
          <div className="flex justify-between items-center mt-5">
            {" "}
            <input
              type="number"
              placeholder="Min"
              className="input input-bordered w-full input-sm"
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              className="input input-bordered w-full input-sm"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </aside>

        <section className="md:flex-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Link to={`/service/${service._id}`}>
                <ServiceCard key={service._id} service={service} />
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No services available in this category.
            </p>
          )}
        </section>
      </div>
    </section>
  );
};

export default ServiceSection;
