import { z } from "zod";

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;

export const CreateUserSchema = z.object({
  given_name: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(30, "First name must be less than 30 characters"),
  family_name: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(30, "Last name must be less than 30 characters"),
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be less than 30 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export type CreateUserFormState =
  | {
      formErrors?: string[];
      fieldErrors?: {
        given_name?: string[];
        family_name?: string[];
        name?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
        apiErrors?: string;
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
