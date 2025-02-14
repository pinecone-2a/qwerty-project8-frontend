"use client";
import { useState } from "react";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validateProfileNext } from "./validate2";

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

interface ProfileNextProps {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export function ProfileNext({
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    setForm((prev: any) => ({ ...prev, country: value }));
  };

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1-");
    setForm((prev: any) => ({ ...prev, card: formattedValue }));
  };

  const handleMonthChange = (value: string) => {
    setForm((prev: any) => ({ ...prev, month: value }));
  };

  const handleYearChange = (value: string) => {
    setForm((prev: any) => ({ ...prev, year: value }));
  };
  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the value from the input and limit it to 3 digits
    let value = e.target.value.replace(/\D/g, ""); // Remove any non-numeric characters
    if (value.length > 3) {
      value = value.slice(0, 3); // Only keep the first 3 digits
    }
    setForm((prev: any) => ({ ...prev, CVC: value })); // Update state
  };
  const handleContinue = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission

    // Validate the form
    const { isValid, newErrors } = validateProfileNext(form);

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
        firstName: form.firstname,
        lastName: form.lastname,
        cardNumber: form.card,
        country: form.country,
        expiryDate: new Date(`${form.year}-${form.month}-01`),
        CVC: Number(form.CVC),
        user: 1,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/bankcard`,
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

        setCurrentStep(3);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-start mt-[100px]">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <p>How would you like to be paid?</p>
          <p className="pb-4 text-sm text-gray-400">
            Enter your location and payment details
          </p>
          <Label htmlFor="country">Select country</Label>
          <Select onValueChange={handleCountryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                <SelectItem value="mgl">Mongolia</SelectItem>
                <SelectItem value="jpn">Japan</SelectItem>
                <SelectItem value="usa">United States of America</SelectItem>
                <SelectItem value="china">China</SelectItem>
                <SelectItem value="russia">Russia</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.country && (
            <div className="error text-red-500 text-xs">{errors.country}</div>
          )}
          <div className="flex gap-2 flex-col sm:flex-row">
            <div className="flex-col sm:w-1/2 w-full">
              <Label htmlFor="firstname" className="pt-4">
                First name
              </Label>
              <Input
                id="firstname"
                name="firstname"
                type="text"
                value={form.firstname}
                onChange={handleChange}
                placeholder="Enter your first name here"
              />
              {errors.firstname && (
                <div className="error text-red-500 text-xs">
                  {errors.firstname}
                </div>
              )}
            </div>
            <div className="flex-col sm:w-1/2 w-full">
              <Label htmlFor="lastname" className="pt-4">
                Last name
              </Label>
              <Input
                id="lastname"
                name="lastname"
                type="text"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Enter your last name here"
              />
              {errors.lastname && (
                <div className="error text-red-500 text-xs">
                  {errors.lastname}
                </div>
              )}
            </div>
          </div>
          <Label htmlFor="card" className="pt-4">
            Enter card number
          </Label>
          <Input
            value={form.card}
            onChange={handleCardNumberChange}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            maxLength={19}
          />
          {errors.card && (
            <div className="error text-red-500 text-xs">{errors.card}</div>
          )}
          <div className="flex gap-2">
            <div className="flex-col w-1/3">
              <Label htmlFor="month" className="pt-4">
                Expires
              </Label>
              <Select onValueChange={handleMonthChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Month</SelectLabel>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.month && (
                <div className="error text-red-500 text-xs">{errors.month}</div>
              )}
            </div>
            <div className="flex-col w-1/3">
              <Label htmlFor="year" className="pt-4">
                Year
              </Label>
              <Select onValueChange={handleYearChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                    <SelectItem value="2027">2027</SelectItem>
                    <SelectItem value="2028">2028</SelectItem>
                    <SelectItem value="2029">2029</SelectItem>
                    <SelectItem value="2030">2030</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.year && (
                <div className="error text-red-500 text-xs">{errors.year}</div>
              )}
            </div>
            <div className="flex-col w-1/3 pb-4">
              <Label htmlFor="CVC" className="pt-4">
                CVC
              </Label>
              <Input
                id="CVC"
                name="CVC"
                type="text"
                value={form.CVC}
                onChange={handleCVCChange}
                placeholder="CVC"
              />
              {errors.CVC && (
                <div className="error text-red-500 text-xs">{errors.CVC}</div>
              )}
            </div>
          </div>
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
