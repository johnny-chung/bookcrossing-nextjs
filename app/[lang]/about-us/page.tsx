import { Button } from "@/app/_components/ui/button";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";
import Link from "next/link";
import React from "react";

export default async function Page({
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

  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto gap-2">
      <div className="flex flex-col items-center justify-center w-full mx-auto gap-2 mb-4">
        <p className="font-semibold text-xl my-2">{langPack.bookcrossing}</p>
        <p>{langPack.goal}</p>
        <p>{langPack.goalDesc}</p>
      </div>
      <div className="flex flex-col items-center justify-center w-full mx-auto gap-2 mb-4">
        <p>{langPack.donateToSupport}</p>
        <Button variant="outline" asChild>
          <Link href="/donation">{langPack.donation}</Link>
        </Button>
      </div>
      <p>{langPack.contact}: goodmanisltd@gmail.com</p>
    </div>
  );
}
