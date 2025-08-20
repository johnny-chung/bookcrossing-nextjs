"use client";
import { Button } from "@/app/_components/ui/button";
import { TooltipButton } from "@/app/_components/ui/toottip-button";
import { createOrderAction } from "@/app/_modules/order/order.actions";
import { useLang } from "@/app/_providers/LangProvider";
import React from "react";

export default function ReserveBtn({
  postId,
  ...props
}: { postId: string } & React.ComponentProps<typeof Button>) {
  const { langPack } = useLang();
  return (
    <TooltipButton
      variant="outline"
      tooltipContent={langPack.reserve}
      onClick={() => createOrderAction({ postId })}
      {...props}
    >
      {langPack.reserve}
    </TooltipButton>
  );
}
