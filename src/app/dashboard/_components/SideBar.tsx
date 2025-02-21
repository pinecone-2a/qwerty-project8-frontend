"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Store } from "lucide-react";
import { PanelsTopLeft } from "lucide-react";
import { Shapes } from "lucide-react";
import { Settings } from "lucide-react";

const fadeScaleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function Sidebar() {
  return (
    <div className="w-1/4  flex flex-col items-center gap-3 ">
      <Link href={"/dashboard/home-page"}>
        <div className="mr-5 w-[300px] h-[42px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] flex items-center pl-4 focus:bg-[#F4F4F5] gap-4 active:bg-[#F4F4F5]">
          Home
        </div>
      </Link>
      <Link href={"/dashboard/explore"}>
        <div className="mr-5 w-[300px] h-[42px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] flex items-center pl-4 gap-4">
          Explore
        </div>
      </Link>
      <Link href={"/dashboard/viewpage"}>
        <div className="mr-5 w-[300px] h-[42px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] flex items-center pl-4 gap-4">
          View page
        </div>
      </Link>
      <Link href={"/dashboard/accountSettings"}>
        <div className="mr-5 w-[300px] h-[42px] rounded-md bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] flex items-center pl-4 gap-4">
          Account Settings
        </div>
      </Link>
    </div>
  );
}
