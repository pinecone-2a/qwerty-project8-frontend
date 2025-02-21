import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquareArrowOutUpRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { SkeletonCard } from "../_components/Skeleton";

interface Profile {
  id: number;
  userId: number;
  name: string;
  avatarImage: string;
  about: string;
  socialMediaURL: string;
}

export default function Explore() {
  const [data, setData] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") || "";
  let userId: number | null = null;

  if (accessToken) {
    try {
      const decodedToken: any = jwtDecode(accessToken);
      userId = decodedToken?.userId ?? null;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  async function getFetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/explore`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to fetch profiles");

      const result: Profile[] = await res.json();
      const filteredProfiles = result.filter(
        (profile) => profile.userId !== userId
      );
      setData(filteredProfiles);
      setFilteredData(filteredProfiles);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((profile) =>
          profile.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, data]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1000px]">
        <div className="flex gap-2 flex-col mb-10">
          <h1 className="mb-5 mt-8 font-extrabold text-[32px]">
            Explore Creators
          </h1>
          <div className="relative">
            <Input
              className="w-[243px] pl-10"
              type="search"
              placeholder="Search name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="opacity-45 absolute top-2 left-2 w-5 h-5" />
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="flex flex-col gap-10">
              <SkeletonCard width="1000px" height="250px" />
              <SkeletonCard width="1000px" height="250px" />
              <SkeletonCard width="1000px" height="250px" />
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((profile) => (
              <Card key={profile.id} className="mb-10">
                <CardContent className="h-[250px] p-6 px-10">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-xl font-semibold">
                      <Avatar>
                        <AvatarImage
                          src={profile.avatarImage}
                          alt={profile.name}
                        />
                        <AvatarFallback>
                          {profile.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {profile.name}
                    </div>
                    <Link href={`/viewpage/${profile.name}`}>
                      <Button>
                        View page <SquareArrowOutUpRight />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex gap-7 mt-6">
                    <div className="flex flex-col w-[420px]">
                      <h2 className="font-semibold text-[16px]">
                        About {profile.name}
                      </h2>
                      <p className="text-sm mt-4">{profile.about}</p>
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-semibold text-[16px]">
                        Social Media
                      </h2>
                      <p className="text-sm mt-4">{profile.socialMediaURL}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">No creators found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
