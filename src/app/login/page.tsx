"use client"
import { LogIn } from "lucide-react";
// import { CreateAccount, FourthStep, LoginStep } from "./_components/Forms"
import { useState } from "react"
import { ThirdStep, SecondStep, SignUp } from "./_components/Forms";


export default function Home (){
    const [currentStep,setCurrentStep]=useState<number>(1)
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
      };
      const backStep = () => {
        setCurrentStep(currentStep - 1);
      };    
    return(
    <div className="w-screen h-screen flex">
        <div className="bg-yellow-400 h-screen w-1/2  pt-[287px] pl-[234px]">
            <img className="w-[240px] h-[240px] mt-16 ml-40" src="https://res.cloudinary.com/dxkgrtted/image/upload/v1738663220/buy%20a%20coffe/cgd0lhovmnyywcvcyuqx.png"></img>
            <p className="text-black font-extrabold mt-7 ml-48">Fund your creative work</p>
            <p className="text-black font-extralight ml-10">Accept support. Start a membership. Setup a shop. It’s easier than you think.</p>
        </div>
        */
        {currentStep==1&&(<SignUp nextStep={nextStep} ></SignUp>)}
        {currentStep==2&&(<SecondStep nextStep={nextStep}  ></SecondStep>)}
       {currentStep==3&&(<ThirdStep nextStep={nextStep}backStep={backStep}></ThirdStep>)}
       
       
    </div> 
   )
}