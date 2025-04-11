import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
import { Tailwind } from "@react-email/tailwind";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Img } from "@react-email/img";

type EmailVerificationProps = {
  userName?: string;
  verificationUrl: string;
  verificationCode: string;
};

export default function EmailVerification({
  userName = "there",
  verificationUrl,
  verificationCode,
}: EmailVerificationProps) {
  return (
    <Html>
      <Tailwind>
        <Section className="bg-gray-100 py-10 px-0 w-full">
          <Container className="bg-white rounded-xl shadow-lg mx-auto max-w-md px-8 py-10">
            <Img
              src="https://mock-byte.vercel.app/logo-primary.png"
              alt="MockByte Logo"
              width="120"
              className="mx-auto mb-6"
            />

            <Heading as="h2" className="text-xl font-bold text-center mb-4">
              Verify your email address
            </Heading>

            <Text className="text-base text-gray-700 text-center mb-4">
              Hi {userName},<br />
              Use the verification code below or click the button to confirm
              your email address.
            </Text>

            {/* Verification Code */}
            <div className="bg-gray-100 text-center text-xl font-mono tracking-widest font-semibold py-4 rounded-lg text-gray-800 mb-6">
              {verificationCode}
            </div>

            {/* Button */}
            <div className="text-center mb-6">
              <Button
                href={verificationUrl}
                className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Verify Email
              </Button>
            </div>

            <Text className="text-sm text-gray-500 text-center">
              If you didn’t request this, you can ignore this email.
            </Text>
          </Container>
        </Section>
      </Tailwind>
    </Html>
  );
}
