"use server";
import {
  CreateMessageFormState,
  CreateMessageInput,
  CreateMessageSchema,
} from "@/app/_modules/message/zod/create-message.schema";
import z from "zod";
import { revalidateConversationCache } from "@/app/_modules/message/message.services";

export async function createMessageAction(
  values: CreateMessageInput
): Promise<CreateMessageFormState> {
  const validatedFields = CreateMessageSchema.safeParse(values);

  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);
    return {
      formErrors: flattened.formErrors,
      fieldErrors: flattened.fieldErrors,
      message: "Validation failed",
      success: false,
    };
  }

  try {
    // Commenting out the real service call for testing purposes
    // const message = createMessage({
    //   senderId: validatedFields.data.senderId,
    //   receiverId: validatedFields.data.receiverId,
    //   postId: validatedFields.data.postId,
    //   participantId: validatedFields.data.participantId,
    //   content: validatedFields.data.content,
    // });

    // Mock service call for testing
    const messageId = "mock-Message-id";

    revalidateConversationCache(
      validatedFields.data.postId,
      validatedFields.data.participantId,
      0
    );

    return {
      success: true,
      message: `Message ${messageId} created successfully`,
    };
  } catch (error: any) {
    return {
      fieldErrors: { apiErrors: error?.message ?? "Something went wrong" },
      success: false,
    };
  }
}
