import Image from "next/image";
import * as React from "react"
 import { Label } from "@/components/ui/label"
 import { z } from "zod"
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Form } from "@/components/ui/form";


 
const formSecondrSchema = z.object({
  username: z.string().min(5,{ message: "Must be 5 or more characters long" }).max(50),
});
const formThirdSchema = z.object({
 
  email: z.string().email(),
  password: z.string().min(8).max(50)
});
const formFirstSchema = z.object({
 
  email: z.string().email(),
  password: z.string().min(8).max(50)
});
export function SignUp(nextStep:any){
  const form1 = useForm<z.infer<typeof formFirstSchema>>({
    resolver: zodResolver(formFirstSchema),
    defaultValues: {
    
    email:"",
    password:""
     

    },
  })
 
  // 2. Define a submit handler.
  function onSubmit1(values: z.infer<typeof formFirstSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)}
    return(
      <div>
      <Button>SignUp</Button>
        
         <div className="ml-[450px] mt-[350px]">
      <div className="font-extrabold">Welcome back
        <p className="text-gray-500 font-medium">Connect email and set a password</p>
      </div>
       <Form {...form1}>
       <form onSubmit={form1.handleSubmit(onSubmit1)} className="space-y-8">
        <FormField
          control={form1.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> <FormField
        control={form1.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        <Button onClick={nextStep.nextStep}  type="submit">Submit</Button>
      </form>
       </Form>
    </div>
      </div>
    )
  
}
export function SecondStep(nextStep:any){
  // console.log( typeof nextStep.nextStep)
  const form2 = useForm<z.infer<typeof formSecondrSchema>>({
    resolver: zodResolver(formSecondrSchema),
    defaultValues: {
      username: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit2(values: z.infer<typeof formSecondrSchema>) {
    nextStep.nextStep();
  }
  return(
    <div>
      <Button>Login</Button><div className="ml-[450px] mt-[350px]">
     
      <div className="font-extrabold">Create Your Account
        <p className="text-gray-500 font-medium">Choose a username for your page</p>
      </div>
       <Form {...form2}>
       <form onSubmit={form2.handleSubmit(onSubmit2)} className="space-y-8">
        <FormField
          control={form2.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      
        <Button type="submit">Contiune</Button>
      </form>
       </Form>
    </div></div>
    
  )
}
export function ThirdStep({backStep,nextStep}:any){
  console.log( typeof backStep)
  const form3 = useForm<z.infer<typeof formThirdSchema>>({
    resolver: zodResolver(formThirdSchema),
    defaultValues: {
    
    email:"",
    password:""
     

    },
  })
 
  // 2. Define a submit handler.
  function onSubmit3(values: z.infer<typeof formThirdSchema>) {
   ///////////////

//daraaan yaah function
   ////////
  }
  return(
    <div> <Button>Login</Button>   <div className="ml-[450px] mt-[350px]">
      <div className="font-extrabold">Welcome
        <p className="text-gray-500 font-medium">Connect email and set a password</p>
      </div>
       <Form {...form3}>
       <form onSubmit={form3.handleSubmit(onSubmit3)} className="space-y-8">
        <FormField
          control={form3.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> <FormField
        control={form3.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button onClick={backStep} >back</Button>
        <Button onClick={nextStep.nextStep}  type="submit">next</Button>
      </form>
       </Form>
    </div></div>
   
  )
}

