import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "@/utils/compare-password";
import { signInSchema } from "@/schemas/signin-schema";
import { connectDB } from "@/config/db";
import { getUserByEmail } from "./user";

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        await connectDB();

        const validatedFields = signInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          if (!user.verified)
            throw new Error("Please verify your email to continue!");

          const isPasswordCorrect = await comparePassword(
            password,
            user.password
          );
          if (!isPasswordCorrect) return null;

          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
};
