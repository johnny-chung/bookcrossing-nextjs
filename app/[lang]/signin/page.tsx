"use client";
import React from "react";
import { Button } from "@/app/_components/ui/button";
import { signIn } from "next-auth/react";
import { LangType } from "@/app/languages/_lang.types";
import { useLang } from "@/app/_providers/LangProvider";

export default function SignInPage({
  params,
}: {
  params: Promise<{ lang: LangType }>;
}) {
  const { langPack } = useLang();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p>{langPack.pleaseLogin}</p>
      <Button
        variant="outline"
        onClick={() => signIn("auth0", { redirectTo: "/" })}
      >
        {langPack.logIn}
      </Button>
    </div>
  );
}
