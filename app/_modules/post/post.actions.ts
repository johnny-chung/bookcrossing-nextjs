"use server";
import {
  CreatePostFormSchema,
  CreatePostFormState,
  CreatePostFormValues,
} from "@/app/_modules/post/zod/create-post.schema";
import { z } from "zod";
import { createPost } from "@/app/_modules/post/post.services";
import { redirect } from "next/navigation";

export async function createPostAction(
  values: CreatePostFormValues
): Promise<CreatePostFormState> {
  const validatedFields = CreatePostFormSchema.safeParse(values);
  console.log("Create Post Validated fields:", validatedFields);
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);
    return {
      formErrors: flattened.formErrors,
      fieldErrors: flattened.fieldErrors,
      message: "Validation failed",
      success: false,
    };
  }
  let postId: string;
  try {
    // Commenting out the real service call for testing purposes
    postId = await createPost({
      postBy: validatedFields.data.postBy,
      isbn: validatedFields.data.isbn,
      location: validatedFields.data.location,
      remarks: validatedFields.data.remarks,
    });

    // Mock service call for testing
    //const postId = "mock-post-id";

    console.log("Created post with ID:", postId);

    if (!postId) {
      return {
        success: false,
        fieldErrors: { apiErrors: "Fail to create post" },
      };
    }
  } catch (error: any) {
    return {
      fieldErrors: { apiErrors: error?.message ?? "Something went wrong" },
      success: false,
    };
  }

  // Add a 3-second delay before redirecting
  await new Promise((resolve) => setTimeout(resolve, 5000));

  redirect(`/member/my-posts/${postId}`);
}
