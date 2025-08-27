"use server";
import { redirect } from "next/navigation";
import z from "zod";
import {
  CreateUserFormState,
  CreateUserInput,
  CreateUserSchema,
} from "./zod/create-user-schema";
import { createUser } from "./member.services";

export async function createMemberAction(
  values: CreateUserInput
): Promise<CreateUserFormState> {
  console.log("Creating member with values:", values);
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
    // Mock service call for testing
    // const mockUserId = "mock-user-id";

    const user = await createUser(validatedFields.data);
    console.log("User created:", user);

    // return {
    //   success: true,
    //   message: `User ${user.id} created successfully`,
    // };
  } catch (error: any) {
    return {
      fieldErrors: { apiErrors: error?.message ?? "Something went wrong" },
      success: false,
    };
  }
  redirect("/signin");
}
