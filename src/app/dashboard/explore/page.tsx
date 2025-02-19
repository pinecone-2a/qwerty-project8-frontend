import React from "react";
import { CiSearch } from "react-icons/ci";

interface Creator {
  name: string;
  description: string;
  socialMediaUrl: string;
  imageUrl: string;
}

const creators: Creator[] = [
  {
    name: "Space ranger",
    description:
      "All day, every day, we’re watching, listening to, reading and absorbing politics. It’s exhausting. We then report on what we’ve seen in a way that’s as chill as possible. None of the sensationalism and division you’ll find elsewhere. It’s about cl...",
    socialMediaUrl: "https://buymeacoffee.com/baconpancakes1",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    name: "Purple monster",
    description:
      "Purple monster is for everyone. It handles all the painful experiences and helps people.",
    socialMediaUrl: "https://buymeacoffee.com/ffmonster23",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    name: "Alien Conspiracy",
    description:
      "Show your support ❤️ and buy me a coffee! & keep project a live!",
    socialMediaUrl: "https://buymeacoffee.com/roooaaamm",
    imageUrl: "https://via.placeholder.com/50",
  },
];

const ExploreCreators: React.FC = () => {
  return (
    <div className="flex h-screen bg-white">
      <main className="flex-1 px-10">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Explore creators
        </h2>
        <div className="w-[243px] h-9 border border-[#e4e4e7] flex gap-1 items-center rounded">
          <CiSearch size={20} color="black" className="ml-2" />
          <input
            type="text"
            placeholder={`Search name`}
            className="border-none w-full h-full outline-none text-black"
          />
        </div>
        <div className="space-y-4">
          {creators.map((creator, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md flex items-center"
            >
              <img
                src={creator.imageUrl}
                alt={creator.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{creator.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  About {creator.name}
                </p>
                <p className="text-gray-700 text-sm">{creator.description}</p>
                <a
                  href={creator.socialMediaUrl}
                  className="text-blue-500 text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {creator.socialMediaUrl}
                </a>
              </div>
              <a
                href={creator.socialMediaUrl}
                className="bg-gray-200 px-4 py-2 rounded-md text-sm text-gray-700"
              >
                View profile ↗
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExploreCreators;
