import React from "react";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

interface IconBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function IconBackground({
  className,
  children,
  ...props
}: IconBackgroundProps & React.ComponentProps<"div">) {
  return (
    <div
      className={`flex items-center justify-center bg-primary/20 rounded-full size-14 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface IconProps {
  icon: IconType | LucideIcon;
  className?: string;
}

export function Icon({
  icon: IconTag,
  className,
  ...props
}: IconProps & React.ComponentProps<"svg">) {
  return <IconTag className={`${className}`} {...props} />;
}
