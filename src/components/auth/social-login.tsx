import React from "react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export function SocialLogin() {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-2">
      <Button
        asChild
        variant={"outline"}
        className="rounded-full min-h-11 cursor-pointer w-full"
      >
        <span>
          <FcGoogle className="size-5" />
          Continue with Google
        </span>
      </Button>
      <Button
        asChild
        variant={"outline"}
        className="rounded-full min-h-11 cursor-pointer w-full"
      >
        <span>
          <FaGithub className="size-5" />
          Continue with GitHub
        </span>
      </Button>
    </div>
  );
}
