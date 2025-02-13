"use client";
import { useEffect } from "react";
import Cover from "./_components/cover";
import Donation from "./_components/donation";
import Header from "./_components/header";

export default function Page() {
  
  useEffect(() => {

    async function getData() {
      if(process.env.NEXT_PUBLIC_BACKEND_URL){
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      }
    }
    getData();


  }, []);

  return (
    <>
      <Header />
      <Cover />
      <Donation />
    </>
  );
}
