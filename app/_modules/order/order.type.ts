import { MemberReferenceType } from "@/app/_modules/member/member.type";
import { PostReferenceType } from "@/app/_modules/post/postRef.type";
import { BookReferenceType } from "../book/book.types";

export type OrderType = {
  id: string;
  orderBy: MemberReferenceType;
  postRef: PostReferenceType;
  createdAt: string;
  completedAt?: string;
  orderStatus: OrderStatus;
};

export enum OrderStatus {
  AVAILABLE = "AVAILABLE",
  CREATED = "CREATED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
