'use client'
import { useState } from "react";
import Bottom from "../../../../components/b-arrow";

export default function Header() {
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
    return (
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
                                <p className="text-black">{profile.name}</p>
                                <Bottom />
                              </div>
                            </header>
    )
}