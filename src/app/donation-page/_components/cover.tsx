"use client";
import { useState, useEffect } from "react";
import Camera from "../../../../components/Camera";

export default function Cover() {
  const [edit, setEdit] = useState(false);
  const [cover, setCover] = useState({
    image: null as string | null,
    name: "",
    about: "",
    socialmedia: "",
  });
  const [prevImage, setPrevImage] = useState<string | null>(null); // Stores previous image

  useEffect(() => {
    async function fetchCover() {
      const response = await fetch("http://localhost:8000/profile/1");
      const data = await response.json();
      setCover((prev) => ({
        ...prev,
        image: data[0].backgroundImage, // Ensure it's inside the cover object
      }));
    }
    fetchCover();
  }, []);

  const handleCover = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

      setPrevImage(cover.image); // Save previous image before changing
      setCover((prev) => ({ ...prev, image: dataJson.secure_url }));
      setEdit(true); // Enable edit mode
    }
  };

  const handleCancel = () => {
    setCover((prev) => ({ ...prev, image: prevImage })); // Restore previous image
    setEdit(false);
  };

  const handleSave = async () => {
    await fetch("http://localhost:8000/profile/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        backgroundImage: cover.image,
      }),
    });
    setEdit(false);
  };

  return (
    <div
      className={`flex flex-col w-full h-[319px] bg-[#F4F4F5] ${
        !cover.image && "justify-center items-center"
      }`}
      style={{
        backgroundImage: cover.image ? `url(${cover.image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Change Cover Button */}
      {!edit ? (
        <div className="flex gap-2 justify-end mr-[50px] mt-[20px]">
          <label
            htmlFor="file-upload"
            className="cursor-pointer p-2 bg-[#F4F4F5] text-black rounded-lg flex items-center justify-center w-[200px] gap-2"
          >
            <Camera strokeColor="black" />
            Change Cover
          </label>
        </div>
      ) : (
        // Save & Cancel Buttons
        <div className="flex gap-2 justify-end mr-[50px] mt-[20px]">
          <button
            onClick={handleSave}
            className="w-[126px] h-[40px] bg-[#18181B] flex justify-center items-center text-white rounded-md"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="w-[79px] h-[40px] bg-[#F4F4F5] flex justify-center items-center rounded-md"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleCover}
      />
    </div>
  );
}
