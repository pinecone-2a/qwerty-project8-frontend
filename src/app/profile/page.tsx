"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Profile() {
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
      data.append("upload_preset", "food-delivery");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dqc6hkkvs/upload`,
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
  const submitModal = async () => {
    // console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    // await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food`, {
    //   method: "POST",
    //   body: JSON.stringify(food),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start p-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <p className="pb-4">Complete your profile page</p>

          <Label htmlFor="picture">Add photo</Label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              position: "relative", // to position the camera icon inside the circle if no image is selected
            }}
          >
            {/* Circle for image preview or camera icon */}
            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "1px solid gray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: profile.image ? "transparent" : "white", // If no image, background is white; otherwise transparent
              }}
            >
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <CameraIcon style={{ fontSize: "40px", color: "gray" }} />
              )}
            </div>

            <input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: "none" }}
            />

            <label
              htmlFor="picture"
              style={{
                display: "inline-block",
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                position: "absolute", // Positioning the label over the circular container
                top: "0",
                left: "0",
                cursor: "pointer",
              }}
            />
          </div>

          <Label htmlFor="name" className="pt-4">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <Label htmlFor="about" className="pt-4">
            About
          </Label>
          <Input
            id="about"
            name="about"
            type="text"
            value={profile.about}
            onChange={handleChange}
            placeholder="Write about yourself here"
          />

          <Label htmlFor="socialmedia" className="pt-4">
            Social media
          </Label>
          <Input
            id="socialmedia"
            name="socialmedia"
            type="text"
            value={profile.socialmedia}
            onChange={handleChange}
            placeholder="https://"
          />
          <button onClick={submitModal} className="bg-slate-600">
            {" "}
            Continue{" "}
          </button>
        </div>
      </div>
    </>
  );
}
