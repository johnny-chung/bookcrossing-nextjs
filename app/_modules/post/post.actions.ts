"use server";
import {
  CreatePostFormSchema,
  CreatePostFormState,
  CreatePostFormValues,
} from "@/app/_modules/post/zod/create-post.schema";
import { z } from "zod";
import { createPost } from "@/app/_modules/post/post.services";

export async function createPostAction(
  values: CreatePostFormValues
): Promise<CreatePostFormState> {
  const validatedFields = CreatePostFormSchema.safeParse(values);

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
    // const postId = createPost({
    //   postBy: validatedFields.data.memberId,
    //   isbn: validatedFields.data.isbn,
    //   location: validatedFields.data.location,
    //   remarks: validatedFields.data.remarks,
    // });

    // Mock service call for testing
    const postId = "mock-post-id";

    return {
      success: true,
      message: `Post ${postId} created successfully`,
    };
  } catch (error: any) {
    return {
      fieldErrors: { apiErrors: error?.message ?? "Something went wrong" },
      success: false,
    };
  }
}
