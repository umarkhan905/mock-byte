import React from "react";
import {
  FormCard,
  FormCardContent,
  FormCardFooter,
} from "@/components/form/form-card";
import { SocialLoginSeperator } from "@/components/auth/social-login-separator";
import { SocialLogin } from "@/components/auth/social-login";
import { SignupForm } from "./signup-form";
import { BackButton } from "@/components/auth/back-button";

export function IntervieweeSignup() {
  return (
    <FormCard
      cardLabel="Create account as Interviewee"
      cardDescription="Create your free account and start your interview journey today!"
    >
      <FormCardContent>
        <SignupForm />
        <BackButton
          backButtonLabel="Sign In"
          backButtonLink="/sign-in"
          backButtonDescription="Already have an account?"
        />
      </FormCardContent>

      <FormCardFooter className="flex flex-col">
        <SocialLoginSeperator />
        <SocialLogin />
      </FormCardFooter>
    </FormCard>
  );
}
