"use server";

import { signIn } from "@/auth";
import { signInSchema, SignInSchemaType } from "@/schemas/signin-schema";
import { errorResponse, successResponse } from "@/utils/api-response";
import { AuthError } from "next-auth";
import { getUserRole } from "./get-user-role";

const signInUser = async (formData: SignInSchemaType) => {
  try {
    const validatedFields = signInSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        success: false,
        message: validatedFields.error.format()._errors.join(", "),
      };
    }

    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    const role = await getUserRole();
    return successResponse(200, "Signed in successfully", { role });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return errorResponse(400, "Incorrect email or password");
        default:
          return errorResponse(
            500,
            (error.cause?.err?.message as string) || "Internal server error"
          );
      }
    }
    throw error;
  }
};

export { signInUser };
