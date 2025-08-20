"use client";
import React from "react";
import {
  TooltipButton,
  TooltipButtonProps,
} from "@/app/_components/ui/toottip-button";
import { cancelOrderAction } from "@/app/_modules/order/order.actions";
import { useLang } from "@/app/_providers/LangProvider";
import { Button } from "@/app/_components/ui/button";

export default function CancelOrderBtn({
  orderId,
  ...props
}: { orderId: string } & React.ComponentProps<typeof Button>) {
  const { langPack } = useLang();
  return (
    <TooltipButton
      variant="outline"
      tooltipContent={langPack.cancelOrder}
      onClick={() => cancelOrderAction({ id: orderId })}
      {...props}
    >
      {langPack.cancelOrder}
    </TooltipButton>
  );
}
