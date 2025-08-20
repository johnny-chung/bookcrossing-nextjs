import { PostType } from "@/app/_modules/post/post.type";
import { BookType } from "@/app/_modules/book/book.types";
export type PostDetailDto = PostType & {
  bookDetails: BookType;
};
