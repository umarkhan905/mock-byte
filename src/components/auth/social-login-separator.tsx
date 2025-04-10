import React from "react";
import { Separator } from "@/components/ui/separator";

export function SocialLoginSeperator() {
  return (
    <div className="w-full flex items-center justify-center gap-2 my-3 overflow-x-hidden">
      <Separator className="bg-muted" />
      <span className="text-sm font-medium text-muted-foreground">or</span>
      <Separator />
    </div>
  );
}
