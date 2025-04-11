import { resend } from "@/lib/resend";

export const sendEmail = async (
  to: string,
  subject: string,
  react: React.ReactElement
) => {
  const res = await resend.emails.send({
    from: "MockByte <onboarding@resend.dev>",
    to: [to],
    subject,
    react,
  });

  return res;
};
