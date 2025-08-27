import { OrderType, OrderStatus } from "../order.type";
import { MemberReferenceType } from "../../member/member.type";
import { PostReferenceType } from "../../post/postRef.type";
import { BookReferenceType } from "../../book/book.types";

const mockBookRef: BookReferenceType = {
  id: "book-1",
  title: "Mock Book Title",
  thumbnail: "/default-book-thumbnail.png",
};

const mockMemberRef: MemberReferenceType = {
  id: "member-1",
  auth0Id: "auth0|mockuser1",
  name: "John Doe",
};

const mockPostRef: PostReferenceType = {
  id: "post-1",
  postBy: mockMemberRef,
  bookRef: mockBookRef,
};

export const mockOrder: OrderType = {
  id: "order-1",
  orderBy: mockMemberRef,
  postRef: mockPostRef,
  createdAt: "2025-08-01T10:00:00.000Z",
  completedAt: "2025-08-02T12:00:00.000Z",
  orderStatus: OrderStatus.PENDING,
};

export const mockOrders: OrderType[] = [
  mockOrder,
  {
    id: "order-2",
    orderBy: {
      ...mockMemberRef,
      id: "member-2",
      name: "Jane Smith",
      auth0Id: "auth0|mockuser2",
    },
    postRef: {
      ...mockPostRef,
      id: "post-2",
      postBy: {
        ...mockMemberRef,
        id: "member-2",
        name: "Jane Smith",
        auth0Id: "auth0|mockuser2",
      },
    },
    createdAt: "2025-08-03T09:00:00.000Z",
    orderStatus: OrderStatus.PENDING,
  },
  {
    id: "order-3",
    orderBy: {
      ...mockMemberRef,
      id: "member-3",
      name: "Alice Lee",
      auth0Id: "auth0|mockuser3",
    },
    postRef: {
      ...mockPostRef,
      id: "post-3",
      postBy: {
        ...mockMemberRef,
        id: "member-3",
        name: "Alice Lee",
        auth0Id: "auth0|mockuser3",
      },
      bookRef: { ...mockBookRef, id: "book-2", title: "Another Book" },
    },
    createdAt: "2025-08-04T14:30:00.000Z",
    completedAt: "2025-08-05T10:00:00.000Z",
    orderStatus: OrderStatus.COMPLETED,
  },
  {
    id: "order-4",
    orderBy: {
      ...mockMemberRef,
      id: "member-4",
      name: "Bob Chan",
      auth0Id: "auth0|mockuser4",
    },
    postRef: {
      ...mockPostRef,
      id: "post-4",
      postBy: {
        ...mockMemberRef,
        id: "member-4",
        name: "Bob Chan",
        auth0Id: "auth0|mockuser4",
      },
      bookRef: { ...mockBookRef, id: "book-3", title: "Book Three" },
    },
    createdAt: "2025-08-05T08:00:00.000Z",
    orderStatus: OrderStatus.CREATED,
  },
  {
    id: "order-5",
    orderBy: {
      ...mockMemberRef,
      id: "member-5",
      name: "Cathy Wong",
      auth0Id: "auth0|mockuser5",
    },
    postRef: {
      ...mockPostRef,
      id: "post-5",
      postBy: {
        ...mockMemberRef,
        id: "member-5",
        name: "Cathy Wong",
        auth0Id: "auth0|mockuser5",
      },
      bookRef: { ...mockBookRef, id: "book-4", title: "Book Four" },
    },
    createdAt: "2025-08-06T11:00:00.000Z",
    orderStatus: OrderStatus.CANCELED,
  },
];
