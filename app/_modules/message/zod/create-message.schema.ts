import { z } from "zod";

export type CreateMessageSchemaType = z.infer<typeof CreateMessageSchema>;

export const CreateMessageSchema = z.object({
  senderId: z.string().nonempty("Post ID is required"),
  receiverId: z.string().nonempty("Receiver ID is required"),
  postId: z.string().nonempty("Post ID is required"),
  participantId: z.string().nonempty("Participant ID is required"),
  content: z.string().min(1, "Content cannot be empty"),
});

export type CreateMessageInput = z.infer<typeof CreateMessageSchema>;

export type CreateMessageFormState =
  | {
      formErrors?: string[];
      fieldErrors?: {
        senderId?: string[];
        receiverId?: string[];
        postId?: string[];
        participantId?: string[];
        content?: string[];
        apiErrors?: string;
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
