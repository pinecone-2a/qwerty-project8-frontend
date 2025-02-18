"use client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { set, z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Heart from "../../../../components/Heart";
import Coffee from "../../../../components/Coffee";

export default function Donation() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const isFormComplete =
    selectedAmount !== null && url.trim() !== "" && message.trim() !== "";

  const [cover, setCover] = useState("");
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [socialmedia, setSocialmedia] = useState("https://");

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
      setProfile(dataJson.secure_url);
    }
  };
  async function editProfile() {
    await fetch("http://localhost:8000/profile/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
        avatarImage: profile,
        socialMediaURL: socialmedia,
        backgroundImage: cover,
      }),
    });
  }

  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch("http://localhost:8000/profile/1");
      const data = await response.json();
      setProfile(data[0].avatarImage);
      setName(data[0].name);
      setAbout(data[0].about);
      setSocialmedia(data[0].socialMediaURL);
    }
    fetchProfile();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="relative top-[-80px]">
        <div className="w-[632px] h-[233px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5 bg-[#FFFFFF]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-[40px] h-[40px]"
                style={{
                  backgroundImage: `url(${profile})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "50%",
                }}
              ></div>
              <p className="text-black font-[700] text-[20px] leading-[20px]">
                {name}
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
                <form action={editProfile}>
                  <label
                    htmlFor="profile-upload"
                    className="cursor-pointer w-[160px] h-[160px] bg-[#F4F4F5] rounded-lg flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${profile})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "50%",
                    }}
                  ></label>
                  <input
                    name="profile-upload"
                    id="profile-upload"
                    type="file"
                    className="hidden"
                    onChange={handleProfile}
                  />
                  <div className="mt-10">
                    <p>Name</p>
                    <input
                      name="name"
                      type="text"
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-[460px] h-[40px] border-[1px] rounded-md p-3"
                    />
                  </div>
                  <p className="mb-[5px] mt-[5px]">About</p>
                  <Textarea
                    name="about"
                    defaultValue={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  <p className="mb-[5px] mt-[5px]">Social Media URL</p>
                  <input
                    name="socialmedia"
                    type="text"
                    className="w-[460px] h-[40px] border-[1px] rounded-md p-3"
                    defaultValue={socialmedia}
                    onChange={(e) => setSocialmedia(e.target.value)}
                  />
                  <div className="flex gap-2 justify-end mt-[30px]">
                    <DialogClose className="w-[79px] h-[40px] bg-[#F4F4F5] rounded-md flex justify-center items-center">
                      Cancel
                    </DialogClose>
                    <DialogClose
                      onClick={(e) => {
                        const form = e.currentTarget.closest("form"); // Find the nearest form
                        if (form) {
                          const formData = new FormData(form);
                          editProfile();
                        }
                      }}
                      className="w-[126px] h-[40px] bg-[#18181B] text-[white] rounded-md flex justify-center items-center"
                    >
                      Save Changes
                    </DialogClose>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full h-[1px] border-[1px] mt-6"></div>
          <div className="mt-6">
            <p className="font-[600] text-[16px] leading-[24px]">
              About {name}
            </p>
            <p className="mt-3">{about}</p>
          </div>
        </div>
        <div className="w-[632px] h-[116px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5 bg-[#FFFFFF]">
          <p className="font-[600] text-[16px]">Social Media URL</p>
          <p className="mt-3">{socialmedia}</p>
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
      <div className="flex justify-center">
        <div className="w-[628px] h-[509px] bg-[#FFFFFF] border-[1px] rounded-lg relative top-[-60px] p-7">
          <p className="font-[600] text-[24px]">Buy {name} a Coffee</p>
          <p className="mt-5">Select Amount:</p>
          <div className="flex gap-[8px]">
            {[1, 2, 5, 10].map((amount) => (
              <button
                key={amount}
                className={`w-[72px] h-[40px] rounded-md flex items-center justify-center gap-2 border-2 ${
                  selectedAmount === amount
                    ? "border-black"
                    : "border-[#E4E4E7]"
                }`}
                onClick={() => setSelectedAmount(amount)}
              >
                <Coffee />
                <p className="font-[500] text-[14px]">${amount}</p>
              </button>
            ))}
          </div>
          <div>
            <p className="font-[500] mt-5 mb-2">
              Enter BuyMeCoffee or social account URL:
            </p>
            <input
              type="text"
              placeholder="buymeacoffee.com"
              className="border-[1px] w-[580px] h-[40px] p-5 rounded-md outline-none"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <p className="font-[500] mt-5 mb-2">Special Message:</p>
            <Textarea
              placeholder="Please write your message here"
              value={message || ""} // Prevent undefined
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            className={`w-[580px] h-[40px] rounded-md mt-6 flex items-center justify-center ${
              isFormComplete
                ? "bg-[#18181B] text-white"
                : "bg-[#cbcbcb] text-[#FAFAFA]"
            }`}
            disabled={!isFormComplete}
          >
            Support
          </button>
        </div>
      </div>
    </div>
  );
}
