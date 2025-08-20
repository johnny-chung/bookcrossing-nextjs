"use client";
import React from "react";
import { TooltipButton } from "@/app/_components/ui/toottip-button";
import { completeOrderAction } from "@/app/_modules/order/order.actions";
import { useLang } from "@/app/_providers/LangProvider";
import { Button } from "@/app/_components/ui/button";

export default function CompleteOrderBtn({
  orderId,
  ...props
}: { orderId: string } & React.ComponentProps<typeof Button>) {
  const { langPack } = useLang();
  return (
    <TooltipButton
      variant="outline"
      tooltipContent={langPack.markCompleted}
      onClick={() => completeOrderAction({ id: orderId })}
      {...props}
    >
      {langPack.markCompleted}
    </TooltipButton>
  );
}
