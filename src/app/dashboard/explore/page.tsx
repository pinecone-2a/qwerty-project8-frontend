"use client";

import Explore from "./explorePage";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "../_components/Navigation";
import Sidebar from "../_components/SideBar";
const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};
// const cookies = useCookies();
// const accessToken = cookies.get("accessToken") || "";
// const { userId } = jwtDecode(accessToken) as JwtPayload & {
//   userId: string;
// };
// console.log(userId);

export default function ExpPage() {
  return (
    <div>
      <Navigation />
      <div className="flex mt-20 gap-28">
        <Sidebar />
        <AnimatePresence>
          <motion.div
            key="explore"
            variants={fadeScaleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Explore />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
