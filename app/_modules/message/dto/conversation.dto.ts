import { MessageType } from "../message.type";

export type GetConversationRequest = {
  postId: string;
  participantId: string;
  page: number;
  limit: number;
  nextMsgId?: string;
};

export type GetConversationResponse = {
  messages: MessageType[];
  page: number;
  startMsgId: string | null;
  nextMsgId?: string | null;
};

export type PaginatedConversation = GetConversationResponse[];
