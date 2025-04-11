import React from "react";
import VerifyEmail from "../_components/email-verification";

export default async function EmailVerificationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ code: string }>;
}) {
  const id = (await params).id;
  const code = (await searchParams).code;

  return <VerifyEmail identifier={id as string} code={code as string} />;
}
