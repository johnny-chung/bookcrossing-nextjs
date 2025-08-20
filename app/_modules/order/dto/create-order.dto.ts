import { MemberReferenceType } from "@/app/_modules/member/member.type";
import { PostReferenceType } from "@/app/_modules/post/postRef.type";
import { OrderStatus } from "@/app/_modules/order/order.type";

export type CreateOrderReqestDto = {
  postId: string;
};

export type CreateOrderResponseDto = {
  id: string;
  orderBy: MemberReferenceType;
  postRef: PostReferenceType;
  createdAt: string;
  orderStatus: OrderStatus;
};
