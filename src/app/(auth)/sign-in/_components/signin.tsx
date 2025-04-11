import React from "react";
import {
  FormCard,
  FormCardContent,
  FormCardFooter,
} from "@/components/form/form-card";
import { SocialLoginSeperator } from "@/components/auth/social-login-separator";
import { SocialLogin } from "@/components/auth/social-login";
import { SignInForm } from "./signin-form";
import { BackButton } from "@/components/auth/back-button";

export function SignIn() {
  return (
    <FormCard
      cardLabel="Welcome back to mock byte"
      cardDescription="Login to your account and start your interview journey today!"
    >
      <FormCardContent>
        <SignInForm />
        <BackButton
          backButtonLabel="Sign Up"
          backButtonLink="/sign-up/interviewee"
          backButtonDescription="Don't have an account?"
        />
      </FormCardContent>

      <FormCardFooter className="flex flex-col">
        <SocialLoginSeperator />
        <SocialLogin />
      </FormCardFooter>
    </FormCard>
  );
}
