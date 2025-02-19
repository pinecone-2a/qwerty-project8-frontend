import * as React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Form } from "@/components/ui/form";
import Link from "next/link";

// const addUser=async ()=>{
//   const res=await fetch("http://localhost:8000/auth/sign-up",{
//     method:"POST",
//     headers:{
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },body:JSON.stringify
//   })

// }

const formSecondrSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(50),
});
const formThirdSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
  // confirmPassword: z
  // .string()
  // .min(1, { message: 'Please confirm your password' })
});
// .superRefine((val, ctx) => {
//   if (val.password !== val.confirmPassword) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: 'Password is not the same as confirm password',
//       path: ['confirmPassword'],
//     })
//   }
//   password: z.string().min(8).max(50)
// });
const formFirstSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

// const ConfirmPasswordSchema = z.object({

//   email: z.string().email(),
//   password: z.string().min(8).max(50)
// });
export function SignUp(nextStep: any) {
  const form1 = useForm<z.infer<typeof formFirstSchema>>({
    resolver: zodResolver(formFirstSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit1(values: z.infer<typeof formFirstSchema>) {
    console.log(values);
    nextStep.nextStep();

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }
  return (
    <div>
      <Button className="ml-[1000px] mt-5" onClick={nextStep.nextStep}>
        SignUp
      </Button>

      <div className="ml-[450px] mt-[350px]">
        <div className="font-extrabold">
          Welcome back
          <p className="text-gray-500 font-medium">
            Connect email and set a password
          </p>
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
                    <Input
                      className="w-[359px]"
                      placeholder="Enter email here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form1.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[359px]"
                      placeholder="Enter password here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-10">
              <Button type="submit">Submit</Button>
              <div>
                <Link href={"/login/forgot-password"}>
                  <div>Forgot Password</div>
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
export function SecondStep({ changeSign, nextStep, setUsername }: any) {
  // console.log( typeof nextStep)
  const form2 = useForm<z.infer<typeof formSecondrSchema>>({
    resolver: zodResolver(formSecondrSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit2(values: z.infer<typeof formSecondrSchema>) {
    setUsername(values.username);
    nextStep();
  }

  return (
    <div>
      <Button className="ml-[1000px] mt-5" onClick={changeSign}>
        Login
      </Button>
      <div className="ml-[450px] mt-[350px]">
        <div className="font-extrabold">
          Create Your Account
          <p className="text-gray-500 font-medium">
            Choose a username for your page
          </p>
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
                    <Input
                      className="w-[359px]"
                      placeholder="Enter username here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Contiune</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
export function ThirdStep({ changeSign1, backStep, nextStep, username }: any) {
  // console.log( typeof changeSign1)
  const form3 = useForm<z.infer<typeof formThirdSchema>>({
    resolver: zodResolver(formThirdSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit3(values: z.infer<typeof formThirdSchema>) {
    const res = await fetch("http://localhost:8000/auth/sign-up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: values.email,
        password: values.password,
      }),
    });
    const data = await res.json();
    console.log(data);
    localStorage.setItem("userId", data.data.id);
    nextStep();
  }

  return (
    <div>
      <Button className="ml-[1000px] mt-5" onClick={changeSign1}>
        Login
      </Button>
      <div className="ml-[450px] mt-[350px]">
        <div className="font-extrabold">
          Welcome
          <p className="text-gray-500 font-medium">
            Connect email and set a password
          </p>
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
                    <Input
                      className="w-[359px]"
                      placeholder="Enter email here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form3.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[359px]"
                      type="password"
                      placeholder="Enter password here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button onClick={backStep}>back</Button>
            <Button className="ml-[20px]" type="submit">
              next
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
