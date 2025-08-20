"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { ReactNode } from "react";
import { cn } from "@/app/_lib/utils/shadcn";

export default function TooltipWrapper({
  children,
  toolTipsContent,
  className,
  sideOffset = 3,
}: {
  children: ReactNode;
  toolTipsContent: ReactNode;
  className?: string;
  sideOffset?: number;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        className={cn(
          "px-4 py-2 rounded-sm text-sm shadow-md select-none",
          className
        )}
        sideOffset={sideOffset}
      >
        {toolTipsContent}
      </TooltipContent>
    </Tooltip>
  );
}
