"use client";

import { useState } from "react";

export default function Edit() {
  const [cover, setCover] = useState("");
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [socialmedia, setSocialmedia] = useState("https://");
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
  return (<></>)
}
