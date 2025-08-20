"use client";
import React from "react";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { cn } from "@/app/_lib/utils/shadcn";

export type TooltipButtonProps = React.ComponentProps<typeof Button> & {
  tooltipContent: React.ReactNode;
};

export function TooltipButton({
  tooltipContent,
  ...props
}: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...props} />
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}
