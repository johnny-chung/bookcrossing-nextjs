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
import { BACKEND_URL } from "@/app/_lib/constant/backend";

export async function getConversationPage(
  postId: string,
  participantId: string,
  page: number,
  startMsgId: string | null,
  limit = 25,
  nextMsgId?: string
): Promise<GetConversationResponse> {
  if (!postId || !participantId || page < 1 || limit < 1) {
    return { messages: [], page: 1, startMsgId: null, nextMsgId: null };
  }

  const session = await auth();
  if (!session) throw new Error("User not authenticated");

  const searchParams = new URLSearchParams({
    participantId: encodeURIComponent(participantId),
    page: page.toString(),
    limit: limit.toString(),
  });

  if (startMsgId) {
    searchParams.append("startMsgId", encodeURIComponent(startMsgId));
  }

  if (nextMsgId) {
    searchParams.append("nextMsgId", encodeURIComponent(nextMsgId));
  }

  const response = await fetch(
    `${BACKEND_URL}/messages/conversation/${encodeURIComponent(
      postId
    )}?${searchParams.toString()}`,
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
export async function getPaginatedConversation(
  postId: string,
  participantId: string,
  page = 1,
  limit = 25
): Promise<PaginatedConversation> {
  const cachedPages: PaginatedConversation = [];

  if (!postId || !participantId || page < 1 || limit < 1) {
    return [];
  }

  for (let i = 1; i <= page; i++) {
    const cacheKey = `${postId}-${participantId}-${i}-${limit}`;
    const cachedData = cache.get(cacheKey) as GetConversationResponse;

    if (!cachedData) {
      // Find the nearest previous cached page to use its nextMsgId as startMsgId
      let startMsgId: string | null = null;
      if (i > 1 || i === 1) {
        const prevCacheKey = `${postId}-${participantId}-${i - 1}-${limit}`;
        const prevPage = cache.get(prevCacheKey) as GetConversationResponse;
        startMsgId = prevPage?.nextMsgId ?? null;
      }

      // If no previous page cached, start from null
      const conversation = await getConversationPage(
        postId,
        participantId,
        i,
        startMsgId, // can be null
        limit
      );

      cache.set(cacheKey, conversation);
      cachedPages.push(conversation);
    } else {
      cachedPages.push(cachedData);
    }
  }

  return cachedPages;
}

export async function revalidateConversationCache(
  postId: string,
  participantId: string,
  page: number,
  limit = 25
): Promise<void> {
  const cacheKey = `${postId}-${participantId}-${page}-${limit}`;
  const cachedData = cache.get(cacheKey) as GetConversationResponse;

  let nextMsgId: string | null = null;
  let startMsgId: string | null = null;
  if (cachedData) {
    startMsgId = cachedData.startMsgId ?? null;
    if (page === 1) {
      nextMsgId = cachedData.nextMsgId ?? null;
      startMsgId = null; // For the first page, startMsgId should be null
    }
  }

  const conversation = await getConversationPage(
    postId,
    participantId,
    page,
    startMsgId,
    limit,
    nextMsgId ?? undefined
  );

  cache.delete(cacheKey);
  cache.set(cacheKey, conversation);
}

export async function createMessage(
  messageData: CreateMessageRequestDto
): Promise<string> {
  // Validate the input data
  const parsedData = CreateMessageSchema.parse(messageData);
  const session = await auth();
  if (!session) throw new Error("User not authenticated");
  console.log("create message data:", parsedData);
  const response = await fetch(`${BACKEND_URL}/messages`, {
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
  console.log("Created message ID:", data.id);
  await revalidateConversationCache(
    parsedData.postId,
    parsedData.participantId,
    1
  );
  return data.id;
}

export async function getParticipantListByPost(
  request: GetParticipantListRequestByPost
): Promise<GetParticipantListResponseByPost> {
  const session = await auth();
  if (!session) throw new Error("User not authenticated");
  try {
    const response = await fetch(
      `${BACKEND_URL}/messages/conversation-list/${encodeURIComponent(
        request.postId
      )}`,
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
    const response = await fetch(
      `${BACKEND_URL}/messages/member/conversation-list`,
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
