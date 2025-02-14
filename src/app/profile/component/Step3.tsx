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

export function ProfileConfirmation({
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
  return (
    <>
      <div className="flex w-full flex-col items-center justify-start mt-[100px]">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <p>Your profile has been created successfully!</p>
        </div>
      </div>
    </>
  );
}
