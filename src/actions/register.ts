"use server";

import { connectDB } from "@/config/db";
import User from "@/models/user-model";
import {
  intervieweeSignupSchema,
  intervieweeSignupSchemaType,
} from "@/schemas/interviewee-signup-schema";
import { errorResponse, successResponse } from "@/utils/api-response";
import { hashPassword } from "@/utils/hash-password";
import { emailVerificationCode } from "@/utils/verification-code";
import { sendEmail } from "@/utils/send-email";
import EmailVerification from "@/emails/email-verification";
import { BASE_ADDRESS } from "@/constants/base-address";
import { interviewerSignupSchemaType } from "@/schemas/interviewer-signup-schema";

const registerInterviewee = async (formData: intervieweeSignupSchemaType) => {
  await connectDB();

  try {
    const { data, error } =
      await intervieweeSignupSchema.safeParseAsync(formData);
    if (error) {
      return errorResponse(400, error.format()._errors.join(", "));
    }

    const existingInterviewee = await User.findOne({ email: data.email });
    if (existingInterviewee) {
      return errorResponse(400, "Interviewee already exists with this email");
    }

    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;

    // generate verification code
    const verificationCode = emailVerificationCode();
    const verificationCodeExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hours from now

    const interviewee = await User.create({
      ...data,
      verificationToken: verificationCode.toString(),
      verificationTokenExpiresAt: verificationCodeExpiresAt,
    });
    if (!interviewee) {
      return errorResponse(500, "Internal server error");
    }

    // send verification email
    const res = await sendEmail(
      data.email,
      "MockByte - Verify your email",
      EmailVerification({
        userName: data.firstName,
        verificationUrl: `${BASE_ADDRESS}/verify/${interviewee._id.toString()}?code=${verificationCode}`,
        verificationCode: verificationCode.toString(),
      })
    );

    if (res.error) {
      console.log("Error sending verification email", res.error);
      return errorResponse(
        500,
        "Something went wrong while sending verification email"
      );
    }

    return successResponse(
      201,
      "Interviewee signup successful. Please verify your email",
      { id: interviewee._id.toString() }
    );
  } catch (error) {
    console.log("Error occurs while creating interviewee", error);
    return errorResponse(500, "Internal server error");
  }
};
const registerInterviewer = async (formData: interviewerSignupSchemaType) => {
  await connectDB();

  try {
    const { data, error } =
      await intervieweeSignupSchema.safeParseAsync(formData);
    if (error) {
      return errorResponse(400, error.format()._errors.join(", "));
    }

    const existingInterviewee = await User.findOne({ email: data.email });
    if (existingInterviewee) {
      return errorResponse(400, "Interviewer already exists with this email");
    }

    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;

    // generate verification code
    const verificationCode = emailVerificationCode();
    const verificationCodeExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hours from now

    const interviewee = await User.create({
      ...data,
      role: "interviewer",
      verificationToken: verificationCode.toString(),
      verificationTokenExpiresAt: verificationCodeExpiresAt,
    });
    if (!interviewee) {
      return errorResponse(500, "Internal server error");
    }

    // send verification email
    const res = await sendEmail(
      data.email,
      "MockByte - Verify your email",
      EmailVerification({
        userName: data.firstName,
        verificationUrl: `${BASE_ADDRESS}/verify/${interviewee._id.toString()}?code=${verificationCode}`,
        verificationCode: verificationCode.toString(),
      })
    );

    if (res.error) {
      console.log("Error sending verification email", res.error);
      return errorResponse(
        500,
        "Something went wrong while sending verification email"
      );
    }

    return successResponse(
      201,
      "Interviewer signup successful. Please verify your email",
      { id: interviewee._id.toString() }
    );
  } catch (error) {
    console.log("Error occurs while creating interviewee", error);
    return errorResponse(500, "Internal server error");
  }
};

export { registerInterviewee, registerInterviewer };
