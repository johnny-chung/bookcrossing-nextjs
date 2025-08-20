import { PostReferenceType } from "@/app/_modules/post/postRef.type";
import { OrderStatus } from "@/app/_modules/order/order.type";
import { MemberReferenceType } from "../../member/member.type";

export type CompleteOrderRequestDto = {
  id: string; // Order ID to cancel
};

export type CompleteOrderResponseDto = {
  id: string; // ID of the cancelled order
  orderStatus: OrderStatus; // New status of the order after cancellation
  postRef: PostReferenceType;
  orderBy: MemberReferenceType;
  completedAt: string; // Timestamp when the order was completed
};
