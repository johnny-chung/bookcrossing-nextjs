import { PostType } from "@/app/_modules/post/post.type";

export type CreatePostRequestDto = {
  postBy: string;
  isbn: string;
  location: string;
  remarks?: string;
};
