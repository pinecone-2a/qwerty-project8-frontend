"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface Transaction {
  name: string;
  profileUrl: string;
  message?: string;
  amount: number;
  timeAgo: string;
}

const transactions: Transaction[] = [
  { name: "Cutiez", profileUrl: "buymeacoffee.com/kissyface", amount: 2, timeAgo: "10 mins ago" },
  { name: "Guest", profileUrl: "instagram.com/weleisley", message: "Thank you for being so awesome everyday!", amount: 1, timeAgo: "5 hours ago" },
  { name: "John Doe", profileUrl: "buymeacoffee.com/bdsadas", message: "Thank you for being so awesome everyday!", amount: 10, timeAgo: "10 hours ago" },
  { name: "Radicals", profileUrl: "buymeacoffee.com/gkfgrew", amount: 2, timeAgo: "1 day ago" },
  { name: "Guest", profileUrl: "facebook.com/penelpoeb", amount: 5, timeAgo: "2 days ago" },
];

export default function Dashboard() {
  const [earnings, setEarnings] = useState(450);
  const [filterAmount, setFilterAmount] = useState<number | null>(null);

  const filteredTransactions = filterAmount
    ? transactions.filter((t) => t.amount === filterAmount)
    : transactions;

  return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-2xl mx-auto">
        <Card className=" p-6 rounded-lg shadow-lg">
          <div className="mt-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Jake</h2>
              <p className="text-gray-400">buymeacoffee.com/baconpancakes1</p>
            </div>
            <Button>Share page link</Button>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Earnings</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button >Last 30 days</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                <DropdownMenuItem>Last 60 days</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-4xl font-bold mt-2">${earnings}</p>
        </Card>
        <Card className="p-6 mt-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent transactions</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button >Amount</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {[1, 2, 5, 10].map((amount) => (
                  <DropdownMenuItem key={amount}>
                    <Checkbox
                      checked={filterAmount === amount}
                      onCheckedChange={() => setFilterAmount(filterAmount === amount ? null : amount)}
                    />
                    <span className="ml-2">${amount}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <Card key={index} className="p-4 rounded-lg flex justify-between items-start">
                <div>
                  <p className="font-semibold text-black">{transaction.name}</p>
                  <p className="text-gray-400 text-sm">{transaction.profileUrl}</p>
                  {transaction.message && (
                    <p className="text-gray-300 mt-1 text-sm">{transaction.message}</p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">{transaction.timeAgo}</p>
                </div>
                <p className="font-semibold text-green-400">+ ${transaction.amount}</p>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
