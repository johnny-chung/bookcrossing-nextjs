import BackBtn from "@/app/_components/common/BackBtn";
import DonationForm from "@/app/_components/features/donation/DonationForm";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";
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
  const { canceled } = await searchParams;

  const langPack = await getLanguage(lang);
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto gap-2">
      <p className="font-semibold text-xl my-2">{langPack.donation}</p>
      <p>{langPack.donateToSupport}</p>
      <p>{langPack.donateToSupportDesc}</p>
      {canceled && <p className="text-red-500">{langPack.orderCancelled}</p>}
      <DonationForm />
      <BackBtn />
    </div>
  );
}
