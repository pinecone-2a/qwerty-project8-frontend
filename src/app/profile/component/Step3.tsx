"use client";
import * as React from "react";
import { EditProfile } from "@/app/donation-page/edit-profile";

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
  <div className="w-full h-full">
    <EditProfile/>
  </div>
      
  );
}
