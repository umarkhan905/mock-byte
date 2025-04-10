import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/branding/logo";

interface FormCardProps {
  cardLabel: string;
  cardDescription: string;
  children?: Readonly<React.ReactNode>;
  className?: string;
}

export function FormCard({
  cardDescription,
  cardLabel,
  children,
  className,
  ...props
}: FormCardProps & React.ComponentProps<"div">) {
  return (
    <Card className={`max-w-xl w-full group mx-auto ${className}`} {...props}>
      <CardHeader>
        <div className="flex items-center justify-center size-14 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-all duration-300">
          <Logo variant="logo-primary" className="w-auto h-10" />
        </div>

        <CardTitle className="text-xl font-medium">{cardLabel}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>

      {children}
    </Card>
  );
}

interface FormCardContentProps {
  children?: Readonly<React.ReactNode>;
}

export const FormCardContent = ({
  children,
  ...props
}: FormCardContentProps & React.ComponentProps<"div">) => {
  return <CardContent {...props}>{children}</CardContent>;
};

interface FormCardFooterProps {
  children?: Readonly<React.ReactNode>;
}

export const FormCardFooter = ({
  children,
  ...props
}: FormCardFooterProps & React.ComponentProps<"div">) => {
  return <CardFooter {...props}>{children}</CardFooter>;
};
