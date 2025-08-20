"use client";
import { Button } from "@/app/_components/ui/button";
import { TooltipButton } from "@/app/_components/ui/toottip-button";
import { useLang } from "@/app/_providers/LangProvider";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackBtn({
  ...props
}: React.ComponentProps<typeof Button>) {
  const { langPack } = useLang();
  const router = useRouter();
  return (
    <TooltipButton
      variant="outline"
      tooltipContent={langPack.back}
      onClick={() => router.back()}
      className="mx-auto"
      {...props}
    >
      {langPack.back}
    </TooltipButton>
  );
}
