import "next-auth";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    verified?: boolean;
    coins?: number;
    role?: "interviewer" | "interviewee";
  }

  interface Session {
    user: {
      _id?: string;
      verified?: boolean;
      coins?: number;
      role?: "interviewer" | "interviewee";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    verified?: boolean;
    coins?: number;
    role?: "interviewer" | "interviewee";
  }
}
