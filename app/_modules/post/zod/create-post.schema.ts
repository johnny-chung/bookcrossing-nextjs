import { z } from "zod";

export const CreatePostFormSchema = z.object({
  postBy: z.string().min(1),
  isbn: z.string().min(10),
  location: z.string().min(1),
  remarks: z.string().optional(),
});

export type CreatePostFormValues = z.infer<typeof CreatePostFormSchema>;

export type CreatePostFormState =
  | {
      formErrors?: string[];
      fieldErrors?: {
        postBy?: string[];
        isbn?: string[];
        location?: string[];
        remarks?: string[];
        apiErrors?: string;
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
