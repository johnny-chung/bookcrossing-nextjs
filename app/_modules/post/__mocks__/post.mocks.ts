import { BookReferenceType } from "@/app/_modules/book/book.types";
import { MemberReferenceType } from "@/app/_modules/member/member.type";
import { CreatePostRequestDto } from "@/app/_modules/post/dto/create-post-request.dto";
import { PostDetailDto } from "@/app/_modules/post/dto/post-detail.dto";
import { PostListDto } from "@/app/_modules/post/dto/post-list.dto";
import { PostStatus } from "@/app/_modules/post/post.type";

const mockMember: MemberReferenceType = {
  id: "0fa1f2aa-ac5d-4a25-9612-68219db123f5",
  auth0Id: "auth0|123456",
  name: "John Doe",
};

const mockBook: BookReferenceType = {
  id: "123",
  title: "Test Book",
  thumbnail:
    "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs-api",
};

export const mockPost: PostDetailDto = {
  id: "1",
  postBy: mockMember,
  bookRef: mockBook,
  location: "Test Location",
  createdAt: new Date().toISOString(),
  remarks: "Test Remarks",
  orderRef: {
    id: "456",
    orderBy: mockMember,
  },
  postStatus: PostStatus.RESERVED,
  bookDetails: {
    id: "123",
    title: "Test Book",
    authors: "Jane Doe",
    isbn: "978-3-16-148410-0",
    category: "Fiction",
    language: "English",
    description: "A test book description.",
    textSnippet: "This is a snippet of the book.",
    thumbnail:
      "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs-api",
    imgLarge:
      "https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs-api",
  },
};

export const mockPosts: PostListDto = [
  {
    id: "1",
    postBy: mockMember,
    bookRef: mockBook,
    location: "Test Location",
    createdAt: new Date().toISOString(),
    remarks: "Test Remarks",
    orderRef: {
      id: "456",
      orderBy: mockMember,
    },
    postStatus: PostStatus.AVAILABLE,
  },
  {
    id: "2",
    postBy: { id: "2", auth0Id: "auth0|789", name: "Alice Smith" },
    bookRef: {
      id: "789",
      title: "Another Test Book",
      thumbnail: mockBook.thumbnail,
    },
    location: "Another Location",
    createdAt: new Date().toISOString(),
    remarks: "Another Test Remarks",
    orderRef: {
      id: "987",
      orderBy: { id: "3", auth0Id: "auth0|456", name: "Bob Brown" },
    },
    postStatus: PostStatus.RESERVED,
  },
  {
    id: "3",
    postBy: { id: "3", auth0Id: "auth0|123", name: "Charlie Johnson" },
    bookRef: {
      id: "456",
      title: "Third Test Book",
      thumbnail: mockBook.thumbnail,
    },
    location: "Third Location",
    createdAt: new Date().toISOString(),
    remarks: "Third Test Remarks",
    orderRef: {
      id: "654",
      orderBy: { id: "4", auth0Id: "auth0|789", name: "Diana Prince" },
    },
    postStatus: PostStatus.AVAILABLE,
  },
  {
    id: "4",
    postBy: { id: "4", auth0Id: "auth0|456", name: "Eve Adams" },
    bookRef: {
      id: "101",
      title: "Fourth Test Book",
      thumbnail: mockBook.thumbnail,
    },
    location: "Fourth Location",
    createdAt: new Date().toISOString(),
    remarks: "Fourth Test Remarks",
    orderRef: {
      id: "321",
      orderBy: { id: "5", auth0Id: "auth0|123", name: "Frank Castle" },
    },
    postStatus: PostStatus.RESERVED,
  },
  {
    id: "5",
    postBy: { id: "5", auth0Id: "auth0|789", name: "Grace Lee" },
    bookRef: {
      id: "202",
      title: "Fifth Test Book",
      thumbnail: mockBook.thumbnail,
    },
    location: "Fifth Location",
    createdAt: new Date().toISOString(),
    remarks: "Fifth Test Remarks",
    orderRef: {
      id: "789",
      orderBy: { id: "6", auth0Id: "auth0|456", name: "Hank Pym" },
    },
    postStatus: PostStatus.RESERVED,
  },
  {
    id: "6",
    postBy: { id: "6", auth0Id: "auth0|123", name: "Ivy Green" },
    bookRef: {
      id: "303",
      title: "Sixth Test Book",
      thumbnail: mockBook.thumbnail,
    },
    location: "Sixth Location",
    createdAt: new Date().toISOString(),
    remarks: "Sixth Test Remarks",
    orderRef: {
      id: "987",
      orderBy: { id: "7", auth0Id: "auth0|789", name: "Jack Sparrow" },
    },
    postStatus: PostStatus.COMPLETED,
  },
  {
    id: "7",
    postBy: { id: "7", auth0Id: "auth0|456", name: "Karen White" },
    bookRef: {
      id: "404",
      title: "Seventh Test Book",
      thumbnail: mockBook.thumbnail,
    },
    location: "Seventh Location",
    createdAt: new Date().toISOString(),
    remarks: "Seventh Test Remarks",
    orderRef: {
      id: "654",
      orderBy: { id: "8", auth0Id: "auth0|123", name: "Liam Neeson" },
    },
    postStatus: PostStatus.AVAILABLE,
  },
  {
    id: "8",
    postBy: { id: "8", auth0Id: "auth0|789", name: "Mona Black" },
    bookRef: {
      id: "505",
      title: "Eighth Test Book",
      thumbnail: mockBook.thumbnail,
    },
    location: "Eighth Location",
    createdAt: new Date().toISOString(),
    remarks: "Eighth Test Remarks",
    orderRef: {
      id: "321",
      orderBy: { id: "9", auth0Id: "auth0|456", name: "Nina Simone" },
    },
    postStatus: PostStatus.COMPLETED,
  },
  {
    id: "9",
    postBy: { id: "9", auth0Id: "auth0|123", name: "Oscar Brown" },
    bookRef: {
      id: "606",
      title: "Ninth Test Book",
      thumbnail: mockBook.thumbnail,
    },
    location: "Ninth Location",
    createdAt: new Date().toISOString(),
    remarks: "Ninth Test Remarks",
    orderRef: {
      id: "789",
      orderBy: { id: "10", auth0Id: "auth0|789", name: "Paul Walker" },
    },
    postStatus: PostStatus.AVAILABLE,
  },
  {
    id: "10",
    postBy: { id: "10", auth0Id: "auth0|456", name: "Quincy Red" },
    bookRef: {
      id: "707",
      title: "Tenth Test Book",
      thumbnail: mockBook.thumbnail,
    },
    location: "Tenth Location",
    createdAt: new Date().toISOString(),
    remarks: "Tenth Test Remarks",
    orderRef: {
      id: "987",
      orderBy: { id: "11", auth0Id: "auth0|123", name: "Rachel Green" },
    },
    postStatus: PostStatus.COMPLETED,
  },
];

export const mockCreatePostDto: CreatePostRequestDto = {
  postById: "0fa1f2aa-ac5d-4a25-9612-68219db123f5",
  isbn: "055380457X",
  location: "Test Location",
  remarks: "Test Remarks", // Updated to use PostStatus enum
};
