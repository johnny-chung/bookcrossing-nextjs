"use client";
import { PostType } from "@/app/_modules/post/post.type";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { useLang } from "@/app/_providers/LangProvider";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
export default function PostSummaryPopover({ post }: { post: PostType }) {
  const { langPack } = useLang();
  return (
    <Popover>
      <PopoverTrigger className="flex flex-row items-center gap-2 hover:cursor-pointer">
        <p className="text-xl font-bold">
          {langPack.post} {post.id}
        </p>
        <ChevronDownIcon className="size-4" />
      </PopoverTrigger>
      <PopoverContent className="flex items-center justify-center">
        <div className="flex flex-col gap-2">
          <div className="relative w-20 aspect-3/4">
            <Image
              src={post.bookRef.thumbnail || "/public/default-book-thumbnail.png"}
              alt={post.bookRef.title || "No title available"}
              fill
              className="object-fit rounded-md"
            />
          </div>
          <p>{post.bookRef.title}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
