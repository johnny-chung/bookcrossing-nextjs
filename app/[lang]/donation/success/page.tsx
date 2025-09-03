import { Button } from "@/app/_components/ui/button";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import { stripe } from "@/app/_services/stripe/stripe-srv";

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
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }
  const { status } = await stripe.checkout.sessions.retrieve(
    session_id as string,
    {
      expand: ["line_items", "payment_intent"],
    }
  );

  if (status === "open") {
    return redirect("/");
  }
  if (status === "complete") {
    return (
      <div className="flex flex-col items-center justify-center w-full mx-auto gap-2">
        <p>{langPack.thankYouDonation}</p>
        <Button variant="outline" asChild>
          <Link href="/">{langPack.back}</Link>
        </Button>
      </div>
    );
  }
}
