import Link from "next/link";
import React from "react";

interface BackButtonProps {
  className?: string;
  backButtonLabel: string;
  backButtonLink: string;
  backButtonDescription: string;
}

export function BackButton({
  backButtonLabel,
  backButtonLink,
  backButtonDescription,
  className,
  ...props
}: BackButtonProps & React.ComponentProps<"p">) {
  return (
    <p
      className={`text-center text-sm font-medium text-muted-foreground mt-4 ${className}`}
      {...props}
    >
      {backButtonDescription}
      <Link href={backButtonLink} className="text-primary underline ml-1">
        {backButtonLabel}
      </Link>
    </p>
  );
}
