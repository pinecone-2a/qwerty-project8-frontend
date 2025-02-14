"use client";
import { LogIn } from "lucide-react";
import React from "react";
// import { CreateAccount, FourthStep, LoginStep } from "./_components/Forms"
import { useState } from "react";
import { ThirdStep, SecondStep, SignUp } from "./components/Forms";
import { Navigation } from "./components/navigation";
import { Profile } from "../profile/profile";

export default function Home() {
  const [username, setUsername] = useState<string>();
  const [currentStep, setCurrentStep] = useState<number>(4);
  // const [step ,setStep]=useState<number>(1)
  const changeSign = () => {
    setCurrentStep(currentStep - 1);
  };
  const changeSign1 = () => {
    setCurrentStep(currentStep - 2);
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const backStep = () => {
    setCurrentStep(currentStep - 1);
  };
  return (
    <div className="w-screen h-screen flex">
      {currentStep == 4 && <Profile />}
      {currentStep != 4 && (
        <div className="bg-yellow-400 h-screen w-1/2  ">
          <Navigation></Navigation>
          <div className="pt-[287px] pl-[240px]">
            <img
              className="w-[240px] h-[240px] mt-16 ml-40"
              src="https://res.cloudinary.com/dxkgrtted/image/upload/v1738663220/buy%20a%20coffe/cgd0lhovmnyywcvcyuqx.png"
            ></img>
            <p className="text-black font-extrabold mt-7 ml-48">
              Fund your creative work
            </p>
            <p className="text-black font-extralight ml-10">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </p>
          </div>
        </div>
      )}
      <div className="bg-white">
        {currentStep == 1 && <SignUp nextStep={nextStep}></SignUp>}
        {currentStep == 2 && (
          <SecondStep
            changeSign={changeSign}
            nextStep={nextStep}
            setUsername={setUsername}
          ></SecondStep>
        )}
        {currentStep == 3 && (
          <ThirdStep
            changeSign1={changeSign1}
            nextStep={nextStep}
            backStep={backStep}
            username={username}
          ></ThirdStep>
        )}
      </div>
    </div>
  );
}
