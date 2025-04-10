import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      {children}
    </main>
  );
}
