"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { validateProfileFirst } from "./validate1";

interface FormData {
  name: string;
  about: string;
  socialmedia: string;
  image: string;
  firstname: string;
  lastname: string;
  card: string;
  country: string;
  month: string;
  year: string;
  CVC: string;
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
  errors,
  setErrors,
}: {
  form: FormData;
  setForm: any;
  setCurrentStep: any;
  errors: any;
  setErrors: any;
}) {
  const [image, setImage] = useState<string | null>(form.image || "");

  const userId = localStorage.getItem("userId");

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

  const handleContinue = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission

    // Validate the form
    const { isValid, newErrors } = validateProfileFirst(form);

    // Log errors for debugging
    console.log("Errors:", newErrors);

    // Update errors state
    setErrors(newErrors);

    // Log form and errors after update
    console.log("Updated Form:", form);
    console.log("Updated Errors:", newErrors);

    if (isValid) {
      // Prepare the data to be sent to the backend
      const dataToSend = {
        name: form.name,
        about: form.about,
        socialMediaURL: form.socialmedia,
        avatarImage: form.image,
        backgroundImage: "",
        successMessage: "",
        userId: userId,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit form data");
        }

        const responseData = await response.json();
        console.log("Response from backend:", responseData);

        localStorage.setItem("name", responseData.name);
        localStorage.setItem("about", responseData.about);
        localStorage.setItem("socialMediaURL", responseData.socialmedia);
        localStorage.setItem("avatarImage", responseData.avatarImage);

        setCurrentStep(2);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };
  return (
    <>
      <div className="w-full flex flex-col items-center justify-start mt-[100px]">
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
              position: "relative",
            }}
          >
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
                backgroundColor: form.image ? "transparent" : "white",
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
                borderRadius: "100%",
                position: "absolute",
                left: "112px",
                cursor: "pointer",
              }}
            />
            {errors.image && (
              <div className="error text-red-500 text-xs">{errors.image}</div>
            )}
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
          {errors.name && (
            <div className="error text-red-500 text-xs">{errors.name}</div>
          )}

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
          {errors.about && (
            <div className="error text-red-500 text-xs">{errors.about}</div>
          )}

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
          {errors.socialmedia && (
            <div className="error text-red-500 text-xs">
              {errors.socialmedia}
            </div>
          )}

          <button
            className="bg-[rgba(24,24,27,0.2)] rounded-md text-white h-[35px] hover:bg-black hover:text-white"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
