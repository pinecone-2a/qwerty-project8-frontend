"use client";
import { useEffect, useState } from "react";
import Bottom from "../../../../components/b-arrow";

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
  const [currentProfile, setCurrentProfile] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [user, setUser] = useState<string | null>(null);



  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    const savedName = localStorage.getItem("name");
    const savedUserId = localStorage.getItem("userId");

    setCurrentProfile(savedProfile || profile);
    setCurrentName(savedName || name);
    if (savedUserId) setUser(savedUserId);
  }, []);

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
            avatarImage: currentProfile,
            user: Number(user),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");
      
      const data = await response.json();

      setCurrentProfile(data.update.avatarImage);
      setCurrentName(data.update.name);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  return (
    <header className="w-full h-[56px] bg-[#FFFFFF] flex items-center justify-between">
      <div className="w-[151px] h-[24px] ml-10">
        <img src="Logo.png" />
      </div>
      <div className="flex items-center space-x-4 mr-10">
        <div
          className="w-[40px] h-[40px]"
          style={{
            backgroundImage: `url(${currentProfile})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
          }}
        ></div>
        <p className="text-black">{currentName}</p>
        <Bottom />
      </div>
    </header>
  );
}
