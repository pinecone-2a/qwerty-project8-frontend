"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { Copy } from "lucide-react";

interface Transaction {
  name: string;
  profileUrl: string;
  message?: string;
  amount: number;
  timeAgo: string;
}

function handleShareLink(setCopied: any) {
  const pageUrl = "https://www.instagram.com/";

  navigator.clipboard
    .writeText(pageUrl)
    .then(() => {
      setCopied(true);

      setTimeout(() => setCopied(false), 1000);
    })
    .catch((err) => {
      alert("Failed to copy the link.");

      console.error("Error", err);
    });
}

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const [earnings, setEarnings] = useState(0);
  const [filterAmount, setFilterAmount] = useState<number | null>(null);
  const [transaction, setTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    const userId = "1";

    fetch(`/api/total-earnings/${userId}`)
      .then((Response) => Response.json())
      .then((data) => setEarnings(data.earnings))
      .catch((err) => console.error("ERROR", err));

    fetch(`/api/donation/recieved${userId}`)
      .then((Response) => Response.json())
      .then((data) => setTransaction(data))
      .catch((err) => console.error("ERROR", err));
  }, []);

  const filteredTransactions = filterAmount
    ? transaction.filter((t) => t.amount === filterAmount)
    : transaction;

  return (
    <div className="h-screen text-white p-6">
      <div className="w-[1000px] h-screen mx-auto">
        <Card className=" p-6 rounded-lg shadow-lg">
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">Bilguun</h2>
                <p className="text-gray-400">buymeacoffee.com/baconpancakes1</p>
              </div>
            </div>
            <div className="p-1">
              <button
                onClick={() => handleShareLink(setCopied)}
                className="bg-black text-white px-2 py-2 rounded-md flex"
              >
                <Copy className="p-2" />
                Share page link
              </button>

              {copied && (
                <p className="text-green-500 mt-2 text-sm">✅ Link copied!</p>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Earnings</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex gap-4 border border-solid bg-white text-black hover:bg-white ">
                  Last 30 days
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => ""}>
                  Last 7 days
                </DropdownMenuItem>
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                <DropdownMenuItem>Last 60 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <a className="text-4xl font-bold mt-2">${earnings}</a>
        </Card>
        <Card className="p-6 mt-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent transactions</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex gap-4 border border-dashed bg-white text-black hover:bg-white ">
                  Amount
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {[1, 2, 5, 10].map((amount) => (
                  <DropdownMenuItem key={amount}>
                    <Checkbox
                      checked={filterAmount === amount}
                      onCheckedChange={() =>
                        setFilterAmount(filterAmount === amount ? null : amount)
                      }
                    />
                    <span className="ml-2">${amount}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 space-y-4 overflow-y-auto max-h-[520px]">
            {filteredTransactions.map((transaction, index) => (
              <Card
                key={index}
                className="p-4 rounded-lg flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold text-black">{transaction.name}</p>
                  <p className="text-gray-400 text-sm">
                    {transaction.profileUrl}
                  </p>
                  {transaction.message && (
                    <p className="text-gray-300 mt-1 text-sm">
                      {transaction.message}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    {transaction.timeAgo}
                  </p>
                </div>
                <p className="font-semibold text-green-400">
                  + ${transaction.amount}
                </p>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
