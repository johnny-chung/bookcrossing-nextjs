import { MessageType } from "@/app/_modules/message/message.type";

// The CreateMessageDto type is derived from MessageType, excluding the 'id' and 'sendAt' fields.
// Fields included in CreateMessageDto:
// - senderId: The ID of the user sending the message.
// - receiverId: The ID of the user receiving the message.
// - postId: The ID of the post associated with the message.
// - participantId: The ID of the participant in the conversation.
// - content: The content of the message.
export type CreateMessageRequestDto = {
  senderId: string;
  receiverId: string;
  postId: string;
  participantId: string;
  content: string;
};
