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

  useEffect(() => {
    async function fetchProfile() {
      const response = await fetch("http://localhost:8000/profile/1");
      const data: ProfileData[] = await response.json(); 

      setProfile({
        avatarImage: data[0].avatarImage,
        name: data[0].name,
        about: data[0].about,
        socialmedia: data[0].socialmedia,
      });
    }
    fetchProfile();
  }, []);

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
