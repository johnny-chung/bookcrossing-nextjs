"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { cn } from "@/app/_lib/utils/shadcn";
import { PaginatedConversation } from "@/app/_modules/message/dto/conversation.dto";
import { createMessageAction } from "@/app/_modules/message/message.actions";
import { CreateMessageFormState } from "@/app/_modules/message/zod/create-message.schema";
import { useLang } from "@/app/_providers/LangProvider";
import { format } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useTransition } from "react";

export default function ConversationBox({
  receiverName,
  senderId,
  receiverId,
  postId,
  participantId,
  paginatedConversation,
  className,
  ...props
}: {
  receiverName?: string;
  senderId: string;
  receiverId: string;
  postId: string;
  participantId: string;
  paginatedConversation: PaginatedConversation;
} & React.ComponentProps<"div">) {
  const { langPack } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [msg, setMsg] = React.useState("");
  const [serverState, setServerState] =
    React.useState<CreateMessageFormState>(undefined);

  const [isPending, startTransition] = useTransition();

  // Flatten the paginatedConversation array and sort messages by date (newest at the bottom)
  const allMessages = paginatedConversation
    .flatMap((page) => page.messages)
    .sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    );

  const handleScroll = useCallback(() => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0) {
      const lastPage = paginatedConversation[paginatedConversation.length - 1];
      const nextPage = lastPage.page + 1;
      const nextMsgId = lastPage.nextMsgId;

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("page", nextPage.toString());
      if (nextMsgId) {
        newSearchParams.set("nextMsgId", nextMsgId);
      }

      router.push(`${pathname}?${newSearchParams.toString()}`);
    }
  }, [paginatedConversation, searchParams, pathname, router]);

  function handleSendMessage() {
    if (msg.trim() === "") return;
    startTransition(async () => {
      const response = await createMessageAction({
        senderId,
        receiverId,
        content: msg,
        postId,
        participantId,
      });
      setServerState(response);
      if (response?.success) {
        router.refresh();
      }
    });
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []); // Only scroll on first render

  useEffect(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const previousScrollHeight = container.scrollHeight;
    const previousScrollTop = container.scrollTop;

    setTimeout(() => {
      const newScrollHeight = container.scrollHeight;
      container.scrollTop =
        previousScrollTop + (newScrollHeight - previousScrollHeight);
    }, 0);
  }, [paginatedConversation]); // Adjust scroll position when paginatedConversation changes

  return (
    <div
      className={cn(
        "flex flex-col border max-w-4xl w-full mx-auto h-[80vh]",
        className
      )}
      {...props}
    >
      <p className="text-xl font-semibold m-2">
        {langPack.messagesWith.replace("...", receiverName)}
      </p>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {allMessages.map((message, idx) => (
          <div
            key={idx}
            className={cn(
              "max-w-xs flex flex-col",
              message.sender.id === senderId ? "ml-auto" : "mr-auto"
            )}
          >
            <div
              className={cn(
                "p-2 rounded-md",
                message.sender.id === senderId
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {message.content}
            </div>
            <p
              className={cn(
                "text-xs text-primary/50 p-1",
                message.sender.id === senderId ? "ml-auto" : "mr-auto"
              )}
            >
              {format(new Date(message.sentAt), "yyyy-MM-dd  HH:mm")}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row items-center gap-2 p-2 border-t">
          <Input
            placeholder="Type a message..."
            className="flex-1"
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <Button
            className="ml-auto"
            variant="outline"
            onClick={(e) => handleSendMessage()}
            disabled={isPending || !msg.trim()}
          >
            {langPack.sendMessage}
          </Button>
        </div>
        {serverState?.success === false && (
          <p className="text-red text-sm">
            {serverState?.formErrors?.join(",")}
          </p>
        )}
      </div>
    </div>
  );
}
