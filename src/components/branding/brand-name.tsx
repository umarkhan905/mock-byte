import React from "react";

interface BrandNameProps {
  className?: string;
  name?: string;
}

export default function BrandName({
  className,
  name = "MockByte",
}: BrandNameProps & React.ComponentProps<"span">) {
  return <span className={className}>{name}</span>;
}
