import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: string;
}

export default function Logo({
  className,
  variant,
}: LogoProps & React.ComponentProps<"img">) {
  const logoVariants = ["logo-white", "logo-black", "logo-primary"];
  return (
    <Image
      src={`/${
        logoVariants.includes(variant as string) ? variant : "logo-primary"
      }.png`}
      width={100}
      height={100}
      alt="Logo"
      className={`${className}`}
    />
  );
}
