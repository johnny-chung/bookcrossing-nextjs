import { PostType } from "@/app/_modules/post/post.type";

export type CreatePostRequestDto = {
  postById: string;
  isbn: string;
  location: string;
  remarks?: string;
};
