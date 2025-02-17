"use client"
import Coffee from "../../../../components/Coffee";
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState,useEffect } from "react";
import { error } from "console";
export default function Home(){
  const [newUser,setNewUser]=useState("")
  const addUser=async ()=>{
  const res=await fetch("http://localhost:8000/auth/uptade",{
    method:"PUT",
    headers:{
      'Content-Type': 'application/json'
    },body:JSON.stringify({email:`${newUser}`})
  })
  console.log(res)
console.log(newUser)
}

    return(
<div className="bg-white">
    <div className="w-2/2 bg-yellow-400 pt-4 h-16">
    <div>
            <div className="flex gap-3 ml-[1000px]  text-[16px]">
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
              <Input onChange={(e)=>setNewUser(e.target.value)} id="name" placeholder="email" />
              <div>{newUser}</div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="ml-[43%]"> <Button onClick={()=>{
          addUser()
        }}>Confrim</Button></div>
       
      </CardFooter>
    </Card>

        </div>
    {/* <div className="w-1/2 bg-white h-16"></div> */}
</div>
    )
}