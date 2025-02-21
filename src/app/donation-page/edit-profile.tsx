"use client";
import { useEffect, useState } from "react";
import Cover from "./_components/cover";
import Donation from "./_components/donation";
import Header from "./_components/header";


interface ProfileData {
  avatarImage: string;
  name: string;
  about: string;
  socialmedia: string;
}

export function EditProfile() {
  const [profile, setProfile] = useState<ProfileData>({
    avatarImage: "",
    name: "",
    about: "",
    socialmedia: "",
  });
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
  
      try {
        const response = await fetch(`http://localhost:8000/profile/${Number(user)}`);
        const data: ProfileData[] = await response.json();
  
        if (data.length > 0) {
          setProfile({
            avatarImage: data[0].avatarImage || "",
            name: data[0].name || "",
            about: data[0].about || "",
            socialmedia: data[0].socialmedia || "",
          });
        } else {
          console.error("Profile data is empty");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
  
    fetchProfile();
  }, [user]);

  return (
    <>
      <Header 
      profile={profile.avatarImage}
      name={profile.name}
      about={profile.about}
      socialmedia={profile.socialmedia}/>
      <Cover />
      <Donation
        profile={profile.avatarImage}
        name={profile.name}
        about={profile.about}
        socialmedia={profile.socialmedia}
      />
    </>
  );
}
