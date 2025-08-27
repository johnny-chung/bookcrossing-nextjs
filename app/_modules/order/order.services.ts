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
import { BACKEND_URL } from "@/app/_lib/constant/backend";

const baseUrl = "/api/orders";

export async function createOrder(
  dto: CreateOrderReqestDto
): Promise<CreateOrderResponseDto> {
  const session = await auth();
  console.log("creat post session: ", session);
  if (!session) throw new Error("User not authenticated");

  try {
    const res = await fetch(`${BACKEND_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ ...dto, memberId: session?.user.id }),
    });

    if (!res.ok) {
      throw new Error(`Failed to create order: ${res.statusText}`);
    }

    const resJson = await res.json();
    console.log("create order response: ", resJson);
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
    const res = await fetch(`${BACKEND_URL}/orders/${dto.id}/completed`, {
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
    const res = await fetch(`${BACKEND_URL}/orders/${dto.id}/cancel`, {
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

  const res = await fetch(`${BACKEND_URL}/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: {
      tags: [`order-${orderId}`],
    },
  });

  if (!res.ok) throw new Error(`Failed to fetch order: ${res.statusText}`);
  return res.json();
}

export async function fetchOrdersByMember({
  status,
  search,
}: {
  status?: string | string[];
  search?: string;
}): Promise<OrderType[]> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  const params: URLSearchParams = new URLSearchParams();
  if (status) {
    if (typeof status === "string") {
      params.append("language", status);
    } else if (Array.isArray(status)) {
      status.forEach((s) => params.append("status", s));
    }
  }
  if (search) params.append("search", search);

  try {
    const res = await fetch(
      `${BACKEND_URL}/orders/my-orders${params ? "?" : ""}${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        next: {
          tags: [`member-orders-${session.user.id}`],
        },
      }
    );
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
    const res = await fetch(`${BACKEND_URL}/orders/postId/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: {
        tags: [`post-orders-${postId}`],
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
    const res = await fetch(`${BACKEND_URL}/orders/all`, {
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
