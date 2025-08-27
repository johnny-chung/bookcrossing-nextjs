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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import {
  SidebarProvider,
  SidebarClose,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
} from "@/app/_components/ui/sidebar";
import type { MemberReferenceType } from "@/app/_modules/member/member.type";
import { AlignJustifyIcon, ChevronsUpDownIcon } from "lucide-react";
import { GetParticipantListByAuth0Id } from "@/app/_modules/message/dto/participant-list.dto";
import { Button } from "@/app/_components/ui/button";
import { TooltipButton } from "@/app/_components/ui/toottip-button";
import { useLang } from "@/app/_providers/LangProvider";

export type GetParticipantListResponse = MemberReferenceType[];

interface ParticipantListProps {
  participants: GetParticipantListByAuth0Id;
}

const ParticipantListByAuth0Id: React.FC<ParticipantListProps> = ({
  participants,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { langPack } = useLang();

  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (postId: string, participantId: string) => {
    const params = new URLSearchParams();
    params.set("postId", postId);
    params.set("participantId", participantId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  console.log("participants:", participants);
  const content = (
    <div className="w-full h-[80vh] overflow-y-auto flex flex-col gap-4 p-2">
      {participants.map((p, idx) => (
        <Card
          key={idx}
          className="hover:shadow-md p-2 transition-shadow sm:py-4 items-center"
        >
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full flex flex-col items-center"
          >
            <CardHeader className="w-full">
              <CardTitle className="flex w-full space-between items-center">
                <div className="flex flex-col gap-1">
                  <p className="flex-1">{p.bookRef.title}</p>
                  <p className="text-xs text-gray-500">{p.postId}</p>
                </div>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 cursor-pointer"
                  >
                    <ChevronsUpDownIcon />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </CardTitle>
            </CardHeader>

            <CardContent className="w-full">
              <CollapsibleContent className="flex flex-col gap-2 w-full">
                {p.participants.map((participant, idx) => (
                  <div
                    className="w-full rounded-md border px-2 py-2 text-xs text-muted-foreground cursor-pointer hover:shadow-sm"
                    key={idx}
                    onClick={() => handleSelect(p.postId, participant.id)}
                  >
                    <p className="text-sm">
                      {langPack.participant}: {participant.name}
                    </p>
                  </div>
                ))}
              </CollapsibleContent>
            </CardContent>
          </Collapsible>
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
        <SidebarTrigger className="flex md:hidden">
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

export default ParticipantListByAuth0Id;
