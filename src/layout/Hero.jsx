import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "StyleDecor: Your Dream Decorations",
      subtitle: "Modern, Stylish, and Personalized",
      description:
        "Book in-studio consultations or on-site decoration services for your home or ceremony. Explore decoration packages, check availability, and schedule appointments easily.",
      buttonText: "Explore Services",
      buttonLink: "/services",
      bgImage: "https://plus.unsplash.com/premium_photo-1673467102798-a3cd74727a0c?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      accentColor: "text-teal-400",
      buttonColor: "bg-teal-400 hover:bg-teal-500",
    },
    {
      id: 2,
      title: "Expert Decorators at Your Service",
      subtitle: "In-Studio & On-Site Options",
      description:
        "Select a date & time, choose a service mode, and let our professional decorators handle everything. Track your service status in real-time.",
      buttonText: "Book Now",
      buttonLink: "/booking",
      bgImage: "https://plus.unsplash.com/premium_photo-1663099598927-4d0db938250d?q=80&w=1706&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      accentColor: "text-violet-400",
      buttonColor: "bg-violet-400 hover:bg-violet-500",
    },
    {
      id: 3,
      title: "Transform Your Space",
      subtitle: "Memorable Decorations for Every Occasion",
      description:
        "From weddings to home celebrations, our curated decoration packages make every event unforgettable. Payments and tracking are seamless and secure.",
      buttonText: "View Packages",
      buttonLink: "/packages",
      bgImage:"https://plus.unsplash.com/premium_photo-1664471482255-5a26bf122a82?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      accentColor: "text-amber-400",
      buttonColor: "bg-amber-400 hover:bg-amber-500",
    },
  ];

  return (
    <div>
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="mySwiper carousel w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="carousel-item relative w-full">
            <div className="relative w-full h-[80vh] overflow-hidden">
              <img
                src={slide.bgImage}
                className="absolute inset-0 w-full h-full object-cover"
                alt={slide.title}
              />
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 flex items-center h-full">
                <div className="flex flex-col w-11/12 mx-auto text-center md:text-start p-6 md:p-10 gap-4">
                  <p className={`${slide.accentColor} font-black`}>StyleDecor</p>
                  <h1 className={`font-extrabold text-white text-2xl md:text-4xl lg:text-6xl my-5 leading-tight`}>
                    {slide.title} <br />
                    <span className={`font-light ${slide.accentColor}`}>{slide.subtitle}</span>
                  </h1>
                  <p className="text-sm md:text-base text-gray-200">{slide.description}</p>
                  <div className="mt-6 flex justify-center md:justify-start gap-4">
                    <a
                      href={slide.buttonLink}
                      className={`${slide.buttonColor} text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300`}
                    >
                      {slide.buttonText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
