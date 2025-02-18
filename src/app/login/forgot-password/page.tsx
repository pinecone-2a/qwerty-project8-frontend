"use client"
import Coffee from "../../../../components/Coffee";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
  const [newUser, setNewUser] = useState("");
  const [OTP, setOTP] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [responseMessage, setResponseMessage] = useState(""); // To show response message from server
  const [isDialogOpen, setIsDialogOpen] = useState(false); // To control dialog visibility

  // Email Validation Function
  // const validateEmail = (email: string) => {
  //   const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  //   return emailPattern.test(email);
  // };

  // OTP Validation Function
  const validateOTP = (otp: string) => {
    return /^\d{6}$/.test(otp); // Ensures OTP is a 6-digit number
  };

  const addUser = async () => {
    // if (!validateEmail(newUser)) {
    //   alert("Please enter a valid email address.");
    //   return;
    // } else {
    //   setEmailError(""); // Clear the error if email is valid
    // }

    const res = await fetch("http://localhost:8000/auth/update", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newUser }),
    });

    if (res.ok) {
      alert("Sent OTP"); // Success message
      setIsDialogOpen(true); // Open the modal to enter OTP
    } else {
      alert("Failed to add user. Please try again."); // Error message
    }
  };

  const verifyOTP = async () => {
    if (!validateOTP(OTP)) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    } else {
      setOtpError(""); // Clear the error if OTP is valid
    }

    // if (!validateEmail(newUser)) {
    //   alert("Please enter a valid email address.");
    //   return;
    // }

    const res = await fetch("http://localhost:8000/auth/verify-otp", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userOtp: OTP, email: newUser }),
    });
  };

  return (
    <div className="bg-white">
      <div className="w-2/2 bg-yellow-400 pt-4 h-16">
        <div>
          <div className="flex gap-3 ml-[1000px] text-[16px]">
            <Coffee />
            <div>Buy Me Coffee</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-40">
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>Find your Account</CardTitle>
            <CardDescription>Enter your email</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name"></Label>
                  <Input
                    onChange={(e) => setNewUser(e.target.value)}
                    id="name"
                    placeholder="email"
                  />
                  {/* Show validation message for email */}
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
              </div>
            </form>
          </CardContent>

          {/* Show Response Message */}
          {responseMessage && (
            <p className={`text-sm ${responseMessage.includes("failed") ? 'text-red-500' : 'text-green-500'}`}>
              {responseMessage}
            </p>
          )}

          <CardFooter className="flex justify-between">
            <div className="ml-[43%]">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      addUser();
                    }}
                    variant="outline"
                  >
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="otp" className="text-right">
                        OTP
                      </Label>
                      <Input
                        onChange={(e) => setOTP(e.target.value)}
                        placeholder="Your OTP"
                        id="otp"
                        className="col-span-3"
                      />
                      {/* Show validation message for OTP */}
                      {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        verifyOTP();
                      }}
                      type="submit"
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
