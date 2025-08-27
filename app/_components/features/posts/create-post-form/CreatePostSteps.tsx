"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { useLang } from "@/app/_providers/LangProvider";
import { GoogleBookSearchResponse } from "@/app/_services/google/google.dto";
import SelectBook from "@/app/_components/features/posts/create-post-form/SelectBook";
import { useSelectedBook } from "@/app/_components/features/posts/create-post-form/book.context";
import { CreatePostForm } from "./CreatePostForm";
import { useEffect, useRef, useState } from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/app/_lib/utils/shadcn";

export default function CreatePostSteps({
  googleBooks,
  className,
  ...props
}: {
  googleBooks: GoogleBookSearchResponse;
} & Omit<React.ComponentProps<typeof AccordionPrimitive.Item>, "value">) {
  const { langPack } = useLang();
  const { book } = useSelectedBook();

  const [openSteps, setOpenSteps] = useState<string[]>(["step-1"]);
  const step2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (book && !openSteps.includes("step-2")) {
      setOpenSteps((prev) => [...prev, "step-2"]);
      setTimeout(() => {
        step2Ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [book, openSteps]);

  return (
    <Accordion
      type="multiple"
      value={openSteps}
      onValueChange={setOpenSteps}
      className="w-full"
    >
      <AccordionItem
        value="step-1"
        className={cn("w-full", className)}
        {...props}
      >
        <AccordionTrigger className="bg-accent/30 px-4 cursor-pointer w-full md:min-w-xl lg:min-w-3xl">
          <span className="flex-1">{langPack.step}-1</span>
        </AccordionTrigger>
        <AccordionContent className="w-full">
          <SelectBook googleBooks={googleBooks} className="mb-4" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        ref={step2Ref}
        value="step-2"
        className={cn("w-full", className)}
        {...props}
      >
        <AccordionTrigger className="bg-accent/30 px-4 cursor-pointer w-full">
          <span className="flex-1">{langPack.step}-2</span>
        </AccordionTrigger>
        <AccordionContent className="w-full">
          <CreatePostForm />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
