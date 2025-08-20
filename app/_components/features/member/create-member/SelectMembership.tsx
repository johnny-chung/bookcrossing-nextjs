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

export default function SelectMembership() {
  const { langPack } = useLang();
  return (
    <div className="flex flex-wrap w-full justify-center mx-auto my-2">
      <Card
        className={`cursor-pointer hover:shadow-lg hover:bg-accent/35 transition-shadow duration-200`}
      >
        <CardHeader>
          <CardTitle className="md:text-xl">{langPack.basicMembership}</CardTitle>
          <CardDescription>{langPack.foreverFree}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p>{langPack.maxReservedBooks}: 5</p>
            <p>{langPack.annualTotalReservations}: 30</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
