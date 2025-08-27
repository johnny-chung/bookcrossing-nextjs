import { BookReferenceType } from "../../book/book.types";
import { MemberReferenceType } from "../../member/member.type";

export type GetParticipantListRequestByPost = {
  postId: string;
};

export type GetParticipantListResponseByPost = {
  postId: string;
  bookRef: BookReferenceType;
  participants: MemberReferenceType[];
};

export type GetParticipantListByAuth0Id = GetParticipantListResponseByPost[];
