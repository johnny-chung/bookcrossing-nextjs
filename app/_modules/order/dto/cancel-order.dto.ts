import { PostReferenceType } from "@/app/_modules/post/postRef.type";
import { OrderStatus } from "@/app/_modules/order/order.type";

export type CancelOrderRequestDto = {
  id: string; // Order ID to cancel
};

export type CancelOrderResponseDto = {
  id: string; // ID of the cancelled order
  orderStatus: OrderStatus; // New status of the order after cancellation
  postRef: PostReferenceType; // Reference to the post associated with the order
};
