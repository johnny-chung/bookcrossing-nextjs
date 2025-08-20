import {
  CreateOrderReqestDto,
  CreateOrderResponseDto,
} from "../dto/create-order.dto";
import {
  CompleteOrderRequestDto,
  CompleteOrderResponseDto,
} from "../dto/complete-order.dto";
import {
  CancelOrderRequestDto,
  CancelOrderResponseDto,
} from "../dto/cancel-order.dto";
import { OrderStatus } from "../order.type";
import { MemberReferenceType } from "../../member/member.type";
import { PostReferenceType } from "../../post/postRef.type";
import { BookReferenceType } from "../../book/book.types";
const mockMember: MemberReferenceType = {
  id: "mock-member-id",
  auth0Id: "mock-auth0-id",
  name: "Mock User",
};

const mockBookRef = {
  id: "mock-book-id",
  title: "Mock Book",
};

const mockBook: BookReferenceType = {
  id: "123",
  title: "Test Book",
  thumbnail:
    "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs-api",
};
const mockPostRef: PostReferenceType = {
  id: "mock-post-id",
  postBy: mockMember,
  bookRef: mockBook,
};

export async function createOrderAction(
  dto: CreateOrderReqestDto
): Promise<CreateOrderResponseDto> {
  return {
    id: "mock-order-id",
    orderBy: mockMember,
    postRef: mockPostRef,
    createdAt: new Date().toISOString(),
    orderStatus: OrderStatus.CREATED,
  };
}

export async function completeOrderAction(
  dto: CompleteOrderRequestDto
): Promise<CompleteOrderResponseDto> {
  return {
    id: dto.id,
    orderStatus: OrderStatus.COMPLETED,
    postRef: mockPostRef,
    orderBy: mockMember,
    completedAt: new Date().toISOString(),
  };
}

export async function cancelOrderAction(
  dto: CancelOrderRequestDto
): Promise<CancelOrderResponseDto> {
  return {
    id: dto.id,
    orderStatus: OrderStatus.CANCELLED,
    postRef: mockPostRef,
  };
}
