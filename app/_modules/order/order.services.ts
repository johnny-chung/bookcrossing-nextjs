import "server-only";
import { auth } from "@/app/_lib/authentication/auth";
import {
  CreateOrderReqestDto,
  CreateOrderResponseDto,
} from "@/app/_modules/order/dto/create-order.dto";
import { OrderType } from "@/app/_modules/order/order.type";
import {
  CompleteOrderRequestDto,
  CompleteOrderResponseDto,
} from "@/app/_modules/order/dto/complete-order.dto";
import {
  CancelOrderRequestDto,
  CancelOrderResponseDto,
} from "./dto/cancel-order.dto";

const baseUrl = "/api/orders";

export async function createOrder(
  dto: CreateOrderReqestDto
): Promise<CreateOrderResponseDto> {
  const session = await auth();
  console.log("creat post session: ", session);
  if (!session) throw new Error("User not authenticated");
  
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dto, memberId: session?.user.id }),
    });

    if (!res.ok) {
      throw new Error(`Failed to create post: ${res.statusText}`);
    }

    const resJson = await res.json();
    return resJson;
  } catch (error) {
    throw error;
  }
}

export async function completeOrder(
  dto: CompleteOrderRequestDto
): Promise<CompleteOrderResponseDto> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  try {
    const res = await fetch(`${baseUrl}/${dto.id}/completed`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) throw new Error(`Failed to complete order: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function cancelOrder(
  dto: CancelOrderRequestDto
): Promise<CancelOrderResponseDto> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  try {
    const res = await fetch(`${baseUrl}/${dto.id}/cancel`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) throw new Error(`Failed to complete order: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchOrderById(orderId: string): Promise<OrderType> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  const res = await fetch(`${baseUrl}/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch order: ${res.statusText}`);
  return res.json();
}

export async function fetchOrdersByMember() {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");
  try {
    const res = await fetch(`${baseUrl}/my-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch order: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchOrdersByPost(postId: string): Promise<OrderType[]> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  try {
    const res = await fetch(`${baseUrl}/postId/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch order: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchAllOrders(): Promise<OrderType[]> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  try {
    const res = await fetch(`${baseUrl}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch orders: ${res.statusText}`);
    return res.json();
  } catch (error) {
    throw error;
  }
}
