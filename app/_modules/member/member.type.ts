export type MemberType = {
  id: string;
  auth0Id: string;
  name: string;
  email: string;
  rating?: number;
  createdAt: string;
  reservationCnt: number;
  annualTotalReservations: number;
  status: MemberStatus;
  
  hasedResetToken?: string;
  expiryTime?: string;
};

export type MemberReferenceType = {
  id: string;
  auth0Id: string;
  name: string;
};

export enum MemberStatus {
  PENDING = "PENDING",
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
}
