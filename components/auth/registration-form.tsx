"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RegistrationSchema } from "@/schemas";
import FormError from "@/components/form-error";
import FormSuccess from "../form-success";
import { Checkbox } from "@/components//ui/checkbox";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/actions/auth";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      gender: undefined,
      confirmPassword: "",
      isShowPassword: false,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof RegistrationSchema>) => {
      const data = await signup(values);
      if (data?.error) {
        setError(data.error);
        return;
      }
      form.reset();
      return setSuccess("Registration successful! Redirecting...");
    },
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (success) {
      timeoutId = setTimeout(() => {
        router.push("/");
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [success]);

  function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    setError("");
    setSuccess("");
    mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="janedoe@mail.com" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"male"}>Male</SelectItem>
                  <SelectItem value={"female"}>Female</SelectItem>
                  <SelectItem value={"other"}>Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  type={
                    form.watch("isShowPassword") === true ? "text" : "password"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
                  {...field}
                  type={
                    form.watch("isShowPassword") === true ? "text" : "password"
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isShowPassword"
          render={({ field }) => (
            <FormItem className="col-span-full flex flex-row items-center space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show Password?</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormError message={error} />
        <FormSuccess message={success} />{" "}
        <Button type="submit" className="w-full" disabled={isPending}>
          Sign Up
        </Button>
      </form>
    </Form>
  );
};
export default RegistrationForm;
