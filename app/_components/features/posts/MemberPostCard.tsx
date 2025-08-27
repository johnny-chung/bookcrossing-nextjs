"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BellIcon } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import Image from "next/image";
import { PostType, PostStatus } from "@/app/_modules/post/post.type";
import { useLang } from "@/app/_providers/LangProvider";

export function MemberPostCard({
  post,
}: {
  post: Omit<PostType, "bookDetails">;
}) {
  const { langPack } = useLang();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current; // capture it once

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  return (
    <Link href={`/member/my-posts/${post.id}`}>
      <Card
        ref={ref}
        className={`cursor-pointer hover:shadow-lg hover:bg-accent/35 transition-shadow duration-200 ${
          visible ? "animate-slideFadeIn" : "opacity-0"
        }`}
      >
        <div className="relative">
          {post.postStatus === PostStatus.RESERVED && (
            <>
              <Badge
                variant="destructive"
                className="absolute top-0 left-2 z-10 shadow-md animate-fadeInDelay"
              >
                {langPack.newRequest}
              </Badge>
              <Badge
                variant="destructive"
                className="absolute h-7 min-w-7 rounded-full top-0 right-2 z-10 shadow-md animate-[vibrate_0.5s_ease-in-out_10]"
              >
                <BellIcon className="size-6" />
              </Badge>
            </>
          )}
          <CardContent>
            <div className="relative w-40 aspect-3/4 mx-4 mt-2">
              <Image
                src={
                  post.bookRef.thumbnail || "/public/default-book-thumbnail.png"
                }
                alt={post.bookRef.title || "No title available"}
                fill
                className="object-fit rounded-md"
              />
            </div>
          </CardContent>
        </div>
        <CardHeader>
          <CardTitle>{post.bookRef.title}</CardTitle>
          <CardDescription>
            {langPack.location}: {post.location}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
