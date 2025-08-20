import { BookReferenceType, BookType } from "@/app/_modules/book/book.types";
import { MemberReferenceType } from "@/app/_modules/member/member.type";
import { OrderReferenceType } from "@/app/_modules/order/orderRef.type";

export type PostType = {
  id: string;
  postBy: MemberReferenceType;
  bookRef: BookReferenceType;

  location: string;
  remarks?: string;
  createdAt: string;

  orderRef?: OrderReferenceType;

  postStatus: PostStatus;
};

export enum PostStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  COMPLETED = "COMPLETED",
  DELETED = "DELETED",
}
