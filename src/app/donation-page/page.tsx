"use client";
import Bottom from "../../../components/b-arrow";
import Camera from "../../../components/Camera";
import Coffee from "../../../components/Coffee";
import Heart from "../../../components/Heart";
import { useState } from "react";

export default function Home() {
  const [profile, setProfile] = useState<{
    image: string | null;
    name: string;
    about: string;
    socialmedia: string;
  }>({
    image: null,
    name: "",
    about: "",
    socialmedia: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "buy-me-coffee");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dv7rj66a1/upload`,
        { method: "POST", body: data }
      );
      const dataJson = await response.json();

      setProfile((prev) => ({ ...prev, image: dataJson.secure_url }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <header className="w-full h-[56px] bg-[#FFFFFF] flex items-center justify-between">
        <div className="w-[151px] h-[24px] ml-10">
          <img src="Logo.png" />
        </div>
        <div className="flex items-center space-x-4 mr-10">
          <img src="Avatar.png" className="w-[40px] h-[40px] rounded-full" />
          <p className="text-black">Jake</p>
          <Bottom />
        </div>
      </header>
      <div className="flex flex-col items-center justify-center w-full h-[319px] bg-[#F4F4F5]">
        <label
          htmlFor="file-upload"
          className="cursor-pointer px-6 py-3 bg-black text-white rounded-lg flex items-center space-x-2"
        >
          <Camera />
          <p className="font-[500] text-[14px] leading-[20px] font-sans">
            Add a cover image
          </p>
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
      <div className="flex justify-center">
        <div className="relative top-[-80px]">
          <div className="w-[632px] h-[233px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5 bg-[#FFFFFF]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="Avatar.png"
                  className="w-[48px] h-[48px] rounded-full"
                />
                <p className="text-black font-[700] text-[20px] leading-[20px]">
                  Jake
                </p>
              </div>
              <button className="w-[96px] h-[40px] bg-[#F4F4F5] rounded-md flex items-center justify-center">
                <p className="font-[500] text-[14px] leading-[20px]">
                  Edit page
                </p>
              </button>
            </div>
            <div className="w-full h-[1px] border-[1px] mt-6"></div>
            <div className="mt-6">
              <p className="font-[600] text-[16px] leading-[24px]">
                About Jake
              </p>
              <p className="mt-3">
                I'm a typical person who enjoys exploring different things. I
                also make music art a hobby. Follow me along.
              </p>
            </div>
          </div>
          <div className="w-[632px] h-[116px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5 bg-[#FFFFFF]">
            <p className="font-[600] text-[16px]">Social Media URL</p>
            <p className="mt-3">https://buymeacoffee.com/spacerulz44</p>
          </div>
          <div className="w-[632px] h-[236px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5 bg-[#FFFFFF]">
            <p className="font-[600] text-[16px]">Recent Supporters</p>

            <div className="w-[584px] h-[140px] border-[1px] rounded-lg mt-5">
              <div className="flex items-center gap-4 flex-col h-full justify-center">
                <Heart />
                <p className="font-[600]">Be the first one to support Jake</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[628px] h-[509px] bg-[#FFFFFF] border-[1px] rounded-lg relative top-[-60px] p-7">
          <p className="font-[600] text-[24px]">Buy Jake a Coffee</p>
          <p className="mt-5">Select Amount:</p>
          <div className="flex gap-[8px]">
            <div className="w-[72px] h-[40px] bg-[#F4F4F5] rounded-md flex items-center justify-center gap-2">
              <Coffee />
              <p className="font-[500] text-[14px]">$1</p>
            </div>
            <div className="w-[72px] h-[40px] bg-[#F4F4F5] rounded-md flex items-center justify-center gap-2">
              <Coffee />
              <p className="font-[500] text-[14px]">$2</p>
            </div>
            <div className="w-[72px] h-[40px] bg-[#F4F4F5] rounded-md flex items-center justify-center gap-2">
              <Coffee />
              <p className="font-[500] text-[14px]">$5</p>
            </div>
            <div className="w-[72px] h-[40px] bg-[#F4F4F5] rounded-md flex items-center justify-center gap-2">
              <Coffee />
              <p className="font-[500] text-[14px]">$10</p>
            </div>
          </div>
          <div>
            <p className="font-[500] mt-5 mb-2">
              Enter BuyMeCoffee or social account URL:
            </p>
            <input
              type="text"
              placeholder="buymeacoffee.com"
              className="border-[1px] w-[580px] h-[40px] p-5 rounded-md"
            />
          </div>
          <div>
            <p className="font-[500] mt-5 mb-2">Special Message:</p>
            <input
              type="text"
              placeholder="Please write your message here"
              className="border-[1px] w-[580px] h-[131px] p-5 rounded-md"
            />
          </div>
          <div className="w-[580px] h-[40px] bg-[#cbcbcb] rounded-md mt-6 flex items-center justify-center">
            <p className="text-[#FAFAFA] font-[500]">Support</p>
          </div>
        </div>
      </div>
    </>
  );
}
