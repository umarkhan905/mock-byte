// import { hashPassword } from "@/utils/hash-password";
import mongoose, { Document } from "mongoose";
// import bcrypt from "bcryptjs";

interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  companyName?: string;
  position?: string;
  role: "interviewer" | "interviewee";
  mobile?: string;
  experience?: {
    in: "years" | "months";
    value: number;
  };
  bio?: string;
  linkedin?: string;
  github?: string;
  resume?: string;
  location?: string;
  coins: number;
  verified: boolean;
  verifiedAt: Date;
  verificationToken: string;
  verificationTokenExpiresAt: Date;
  resetPasswordToken: string;
  resetPasswordTokenExpiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    companyName: {
      type: String,
    },
    position: {
      type: String,
    },
    role: {
      type: String,
      enum: ["interviewer", "interviewee"],
      default: "interviewee",
    },
    mobile: {
      type: String,
    },
    experience: {
      in: {
        type: String,
        enum: ["years", "months"],
      },
      value: {
        type: Number,
      },
    },
    bio: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    resume: {
      type: String,
    },
    location: {
      type: String,
    },
    coins: {
      type: Number,
      default: 30,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiresAt: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User<IUser> || mongoose.model("User", userSchema);

export default User;
