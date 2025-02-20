"use client";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
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

interface DonationProps {
  profile: string;
  name: string;
  about: string;
  socialmedia: string;
}

export default function Donation({
  profile,
  name,
  about,
  socialmedia,
}: DonationProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [currentProfile, setCurrentProfile] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentAbout, setCurrentAbout] = useState("");
  const [currentSocialMedia, setCurrentSocialMedia] = useState<string>(
    socialmedia || ""
  );
  const [user, setUser] = useState<string | null>(null);

  const isFormComplete =
    selectedAmount !== null && url.trim() !== "" && message.trim() !== "";

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    const savedName = localStorage.getItem("name");
    const savedAbout = localStorage.getItem("about");
    const savedSocialMedia = localStorage.getItem("socialmedia");
    const savedUserId = localStorage.getItem("userId");

    setCurrentProfile(savedProfile || profile);
    setCurrentName(savedName || name);
    setCurrentAbout(savedAbout || about);
    setCurrentSocialMedia(savedSocialMedia || socialmedia || "");
    if (savedUserId) setUser(savedUserId);
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", currentProfile);
  }, [currentProfile]);

  useEffect(() => {
    localStorage.setItem("name", currentName);
  }, [currentName]);

  useEffect(() => {
    localStorage.setItem("about", currentAbout);
  }, [currentAbout]);

  useEffect(() => {
    localStorage.setItem("socialmedia", currentSocialMedia);
  }, [currentSocialMedia]);

  useEffect(() => {
    if (user) localStorage.setItem("userId", user);
  }, [user]);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "buy_me_coffee");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dabc04pmm/upload`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      setCurrentProfile(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const editProfile = async () => {
    if (!user) {
      console.error("No user ID found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/profile/${Number(user)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: currentName,
            about: currentAbout,
            avatarImage: currentProfile,
            socialMediaURL: currentSocialMedia,
            user: Number(user),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const data = await response.json();

      setCurrentProfile(data.update.avatarImage);
      setCurrentName(data.update.name);
      setCurrentAbout(data.update.about);
      setCurrentSocialMedia(data.update.socialMediaURL);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="relative top-[-80px]">
        <div className="w-[632px] h-[233px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5 bg-[#FFFFFF]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-[40px] h-[40px]"
                style={{
                  backgroundImage: `url(${currentProfile})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "50%",
                }}
              ></div>
              <p className="text-black font-[700] text-[20px] leading-[20px]">
                {currentName}
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editProfile();
                  }}
                >
                  <label
                    htmlFor="profile-upload"
                    className="cursor-pointer w-[160px] h-[160px] bg-[#F4F4F5] rounded-lg flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${currentProfile})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "50%",
                    }}
                  >
                    <input
                      id="profile-upload"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                  <div className="mt-10">
                    <p>Name</p>
                    <input
                      type="text"
                      value={currentName}
                      onChange={(e) => setCurrentName(e.target.value)}
                      className="w-[460px] h-[40px] border-[1px] rounded-md p-3"
                    />
                  </div>
                  <p className="mb-[5px] mt-[5px]">About</p>
                  <Textarea
                    value={currentAbout}
                    onChange={(e) => setCurrentAbout(e.target.value)}
                  />
                  <p className="mb-[5px] mt-[5px]">Social Media URL</p>
                  <input
                    type="text"
                    value={currentSocialMedia ?? ""}
                    onChange={(e) => setCurrentSocialMedia(e.target.value)}
                    className="w-[460px] h-[40px] border-[1px] rounded-md p-3"
                  />

                  <div className="flex gap-2 justify-end mt-[30px]">
                    <DialogClose className="w-[79px] h-[40px] bg-[#F4F4F5] rounded-md flex justify-center items-center">
                      Cancel
                    </DialogClose>
                    <DialogClose
                      type="submit"
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
              About {currentName}
            </p>
            <p className="mt-3">{currentAbout}</p>
          </div>
        </div>
        <div className="w-[632px] h-[116px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5 bg-[#FFFFFF]">
          <p className="font-[600] text-[16px]">Social Media URL</p>
          <p className="mt-3">{currentSocialMedia}</p>
        </div>
        <div className="w-[632px] h-[236px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5 bg-[#FFFFFF]">
          <p className="font-[600] text-[16px]">Recent Supporters</p>
          <div className="w-[584px] h-[140px] border-[1px] rounded-lg mt-5">
            <div className="flex items-center gap-4 flex-col h-full justify-center">
              <Heart />
              <p className="font-[600]">
                Be the first one to support {currentName}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[628px] h-[509px] bg-[#FFFFFF] border-[1px] rounded-lg relative top-[-60px] p-7">
          <p className="font-[600] text-[24px]">Buy {currentName} a Coffee</p>
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
              value={message || ""}
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
