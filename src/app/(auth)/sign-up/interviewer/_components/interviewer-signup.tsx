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

export function InterviewerSignup() {
  return (
    <FormCard
      cardLabel="Create account as Interviewer"
      cardDescription="Join to conduct interviews and share your expertise."
    >
      <FormCardContent>
        <SignupForm />
        <BackButton
          backButtonLabel="Sign In"
          backButtonLink="/sign-in/interviewer"
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
