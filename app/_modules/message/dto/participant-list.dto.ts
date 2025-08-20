import { MemberReferenceType } from "../../member/member.type";

export type GetParticipantListRequestByPost = {
  postId: string;
};

export type GetParticipantListResponseByPost = {
  postId: string;
  participants: MemberReferenceType[];
};

export type GetParticipantListByAuth0Id = GetParticipantListResponseByPost[];
