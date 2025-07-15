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
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signin } from "@/actions/auth";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      isShowPassword: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof LoginSchema>) => {
      const data = await signin(values);
      console.log("Login Data:", data);

      if (data?.error) {
        setError(data.error);
        return;
      }
      return setSuccess("Login successful! Redirecting...");
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    setSuccess("");
    mutate(values);
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (success) {
      timeoutId = setTimeout(() => {
        router.push("/");
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [success]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="janedoe@mail.com"
                    {...field}
                    type="email"
                    disabled={isPending}
                  />
                </FormControl>
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
                    type={form.watch("isShowPassword") ? "text" : "password"}
                    disabled={isPending}
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
        </>

        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
