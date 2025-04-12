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
import { type SignInSchemaType, signInSchema } from "@/schemas/signin-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInUser } from "@/actions/login";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FormError from "@/components/form/form-error";
import { Loader2 } from "lucide-react";

export function SignInForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInSchemaType) {
    setLoading(true);
    setError("");
    try {
      const res = await signInUser(values);
      console.log("res", res);
      if (!res?.success) {
        setError(res?.message as string);
        return;
      }
      toast(res.message);
      router.push("/dashboard/interviewee");
    } catch (error) {
      console.log("Error Signin user:", error);
      setError("Internal server error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Input
                  {...field}
                  className="min-h-11 rounded-full"
                  placeholder="••••••••"
                />
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
          {loading ? <Loader2 className="animate-spin size-6" /> : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
