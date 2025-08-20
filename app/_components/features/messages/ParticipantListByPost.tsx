"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/_components/ui/card";
import {
  SidebarProvider,
  SidebarClose,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
} from "@/app/_components/ui/sidebar";
import type { MemberReferenceType } from "@/app/_modules/member/member.type";
import { AlignJustifyIcon } from "lucide-react";
import { useLang } from "@/app/_providers/LangProvider";
import { TooltipButton } from "@/app/_components/ui/toottip-button";

export type GetParticipantListResponse = MemberReferenceType[];

interface ParticipantListProps {
  participants: GetParticipantListResponse;
}

const ParticipantListByPost: React.FC<ParticipantListProps> = ({
  participants,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { langPack } = useLang();

  const handleSelect = (id: string) => {
    const params = new URLSearchParams();
    params.set("participantId", id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const content = (
    <div className="w-full h-[80vh] overflow-y-auto flex flex-col gap-4 p-4">
      {participants.map((p) => (
        <Card
          key={p.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleSelect(p.id)}
        >
          <CardHeader>
            <CardTitle>{p.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">ID: {p.id}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      <TooltipButton
        variant="ghost"
        size="icon"
        tooltipContent={langPack.conversationList}
        asChild
      >
        <SidebarTrigger className="flex md:hidden" asChild>
          <AlignJustifyIcon className="size-4" />
        </SidebarTrigger>
      </TooltipButton>
      <div className="w-full hidden md:flex">{content}</div>

      <Sidebar>
        <SidebarClose />
        <SidebarContent>{content}</SidebarContent>
      </Sidebar>
    </div>
  );
};

export default ParticipantListByPost;
