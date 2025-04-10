import * as z from "zod";

const intervieweeSignupSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "First name is required" })
    .min(3, {
      message: "First name must be at least 3 characters long",
    })
    .regex(/^[a-zA-Z]+$/, {
      message: "First name contains letters only",
    })
    .regex(/^\S+$/, { message: "First name cannot contain spaces" }),

  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, {
      message: "Last name contains letters only",
    })
    .regex(/^\S+$/, { message: "Last name cannot contain spaces" }),

  email: z
    .string()
    .email()
    .regex(/^\S+$/, { message: "Email cannot contain spaces" }),

  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      }
    )
    .regex(/^\S+$/, { message: "Password cannot contain spaces" }),
});

type intervieweeSignupSchemaType = z.infer<typeof intervieweeSignupSchema>;

export { intervieweeSignupSchema, type intervieweeSignupSchemaType };
