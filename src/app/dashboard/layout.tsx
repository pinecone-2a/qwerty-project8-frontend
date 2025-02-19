import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GrShare } from "react-icons/gr";

const DashboardLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="h-screen text-white p-6 flex ml-5">
      <div className="flex flex-col ml-14 h-screen">
        <Link href="/dashboard/home-page">
          <div className="bg-white w-60 px-4 h-9 text-sm font-medium text-black hover:bg-[#f4f5f5] focus:bg-[#f4f4f5] flex items-center gap-3 rounded-md">
            Home
          </div>
        </Link>
        <Link href="/dashboard/explore">
          <div className="bg-white w-60 px-4 h-9 mt-1 text-sm font-medium text-black hover:bg-[#f4f5f5] focus:bg-[#f4f4f5] flex items-center gap-3 rounded-md">
            Explore
          </div>
        </Link>
        <Link href="/dashboard/view-page">
          <div className="bg-white w-60 px-4 h-9 mt-1 text-sm font-medium text-black hover:bg-[#f4f5f5] focus:bg-[#f4f4f5] flex items-center gap-3 rounded-md">
            View page <GrShare />
          </div>
        </Link>
        <Link href="/dashboard/settings">
          <div className="bg-white w-60 px-4 h-9 mt-1 text-sm font-medium text-black hover:bg-[#f4f5f5] focus:bg-[#f4f4f5] flex items-center gap-3 rounded-md">
            Account settings
          </div>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
