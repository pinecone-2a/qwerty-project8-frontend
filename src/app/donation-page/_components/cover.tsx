'use client'
import { useState } from 'react'
import Camera from '../../../../components/Camera';

export default function Cover() {
     const [cover, setCover] = useState<{
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
       const handleSetCoverImage = () => {
          return (
            <div className="flex gap-2 justify-end mr-[50px] mt-[20px] w-[149px] h-[40px] bg-[#F4F4F5] rounded-md">
              <Camera />
              Change Cover
            </div>
          );
        };
        const CancelCover = () => {
            setCover((prev) => ({ ...prev, image: null }));
          };
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
    
          setCover((prev) => ({ ...prev, image: dataJson.secure_url }));
        }
      };
      const CoverChange = () => {
          if (cover.image === null) {
            return (
              <label
                htmlFor="file-upload"
                className="cursor-pointer px-6 py-3 bg-black text-white rounded-lg flex items-center space-x-2 w-[200px]"
              >
                <Camera />
                <p className="font-[500] text-[14px] leading-[20px] font-sans">
                  Add a cover image
                </p>
              </label>
            );
          } else {
            return (
              <div className="flex gap-2 justify-end mr-[50px] mt-[20px]">
                <button
                 onClick={handleSetCoverImage}
                 className="w-[126px] h-[40px] bg-[#18181B] flex justify-center items-center text-[white] rounded-md">
                  Save Changes
                </button>
                <button
                  onClick={CancelCover}
                  className="w-[79px] h-[40px] bg-[#F4F4F5] flex justify-center items-center rounded-md"
                >
                  Cancel
                </button>
              </div>
            );
          }
        };
    return (
        <div
        className={`flex flex-col w-full h-[319px] bg-[#F4F4F5] ${
          !cover.image && " justify-center items-center "
        }`}
        style={{
          backgroundImage: `url(${cover.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {<CoverChange />}
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
    )
}