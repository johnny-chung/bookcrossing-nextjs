import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { LangType } from "@/app/languages/_lang.types";
import { getLanguage } from "@/app/languages/_getLanguage";
import { auth } from "@/app/_lib/authentication/auth";
import { getMemberByAuth0Id } from "@/app/_modules/member/member.services";

export default async function page({ params }: { params: { lang: LangType } }) {
  const { lang } = await params;
  const langPack = await getLanguage(lang);
  const session = await auth();

  if (!session) {
    return <div>{langPack.unauthorized}</div>;
  }

  const member = await getMemberByAuth0Id(session.user.sub ?? "");

  return (
    <div className="flex flex-wrap w-full justify-center mx-auto my-2">
      <Card
        className={`cursor-pointer hover:shadow-lg hover:bg-accent/35 transition-shadow duration-200`}
      >
        <CardHeader>
          <CardTitle className="md:text-xl">{langPack.profile}</CardTitle>
          <CardDescription>{member.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p>
              {langPack.email}: {member.email}
            </p>
            <p>
              {langPack.status}: {member.status}
            </p>
            <p>
              {langPack.reservationCnt}: {member.reservationCnt} /5
            </p>
            <p>
              {langPack.annualTotalReservations}:{" "}
              {member.annualTotalReservations} /30
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
