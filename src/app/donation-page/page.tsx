import Bottom from "../../../components/b-arrow";
import Camera from "../../../components/Camera";
import Heart from "../../../components/Heart";

export default function Home() {
  return (
    <>
      <header className="w-full h-[56px] bg-[#FFFFFF] flex items-center justify-between">
        <div className="w-[151px] h-[24px] ml-10">
          <img src="Logo.png" />
        </div>
        <div className="flex items-center space-x-4 mr-10">
          <img src="Avatar.png" className="w-[40px] h-[40px] rounded-full" />
          <p className="text-black">Jake</p>
          <Bottom />
        </div>
      </header>
      <div className="flex flex-col items-center justify-center w-full h-[319px] bg-[#F4F4F5]">
        <label
          htmlFor="file-upload"
          className="cursor-pointer px-6 py-3 bg-black text-white rounded-lg flex items-center space-x-2"
        >
          <Camera />
          <p className="font-[500] text-[14px] leading-[20px] font-sans">
            Add a cover image
          </p>
        </label>
        <input id="file-upload" type="file" className="hidden" />
      </div>
      <div>
        <div className="w-[632px] h-[233px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="Avatar.png"
                className="w-[48px] h-[48px] rounded-full"
              />
              <p className="text-black font-[700] text-[20px] leading-[20px]">
                Jake
              </p>
            </div>
            <button className="w-[96px] h-[40px] bg-[#F4F4F5] rounded-md flex items-center justify-center">
              <p className="font-[500] text-[14px] leading-[20px]">Edit page</p>
            </button>
          </div>
          <div className="w-full h-[1px] border-[1px] mt-6"></div>
          <div className="mt-6">
            <p className="font-[600] text-[16px] leading-[24px]">About Jake</p>
            <p className="mt-3">
              I'm a typical person who enjoys exploring different things. I also
              make music art a hobby. Follow me along.
            </p>
          </div>
        </div>
        <div className="w-[632px] h-[116px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5">
          <p className="font-[600] text-[16px]">Social Media URL</p>
          <p className="mt-3">https://buymeacoffee.com/spacerulz44</p>
        </div>
        <div className="w-[632px] h-[236px] border-[1px] border-[#E4E4E7] rounded-lg m-5 p-5">
          <p className="font-[600] text-[16px]">Recent Supporters</p>
          <div className="w-[584px] h-[140px] border-[1px] rounded-lg mt-5">
            <div className="flex items-center gap-4 flex-col h-full justify-center">
              <Heart />
              <p className="font-[600]">Be the first one to support Jake</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
