"use client";
import { Textarea } from "@/components/ui/textarea";
import Bottom from "../../../components/b-arrow";
import Camera from "../../../components/Camera";
import Coffee from "../../../components/Coffee";
import Heart from "../../../components/Heart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function Home() {
  const [cover, setCover] = useState<{
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

  const CoverChange = () => {
    if (cover.image === null) {
      return (
        <label
          htmlFor="file-upload"
          className="cursor-pointer px-6 py-3 bg-black text-white rounded-lg flex items-center space-x-2 w-[200px]"
        >
          <Camera />
          <p className="font-[500] text-[14px] leading-[20px] font-sans">
            Add a cover image
          </p>
        </label>
      );
    } else {
      return (
        <div className="flex gap-2 justify-end mr-[50px] mt-[20px]">
          <button
           onClick={handleSetCoverImage}
           className="w-[126px] h-[40px] bg-[#18181B] flex justify-center items-center text-[white] rounded-md">
            Save Changes
          </button>
          <button
            onClick={CancelCover}
            className="w-[79px] h-[40px] bg-[#F4F4F5] flex justify-center items-center rounded-md"
          >
            Cancel
          </button>
        </div>
      );
    }
  };

  const CancelCover = () => {
    setCover((prev) => ({ ...prev, image: null }));
  };
  const handleSetCoverImage = () => {
    return (
      <div className="flex gap-2 justify-end mr-[50px] mt-[20px] w-[149px] h-[40px] bg-[#F4F4F5] rounded-md">
        <Camera />
        Change Cover
      </div>
    );
  };
  const CancelProfile = () => {
    setProfile((prev) => ({ ...prev, image: null }));
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "buy_me_coffee");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dabc04pmm/upload`,
        { method: "POST", body: data }
      );
      const dataJson = await response.json();

      setCover((prev) => ({ ...prev, image: dataJson.secure_url }));
    }
  };
  const handleProfile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "buy_me_coffee");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dabc04pmm/upload`,
        { method: "POST", body: data }
      );
      const dataJson = await response.json();

      setProfile((prev) => ({ ...prev, image: dataJson.secure_url }));
    }
  };

  const onClick = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCover((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <header className="w-full h-[56px] bg-[#FFFFFF] flex items-center justify-between">
        <div className="w-[151px] h-[24px] ml-10">
          <img src="Logo.png" />
        </div>
        <div className="flex items-center space-x-4 mr-10">
          <div
            className="w-[40px] h-[40px]"
            style={{
              backgroundImage: `url(${profile.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
            }}
          ></div>
          <p className="text-black">Jake</p>
          <Bottom />
        </div>
      </header>
      <div
        className={`flex flex-col w-full h-[319px] bg-[#F4F4F5] ${
          !cover.image && " justify-center items-center "
        }`}
        style={{
          backgroundImage: `url(${cover.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {<CoverChange />}
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
                <div
                  className="w-[40px] h-[40px]"
                  style={{
                    backgroundImage: `url(${profile.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "50%",
                  }}
                ></div>
                <p className="text-black font-[700] text-[20px] leading-[20px]">
                  Jake
                </p>
              </div>
              <Dialog>
                <DialogTrigger className="w-[96px] h-[40px] bg-[#F4F4F5] rounded-md">
                  <p className="font-[500]">Edit Page</p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done
                    </DialogDescription>
                  </DialogHeader>
                  <p>Add Photo</p>
                  <label
                    htmlFor="profile-upload"
                    className="cursor-pointer w-[160px] h-[160px] bg-[#F4F4F5] rounded-lg flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${profile.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "50%",
                    }}
                  ></label>
                  <input
                    id="profile-upload"
                    type="file"
                    className="hidden"
                    onChange={handleProfile}
                  />
                  <div className="mt-10">
                    <p>Name</p>
                    <input
                      type="text"
                      className="w-[460px] h-[40px] border-[1px] rounded-md p-3"
                    />
                  </div>
                  <p className="mb-[-15px]">About</p>
                  <Textarea />
                  <p className="mb-[-15px]">Social Media URL</p>
                  <input
                    type="text"
                    className="w-[460px] h-[40px] border-[1px] rounded-md p-3"
                  />

                  <div className="flex gap-2 justify-end">
                    <DialogClose 
                    onClick = {CancelProfile}
                    className="w-[79px] h-[40px] bg-[#F4F4F5] rounded-md flex justify-center items-center">
                      Cancel
                    </DialogClose>
                    <button className="w-[126px] h-[40px] bg-[#18181B] text-[white] rounded-md flex justify-center items-center">
                      Save Changes
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
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
            <button className="w-[72px] h-[40px] bg-[#F4F4F5] rounded-md flex items-center justify-center gap-2">
              <Coffee />
              <p className="font-[500] text-[14px]">$1</p>
            </button>
            <button className="w-[72px] h-[40px] bg-[#F4F4F5] rounded-md flex items-center justify-center gap-2">
              <Coffee />
              <p className="font-[500] text-[14px]">$2</p>
            </button>
            <button className="w-[72px] h-[40px] bg-[#F4F4F5] rounded-md flex items-center justify-center gap-2">
              <Coffee />
              <p className="font-[500] text-[14px]">$5</p>
            </button>
            <button className="w-[72px] h-[40px] bg-[#F4F4F5] rounded-md flex items-center justify-center gap-2">
              <Coffee />
              <p className="font-[500] text-[14px]">$10</p>
            </button>
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
            <Textarea placeholder="Please write your message here" />
          </div>
          <div className="w-[580px] h-[40px] bg-[#cbcbcb] rounded-md mt-6 flex items-center justify-center">
            <p className="text-[#FAFAFA] font-[500]">Support</p>
          </div>
        </div>
      </div>
    </>
  );
}
