import { BookReferenceType } from "../book/book.types";
import { MemberReferenceType } from "../member/member.type";

export type PostReferenceType = {
  id: string;
  postBy: MemberReferenceType;
  bookRef: BookReferenceType;
};
