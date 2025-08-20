import { MemberReferenceType } from "@/app/_modules/member/member.type";

export type MessageType = {
  id: string;
  postId: string;

  participant: MemberReferenceType;
  sender: MemberReferenceType;
  receiver: MemberReferenceType;

  sentAt: string;
  content: string;
};
