"use client";
import { useEffect } from "react";
import { useState } from "react";
import Bottom from "../../../../components/b-arrow";

export default function Header() {
  const [cover, setCover] = useState("")
    const [profile, setProfile] = useState("")
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
          socialMediaURL:socialmedia,
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
    <header className="w-full h-[56px] bg-[#FFFFFF] flex items-center justify-between">
      <div className="w-[151px] h-[24px] ml-10">
        <img src="Logo.png" />
      </div>
      <div className="flex items-center space-x-4 mr-10">
        <div
          className="w-[40px] h-[40px]"
          style={{
            backgroundImage: `url(${profile})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
          }}
        ></div>
        <p className="text-black">{name}</p>
        <Bottom />
      </div>
    </header>
  );
}
