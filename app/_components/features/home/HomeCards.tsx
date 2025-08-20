"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { useLang } from "@/app/_providers/LangProvider";
import Link from "next/link";

export default function HomeCards() {
  const { langPack } = useLang();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      <Link href="/posts">
        <Card
          className={`h-[50vh] cursor-pointer hover:shadow-lg transition-shadow duration-200`}
        >
          <CardHeader>
            <CardTitle className="md:text-xl">
              {langPack.viewAllBooks}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p>{langPack.viewAllBooksDesc}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
      <Link href="/member/my-posts">
        <Card
          className={`h-[50vh] cursor-pointer hover:shadow-lg transition-shadow duration-200`}
        >
          <CardHeader>
            <CardTitle className="md:text-xl">
              {langPack.viewYourPosts}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p>{langPack.viewYourPostsDesc}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
