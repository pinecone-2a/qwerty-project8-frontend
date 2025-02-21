"use client";

import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./_components/Navigation";
import Sidebar from "./_components/SideBar";
import HomePage from "./_components/homePage";

const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function HomePageDefault() {
  return (
    <div>
      <Navigation />
      <div className="flex mt-20 ">
        <Sidebar />
        <AnimatePresence>
          <motion.div
            key="home"
            variants={fadeScaleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <HomePage />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
