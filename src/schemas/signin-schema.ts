import * as z from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(/^\S+$/, { message: "Email cannot contain spaces" })
    .email({ message: "Invalid email format" }),

  password: z.string().min(1, { message: "Password is required" }),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

export { signInSchema, type SignInSchemaType };
