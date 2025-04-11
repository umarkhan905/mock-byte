"use server";

import { connectDB } from "@/config/db";
import User from "@/models/user-model";
import { errorResponse, successResponse } from "@/utils/api-response";

const vrifyEmail = async (identifier: string, verificationCode: string) => {
  await connectDB();

  try {
    const interviewee = await User.findById(identifier);
    if (!interviewee) {
      return errorResponse(404, "Interviewee not found");
    }

    if (interviewee.verificationToken !== verificationCode) {
      return errorResponse(400, "Invalid verification code");
    }

    if (interviewee.verificationTokenExpiresAt < Date.now()) {
      return errorResponse(400, "Verification code has expired");
    }

    interviewee.verified = true;
    interviewee.verifiedAt = new Date();
    interviewee.verificationToken = null;
    interviewee.verificationTokenExpiresAt = null;
    await interviewee.save();

    return successResponse(200, "Email verified successfully");
  } catch (error) {
    console.log("Error occurs while verifying email: ", error);
    return errorResponse(500, "Internal server error");
  }
};

export { vrifyEmail };
