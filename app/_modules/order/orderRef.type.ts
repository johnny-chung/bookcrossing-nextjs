import { MemberReferenceType } from "../member/member.type";

export type OrderReferenceType = {
  id: string;
  orderBy: MemberReferenceType;
};
