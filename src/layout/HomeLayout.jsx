import React, { useEffect } from "react";

import { Outlet, useLocation } from "react-router";
import Aos from "aos";
import { AnimatePresence, motion } from "framer-motion";

import NavBar from "../Components/NavBar/NavBar";

const HomeLayout = () => {
  const location = useLocation();

  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <section className="nav-section">
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>
      </section>
      <section className=" flex-1">
        <main>
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
        </main>
      </section>
      <section>
        {/* <Footer /> */}
      </section>
    </div>
  );
};

export default HomeLayout;
