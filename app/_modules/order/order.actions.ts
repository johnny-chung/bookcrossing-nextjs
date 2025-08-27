"use server";

import {
  CreateOrderReqestDto,
  CreateOrderResponseDto,
} from "@/app/_modules/order/dto/create-order.dto";
import { cancelOrder, completeOrder, createOrder } from "./order.services";
import {
  CompleteOrderRequestDto,
  CompleteOrderResponseDto,
} from "@/app/_modules/order/dto/complete-order.dto";
import {
  CancelOrderRequestDto,
  CancelOrderResponseDto,
} from "@/app/_modules/order/dto/cancel-order.dto";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function createOrderAction(
  dto: CreateOrderReqestDto
): Promise<void> {
  let res: CreateOrderResponseDto;
  try {
    if (!dto.postId) {
      throw new Error("Post ID are required");
    }
    res = await createOrder(dto);
  } catch (error: any) {
    throw new Error(error?.message ?? "Something went wrong");
  }
  redirect(`/member/my-reservations/${res.id}`);
}

export async function completeOrderAction(
  dto: CompleteOrderRequestDto
): Promise<CompleteOrderResponseDto> {
  try {
    if (!dto.id) {
      throw new Error("Order ID is required");
    }
    const res = await completeOrder(dto);
    revalidateTag(`order-${dto.id}`);
    return res;
  } catch (error: any) {
    throw new Error(error?.message ?? "Something went wrong");
  }
}

export async function cancelOrderAction(
  dto: CancelOrderRequestDto
): Promise<void> {
  let res: CancelOrderResponseDto;
  try {
    if (!dto.id) {
      throw new Error("Order ID is required");
    }
    res = await cancelOrder(dto);
    revalidateTag(`order-${dto.id}`);
  } catch (error: any) {
    throw new Error(error?.message ?? "Something went wrong");
  }
  redirect(`/member/my-reservations`);
}
