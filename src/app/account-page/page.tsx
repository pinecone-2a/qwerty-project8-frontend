"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { validateProfileFirst } from "../profile/component/validate1";

type FormData = {
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
  userId: number;
};

export default function Home({
  form = {
    name: "",
    about: "",
    socialmedia: "",
    image: "",
    firstname: "",
    lastname: "",
    card: "",
    country: "",
    month: "",
    year: "",
    CVC: "",
    userId: 0,
  }, // Default form
  setForm,
  errors,
  setErrors,
}: {
  form?: FormData;
  setForm: any;
  errors: any;
  setErrors: any;
}) {
  const params = useParams();
  const userId = params?.id;

  const [profile, setProfile] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(form?.image || "");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("User ID is missing");
      return;
    }

    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for userId:", userId);

        const response = await fetch(
          `http://localhost:8000/profile?userId=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error("No profile data found");
        }

        console.log("Fetched profile data:", data);
        setProfile(data);
        setForm(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "buy_me_coffee");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dabc04pmm/upload`,
          { method: "POST", body: data }
        );
        if (!response.ok) throw new Error("Image upload failed");

        const dataJson = await response.json();
        setForm((prev: any) => ({ ...prev, image: dataJson.secure_url }));
        setImage(dataJson.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleContinue = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!form) return;

    const { isValid, newErrors } = validateProfileFirst(form);
    setErrors(newErrors);

    if (isValid) {
      const dataToSend = {
        name: form.name,
        about: form.about,
        socialMediaURL: form.socialmedia,
        avatarImage: form.image,
        backgroundImage: "",
        successMessage: "",
        userId,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend),
          }
        );

        if (!response.ok) throw new Error("Failed to submit form data");

        const responseData = await response.json();
        console.log("Response from backend:", responseData);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>Error: Profile not found</p>;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center justify-start mt-[100px]">
        <div className="text-2xl font-bold"> My account</div>
        <div className="grid w-full max-w-sm items-center gap-1.5 rounded-md border-2 p-4 mb-5">
          <p className="pb-4 font-bold">Personal info</p>
          <Label htmlFor="picture">Add photo</Label>
          <div className="flex flex-col items-center justify-center gap-2.5 relative">
            <div
              className={`w-40 h-40 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center ${
                form?.image ? "bg-transparent" : "bg-white"
              }`}
            >
              {profile?.image ? (
                <div className="border outline-1 rounded-sm w-[250px] relative">
                  <img
                    className="mt-2 w-[160px] h-[160px] object-cover"
                    src={profile.image}
                    alt="Profile"
                  />
                </div>
              ) : (
                <p>No image available</p>
              )}
            </div>
            <input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <label
              htmlFor="picture"
              className="inline-block w-40 h-40 rounded-full absolute left-28 cursor-pointer"
            />
          </div>
          <div>
            <Label htmlFor="name" className="left-0">
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
          </div>
          <div>
            <Label htmlFor="name" className="left-0">
              About
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.about}
              onChange={handleChange}
              placeholder="About yourself"
            />
          </div>
          <div>
            <Label htmlFor="name" className="left-0">
              About
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.socialmedia}
              onChange={handleChange}
              placeholder="Enter your social media URL"
            />
          </div>
          <button
            className="bg-black rounded-md text-white h-[35px] hover:bg-gray-500 hover:text-white"
            onClick={handleContinue}
          >
            Save changes
          </button>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 rounded-md border-2 p-4 mb-5">
          <p className="pb-4 font-bold">Set a new password</p>
          <div>
            <Label htmlFor="name" className="left-0">
              New password
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter a new password"
            />
          </div>
          <div>
            <Label htmlFor="name" className="left-0">
              Confirm password
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="About yourself"
            />
          </div>

          <button
            className="bg-black rounded-md text-white h-[35px] hover:bg-gray-500 hover:text-white"
            onClick={handleContinue}
          >
            Save changes
          </button>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 rounded-md border-2 p-4 mb-5">
          <p className="pb-4 font-bold">Payment details</p>
          <div>
            <Label htmlFor="name" className="left-0">
              Select country
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.country}
              onChange={handleChange}
              placeholder="Enter a country"
            />
          </div>

          <button
            className="bg-black rounded-md text-white h-[35px] hover:bg-gray-500 hover:text-white"
            onClick={handleContinue}
          >
            Save changes
          </button>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5 rounded-md border-2 p-4 mb-5">
          <p className="pb-4 font-bold">Success page</p>
          <div>
            <Label htmlFor="name" className="left-0">
              Confirmation message
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter a new confirmation message"
            />
          </div>

          <button
            className="bg-black rounded-md text-white h-[35px] hover:bg-gray-500 hover:text-white"
            onClick={handleContinue}
          >
            Save changes
          </button>
        </div>
      </div>
    </>
  );
}
