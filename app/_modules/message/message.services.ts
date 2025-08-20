import "server-only";
import {
  GetConversationResponse,
  PaginatedConversation,
} from "@/app/_modules/message/dto/conversation.dto";
import { CreateMessageRequestDto } from "@/app/_modules/message/dto/create-message.dto";
import { CreateMessageSchema } from "@/app/_modules/message/zod/create-message.schema";
import { LRUCache } from "lru-cache";
import {
  GetParticipantListByAuth0Id,
  GetParticipantListRequestByPost,
  GetParticipantListResponseByPost,
} from "./dto/participant-list.dto";
import { MemberReferenceType } from "../member/member.type";
import { auth } from "@/app/_lib/authentication/auth";

export async function getConversationPage(
  postId: string,
  participantId: string,
  page: number,
  limit?: number,
  nextMsgId?: string
): Promise<GetConversationResponse> {
  const searchParams = new URLSearchParams({
    participantId: encodeURIComponent(participantId),
    page: page.toString(),
  });

  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  if (limit) {
    searchParams.append("limit", encodeURIComponent(limit.toString()));
  }

  if (nextMsgId) {
    searchParams.append("nextMsgId", encodeURIComponent(nextMsgId));
  }

  const response = await fetch(
    `/api/messages/conversation/${encodeURIComponent(
      postId
    )}/?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  return response.json();
}

const cache = new LRUCache({ max: 30, ttl: 60 * 60 * 1000 });
export async function getPagniatedConversation(
  postId: string,
  participantId: string,
  page: number,
  limit = 20,
  nextMsgId?: string
): Promise<PaginatedConversation> {
  const cachedPages: PaginatedConversation = [];

  for (let i = 1; i < page; i++) {
    const cacheKey = `${postId}-${participantId}-${i}-${limit}`;
    const cachedData = cache.get(cacheKey) as GetConversationResponse;
    if (cachedData) {
      cachedPages.push(cachedData);
    } else {
      // If any page < page is not found in cache, fetch it
      const conversation = await getConversationPage(
        postId,
        participantId,
        i,
        limit
      );
      cache.set(cacheKey, conversation);
      cachedPages.push(conversation);
    }
  }

  // Fetch the requested page
  const cacheKey = `${postId}-${participantId}-${page}-${limit}`;
  const cachedData = cache.get(cacheKey) as GetConversationResponse;

  if (!cachedData) {
    const conversation = await getConversationPage(
      postId,
      participantId,
      page,
      limit,
      nextMsgId
    );
    cache.set(cacheKey, conversation);
    cachedPages.push(conversation);
  } else {
    cachedPages.push(cachedData);
  }

  return cachedPages;
}

export async function revalidateConversationCache(
  postId: string,
  participantId: string,
  page: number,
  limit = 20
): Promise<void> {
  const cacheKey = `${postId}-${participantId}-${page}-${limit}`;
  cache.delete(cacheKey);
  const conversation = await getConversationPage(
    postId,
    participantId,
    page,
    limit
  );
  cache.set(cacheKey, conversation);
}

export async function createMessage(
  messageData: CreateMessageRequestDto
): Promise<string> {
  // Validate the input data
  const parsedData = CreateMessageSchema.parse(messageData);
  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  const response = await fetch(`/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(parsedData),
  });

  if (!response.ok) {
    throw new Error("Failed to create message");
  }

  const data = await response.json();
  return data.id;
}

export async function getParticipantListByPost(
  request: GetParticipantListRequestByPost
): Promise<GetParticipantListResponseByPost> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");
  try {
    const response = await fetch(
      `/api/messages/conversation-list/${encodeURIComponent(request.postId)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch participants");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function getParticipantListByAuth0Id(): Promise<GetParticipantListByAuth0Id> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");
  try {
    const response = await fetch(`/api/messages/member/conversation-list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch participants");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
