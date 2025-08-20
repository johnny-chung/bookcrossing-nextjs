import { MemberStatus } from "@/app/_modules/member/member.type";

export type MemberDetailsDto = {
  id: string;
  auth0Id: string;
  name: string;
  email: string;
  rating: number;
  createdAt: string;
  reservationCnt: number;
  annualTotalReservations: string;
  status: MemberStatus;
};
