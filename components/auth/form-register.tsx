"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import AuthCard from "./auth-card";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/types/register-schema";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { emailRegister } from "@/server/actions/email-register";

export default function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");
  const { execute, status } = useAction(emailRegister, {
    onSuccess(data) {
      if (data.success) {
        console.log(data.success);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);

    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Create an account"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="pritamtirpude"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="example@gmail.com"
                        {...field}
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
                        type="password"
                        autoComplete="current-password"
                        placeholder="*********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button asChild size={"sm"} variant="link">
                <Link href="/auth/reset">Forgot your password?</Link>
              </Button>
            </div>
            <Button
              className={cn(
                "w-full my-2",
                status === "executing" ? "animate-pulse" : ""
              )}
              type="submit"
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
}
