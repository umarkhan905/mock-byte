"use client";

import React, { useState } from "react";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  interviewerSignupSchema,
  interviewerSignupSchemaType,
} from "@/schemas/interviewer-signup-schema";
import { useRouter } from "next/navigation";
import { registerInterviewer } from "@/actions/register";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import FormError from "@/components/form/form-error";

export function SignupForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<interviewerSignupSchemaType>({
    resolver: zodResolver(interviewerSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
      position: "",
    },
  });

  async function onSubmit(values: interviewerSignupSchemaType) {
    setLoading(true);
    setError(null);
    try {
      const res = await registerInterviewer(values);
      if (!res.success) {
        setError(res.message);
        return;
      }

      toast(res.message);
      router.push(`/verify/${res?.data?.id as string}`);
    } catch (error) {
      console.log("Error creating user:", error);
      setError("Error creating user. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleShowPassword = () => {
    setIsShowPassword((isShowPassword) => !isShowPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    className="min-h-11 rounded-full"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    {...field}
                    className="min-h-11 rounded-full"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Acme Inc."
                  {...field}
                  className="min-h-11 rounded-full"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  placeholder="Software Engineer"
                  {...field}
                  className="min-h-11 rounded-full"
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
                  placeholder="johndoe@gmail.com"
                  {...field}
                  className="min-h-11 rounded-full"
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
                <div className="relative">
                  <Input
                    {...field}
                    type={isShowPassword ? "text" : "password"}
                    className="min-h-11 rounded-full"
                    placeholder="••••••••"
                  />
                  {isShowPassword ? (
                    <EyeOff
                      className="size-5 absolute top-1/2 -translate-1/2 right-0.5 text-muted-foreground"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <Eye
                      className="size-5 absolute top-1/2 -translate-1/2 right-0.5 text-muted-foreground"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {error && <FormError message={error} />}

        <Button
          type="submit"
          className="rounded-full w-full min-h-11 text-foreground"
        >
          {loading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
