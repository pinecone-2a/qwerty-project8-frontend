"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useCookies } from "next-client-cookies";
// import { jwtDecode } from "jwt-decode";
import { useEffect, useId, useState } from "react";
// import { decodeToken } from "@/middleware";
import { JwtPayload } from "jwt-decode";
import { DonorInfo } from "./donorInfo";
import Card from "./Card";
type Data = {
  avatarImage: string;
  name: string;
  socialMediaURL: string;
};
export default function HomePage() {
  const userId: number = 2;

  const [data, setData] = useState<Data>();
  const [donations, setDonations] = useState<any>([]);
  const [totalDonation, setTotalDonation] = useState<any>();
  const totalEarnings = totalDonation?.totalEarnings;
  async function getFetchData() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  async function getDonationData() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/${userId}`)
      .then((res) => res.json())
      .then((data) => setDonations(data));
  }
  async function getTotalDonation() {
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/donation/total-earnings/${userId}`
    )
      .then((res) => res.json())
      .then((data) => setTotalDonation(data));
  }

  useEffect(() => {
    if (userId) {
      getFetchData();
      getDonationData();
      getTotalDonation();
    }
  }, [userId]);

  return (
    <div className="ml-[180px] text-black">
      <div className="flex justify-center items-center flex-col w-[100%]">
        <Card data={data} totalEarning={totalEarnings} />
        <div>
          <div className="flex justify-between mt-5 items-center">
            <p className="text-2xl font-semibold">Recent transactions</p>
            <Select>
              <SelectTrigger className="w-[150px] py-5 border-[#E4E4E7] rounded-full">
                <SelectValue placeholder="Amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one dollar">1$</SelectItem>
                <SelectItem value="two dollar">2$</SelectItem>
                <SelectItem value="five dollar">5$</SelectItem>
                <SelectItem value="ten dollar">10$</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[1000px]  flex flex-wrap gap-12">
            {donations?.slice(0.6).map((donation: any) => (
              <DonorInfo key={donation.id} donation={donation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
