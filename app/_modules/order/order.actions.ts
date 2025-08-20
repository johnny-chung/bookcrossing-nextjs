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

export async function createOrderAction(
  dto: CreateOrderReqestDto
): Promise<CreateOrderResponseDto> {
  try {
    if (!dto.memberId || !dto.postId) {
      throw new Error("Member ID and Post ID are required");
    }
    const res = await createOrder(dto);
    return res;
  } catch (error: any) {
    throw new Error(error?.message ?? "Something went wrong");
  }
}

export async function completeOrderAction(
  dto: CompleteOrderRequestDto
): Promise<CompleteOrderResponseDto> {
  try {
    if (!dto.id) {
      throw new Error("Order ID is required");
    }
    const res = await completeOrder(dto);
    return res;
  } catch (error: any) {
    throw new Error(error?.message ?? "Something went wrong");
  }
}

export async function cancelOrderAction(
  dto: CancelOrderRequestDto
): Promise<CancelOrderResponseDto> {
  try {
    if (!dto.id) {
      throw new Error("Order ID is required");
    }
    const res = await cancelOrder(dto);
    return res;
  } catch (error: any) {
    throw new Error(error?.message ?? "Something went wrong");
  }
}
