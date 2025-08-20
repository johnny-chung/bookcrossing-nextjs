import { CreatePostForm } from "@/app/_components/features/posts/create-post-form/CreatePostForm";
import CreatePostSteps from "@/app/_components/features/posts/create-post-form/CreatePostSteps";
import { getGoogleBooks } from "@/app/_services/google/google.services";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";
import React from "react";

export default async function CreatePostPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: LangType }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined | number;
  }>;
}) {
  const { lang } = await params;
  const langPack = await getLanguage(lang);
  const { q } = await searchParams;
  const googleBooks = await getGoogleBooks(q as string);

  return (
    <div className="flex flex-col items-center w-full mb-6">
      <h2>{langPack.createPost}</h2>
      <CreatePostSteps googleBooks={googleBooks} className="w-full flex-1" />
    </div>
  );
}
