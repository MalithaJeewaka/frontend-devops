"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { reset, register } from "@/redux/features/auth/authSlice";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "react-toastify";

const formSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Invalid email address." })
      .min(1, { message: "Enter your email address." }),
    password: z.string().min(1, { message: "Enter your password." }),
    confirmPassword: z.string().min(1, { message: "Confirm the password." }),
    firstName: z.string().min(1, { message: "Enter your first name." }),
    lastName: z.string().min(1, { message: "Enter your last name." }),
    isOrganizer: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Attach error to confirmPassword field
  });

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      isOrganizer: false,
    },
  });

  useEffect(() => {
    if (user) {
      router.push("/");
      return;
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      router.push("/login");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, router, dispatch]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { confirmPassword, ...formData } = values;
    dispatch(register(formData));
    router.push("/login");
  }
  return (
    <div className="h-screen">
      <div className="h-full w-full flex justify-between items-center">
        <div className="flex-1 h-full">
          <div className="flex flex-col px-[10%] justify-center w-full h-full">
            <h1 className="text-6xl">Register</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 mt-10"
              >
                <div className="flex justify-between items-center gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Fist Name</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:opacity-70"
                            placeholder="Enter your fist name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            className="placeholder:opacity-70"
                            placeholder="Enter your last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="placeholder:opacity-70"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type={showPassword ? "" : "password"}
                          className="placeholder:opacity-70"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      {showPassword ? (
                        <Eye
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 bottom-2 cursor-pointer"
                        />
                      ) : (
                        <EyeClosed
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 bottom-2 cursor-pointer"
                        />
                      )}

                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={showPassword2 ? "" : "password"}
                          className="placeholder:opacity-70"
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </FormControl>
                      {showPassword2 ? (
                        <Eye
                          onClick={() => setShowPassword2(!showPassword2)}
                          className="absolute right-2 bottom-2 cursor-pointer"
                        />
                      ) : (
                        <EyeClosed
                          onClick={() => setShowPassword2(!showPassword2)}
                          className="absolute right-2 bottom-2 cursor-pointer"
                        />
                      )}

                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isOrganizer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Register as:</FormLabel>
                      <FormControl>
                        <RadioGroup
                          defaultValue={field.value ? "organizer" : "user"}
                          onValueChange={
                            (value) => field.onChange(value === "organizer") //true of organizer is selected
                          }
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="user" id="user" />
                            <Label htmlFor="user">User</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="organizer" id="organizer" />
                            <Label htmlFor="organizer">Organizer</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Register</Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="flex-1 relative h-full bg-slate-500">
          <Image
            src={"/images/3.jpg"}
            fill
            alt="login image"
            className="object-cover object-center brightness-50"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
