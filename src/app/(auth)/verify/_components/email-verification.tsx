"use client"; // if using app router

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { IconBackground } from "@/components/icons/icon-bg";
import Logo from "@/components/branding/logo";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { vrifyEmail } from "@/actions/verify";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import FormError from "@/components/form/form-error";
import { toast } from "sonner";

export default function VerifyEmail({
  identifier,
  code: verificationCode,
}: {
  identifier: string;
  code: string;
}) {
  const [code, setCode] = useState(verificationCode || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleEmailVeirification = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await vrifyEmail(identifier, code);
      if (!res.success) {
        setError(res.message);
        return;
      }

      toast(res.message);
      router.push("/sign-in");
    } catch (error) {
      console.log("Error occurs while verifying email: ", error);
      setError("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md w-full text-center">
      {/* Illustration or Logo */}
      <CardHeader className="flex flex-col gap-2 items-center">
        <IconBackground className="size-20">
          <Logo variant="logo-primary" className="w-auto h-14" />
        </IconBackground>

        <CardTitle className="text-2xl font-semibold text-foreground">
          Verify Your Email Address
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          We sent a 6-digit verification code to your email. Enter the code
          below to verify.
        </CardDescription>
      </CardHeader>

      {/* OTP Boxes */}
      <CardContent className="flex items-center justify-center flex-col gap-2">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(value) => setCode(value)}
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, index) => (
              <InputOTPSlot
                index={index}
                key={index}
                className="size-13 text-center text-xl border-muted rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mx-1"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {error && <FormError message={error} />}
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="flex flex-col gap-3">
        <Button
          className="w-full rounded-full min-h-11 text-foreground"
          disabled={code.length < 6 || loading}
          onClick={handleEmailVeirification}
        >
          {loading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            "Verify Email"
          )}
        </Button>

        <p className="text-sm text-muted-foreground cursor-pointer hover:underline">
          Resend Code
        </p>
      </CardFooter>
    </Card>
  );
}
