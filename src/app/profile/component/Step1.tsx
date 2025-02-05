"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FormData {
  name: string;
  about: string;
  socialmedia: string;
  image: string | null;
  firstname?: string;
  lastname?: string;
  card?: string;
  country?: string;
  month?: string;
  year?: string;
  CVC?: string;
}

interface ProfileFirstProps {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export function ProfileFirst({
  form,
  setForm,
  setCurrentStep,
}: {
  form: FormData;
  setForm: any;
  setCurrentStep: any;
}) {
  const [image, setImage] = useState<string | null>(form.image || "");

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

      setForm((prev: any) => ({ ...prev, image: dataJson.secure_url }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-start mt-[100px]">
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
                backgroundColor: form.image ? "transparent" : "white", // If no image, background is white; otherwise transparent
              }}
            >
              {form.image ? (
                <img
                  src={form.image}
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
            value={form.name}
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
            value={form.about}
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
            value={form.socialmedia}
            onChange={handleChange}
            placeholder="https://"
          />
          <button
            onClick={() => setCurrentStep(2)}
            className="bg-[rgba(24,24,27,0.2)] rounded-md text-white h-[35px]"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
