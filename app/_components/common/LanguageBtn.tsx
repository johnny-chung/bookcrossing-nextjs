"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { TooltipButton } from "@/app/_components/ui/toottip-button";
import { useLang } from "@/app/_providers/LangProvider";
import { GlobeIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";

const langList = ["en", "tc"];

export default function LanguageBtn() {
  const { langPack } = useLang();
  const router = useRouter();

  function changeLanguage(newLang: string) {
    router.replace(`/${newLang}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TooltipButton
          variant="ghost"
          className="my-2"
          tooltipContent={langPack.language}
        >
          <GlobeIcon className="size-4" />
          <span className="sr-only">language</span>
        </TooltipButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        className="w-[--radix-popper-anchor-width]"
      >
        {langList.map((lang, idx) => (
          <DropdownMenuItem key={idx}>
            <Button
              variant="ghost"
              className="cursor-pointer w-full"
              onClick={() => changeLanguage(lang)}
            >
              <p>{langPack[lang]}</p>
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
