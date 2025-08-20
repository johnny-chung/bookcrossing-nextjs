"use server";

import z from "zod";
import {
  CreateUserFormState,
  CreateUserInput,
  CreateUserSchema,
} from "./zod/create-user-schema";

export async function createMemberAction(
  values: CreateUserInput
): Promise<CreateUserFormState> {
  const validatedFields = CreateUserSchema.safeParse(values);

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
    // const user = createMessage({
    //   senderId: validatedFields.data.senderId,
    //   receiverId: validatedFields.data.receiverId,
    //   postId: validatedFields.data.postId,
    //   participantId: validatedFields.data.participantId,
    //   content: validatedFields.data.content,
    // });

    // Mock service call for testing
    const mockUserId = "mock-user-id";

    
    return {
      success: true,
      message: `User ${mockUserId} created successfully`,
    };
  } catch (error: any) {
    return {
      fieldErrors: { apiErrors: error?.message ?? "Something went wrong" },
      success: false,
    };
  }
}
