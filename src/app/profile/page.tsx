"use client";
import { useState } from "react";
import { ProfileFirst } from "./component/Step1";
import { ProfileNext } from "./component/Step2";
import { ProfileConfirmation } from "./component/Step3";

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

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    about: "",
    socialmedia: "",
    image: "",
    firstname: "",
    lastname: "",
    card: "",
    country: "",
    month: "",
    year: "",
    CVC: "",
  });
  const [errors, setErrors] = useState<any>({});

  return (
    <>
      {currentStep === 1 && (
        <ProfileFirst
          form={form}
          setForm={setForm}
          setCurrentStep={setCurrentStep}
          errors={errors} // Pass errors as props
          setErrors={setErrors} // Pass setErrors as props
        />
      )}
      {currentStep === 2 && (
        <ProfileNext
          form={form}
          setForm={setForm}
          setCurrentStep={setCurrentStep}
          errors={errors} // Pass errors as props
          setErrors={setErrors} // Pass setErrors as props
        />
      )}
      {currentStep === 3 && (
        <ProfileConfirmation
          form={form}
          setForm={setForm}
          setCurrentStep={setCurrentStep}
          errors={errors} // Pass errors as props
          setErrors={setErrors} // Pass setErrors as props
        />
      )}
    </>
  );
}
