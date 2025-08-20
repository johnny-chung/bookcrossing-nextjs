import { MessageType } from "../message.type";
import {
  GetConversationResponse,
  PaginatedConversation,
} from "../dto/conversation.dto";
import { MemberReferenceType } from "@/app/_modules/member/member.type";
import { GetParticipantListResponseByPost } from "../dto/participant-list.dto";

const johnDoe: MemberReferenceType = {
  id: "user1",
  auth0Id: "auth0|user1",
  name: "John Doe",
};

const janeSmith: MemberReferenceType = {
  id: "user2",
  auth0Id: "auth0|user2",
  name: "Jane Smith",
};

export const mockMessage: MessageType = {
  id: "1",
  postId: "post1",
  participant: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sender: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  receiver: {
    id: "user2",
    auth0Id: "auth0|user2",
    name: "Jane Smith",
  },
  sentAt: "2025-08-01T12:00:00Z",
  content: "Hello, this is a mock message.",
};

export const mockMessage2: MessageType = {
  id: "2",
  postId: "post1",
  participant: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sender: {
    id: "user2",
    auth0Id: "auth0|user2",
    name: "Jane Smith",
  },
  receiver: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sentAt: "2025-08-01T12:05:00Z",
  content: "Hi! Thanks for your message.",
};

export const mockMessage3: MessageType = {
  id: "3",
  postId: "post1",
  participant: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sender: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  receiver: {
    id: "user2",
    auth0Id: "auth0|user2",
    name: "Jane Smith",
  },
  sentAt: "2025-08-01T12:10:00Z",
  content: "You're welcome! How can I help you?",
};

export const mockMessage4: MessageType = {
  id: "4",
  postId: "post1",
  participant: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sender: {
    id: "user2",
    auth0Id: "auth0|user2",
    name: "Jane Smith",
  },
  receiver: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sentAt: "2025-08-01T12:15:00Z",
  content: "I was wondering if the book is still available?",
};

export const mockMessage5: MessageType = {
  id: "5",
  postId: "post1",
  participant: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sender: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  receiver: {
    id: "user2",
    auth0Id: "auth0|user2",
    name: "Jane Smith",
  },
  sentAt: "2025-08-01T12:20:00Z",
  content: "Yes, it is! Would you like to pick it up?",
};

export const mockMessage6: MessageType = {
  id: "6",
  postId: "post1",
  participant: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sender: {
    id: "user2",
    auth0Id: "auth0|user2",
    name: "Jane Smith",
  },
  receiver: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sentAt: "2025-08-01T12:25:00Z",
  content: "That would be great. When are you available?",
};

export const mockMessage7: MessageType = {
  id: "7",
  postId: "post1",
  participant: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sender: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  receiver: {
    id: "user2",
    auth0Id: "auth0|user2",
    name: "Jane Smith",
  },
  sentAt: "2025-08-01T12:30:00Z",
  content: "I am free this weekend. Does that work for you?",
};

export const mockMessage8: MessageType = {
  id: "8",
  postId: "post1",
  participant: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sender: {
    id: "user2",
    auth0Id: "auth0|user2",
    name: "Jane Smith",
  },
  receiver: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sentAt: "2025-08-01T12:35:00Z",
  content: "Yes, Saturday afternoon would be perfect.",
};

export const mockMessage9: MessageType = {
  id: "9",
  postId: "post1",
  participant: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sender: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  receiver: {
    id: "user2",
    auth0Id: "auth0|user2",
    name: "Jane Smith",
  },
  sentAt: "2025-08-01T12:40:00Z",
  content: "Great! Let’s meet at the library.",
};

export const mockMessage10: MessageType = {
  id: "10",
  postId: "post1",
  participant: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sender: {
    id: "user2",
    auth0Id: "auth0|user2",
    name: "Jane Smith",
  },
  receiver: {
    id: "user1",
    auth0Id: "auth0|user1",
    name: "John Doe",
  },
  sentAt: "2025-08-01T12:45:00Z",
  content: "Sounds good. See you then!",
};

export const mockConversation: GetConversationResponse = {
  messages: [
    mockMessage,
    mockMessage2,
    mockMessage3,
    mockMessage4,
    mockMessage5,
    mockMessage6,
    mockMessage7,
    mockMessage8,
    mockMessage9,
    mockMessage10,
  ],
  page: 1,
  nextMsgId: "5",
};

export const mockGetParticipantListResponse: GetParticipantListResponseByPost =
  {
    postId: "post1",
    participants: [
      {
        id: "user1",
        auth0Id: "auth0|user1",
        name: "John Doe",
      },
      {
        id: "user2",
        auth0Id: "auth0|user2",
        name: "Jane Smith",
      },
    ],
  };

export const mockGetParticipantListByAuth0Id = [
  {
    postId: "post1",
    participants: [
      {
        id: "user1",
        auth0Id: "auth0|user1",
        name: "John Doe",
      },
      {
        id: "user2",
        auth0Id: "auth0|user2",
        name: "Jane Smith",
      },
    ],
  },
  {
    postId: "post2",
    participants: [
      {
        id: "user3",
        auth0Id: "auth0|user3",
        name: "Alice Brown",
      },
      {
        id: "user4",
        auth0Id: "auth0|user4",
        name: "Bob White",
      },
    ],
  },
];

export async function mockGetPaginatedConversation(
  postId: string,
  participantId: string,
  page: number,
  limit: number,
  nextMsgId?: string
): Promise<PaginatedConversation> {
  const cachedPages: PaginatedConversation = [];

  for (let i = 1; i <= page && i <= 5; i++) {
    const messages = mockConversation.messages;
    cachedPages.push({
      messages,
      page: i,
      nextMsgId: i < 5 ? "nextPageId" : undefined,
    });
  }

  return cachedPages;
}
