"use client";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/app/_components/ui/menubar";

import { ListFilterIcon, CheckIcon } from "lucide-react";

import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@/app/_lib/utils/shadcn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type SortOptsType = {
  label: string;
  value: string;
}[];

export default function SortMenuBar({
  sortOpts,
  className,
  ...props
}: { sortOpts: SortOptsType } & React.ComponentProps<
  typeof MenubarPrimitive.Root
>) {
  const [selected, setSelected] = React.useState<string | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSort(value: string) {
    setSelected(value);

    const params = new URLSearchParams(searchParams);
    params.delete("sort");
    params.set("sort", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Menubar className={cn("border-0 shadow-none p-0", className)} {...props}>
      <MenubarMenu>
        <MenubarTrigger className="px-1 hover:bg-accent">
          <ListFilterIcon className="size-5" />
          <span className="sr-only">Sort</span>
        </MenubarTrigger>
        <MenubarContent>
          {sortOpts.map((opt) => (
            <MenubarItem
              key={opt.value}
              onClick={() => handleSort(opt.value)}
              className={selected === opt.value ? "bg-accent" : ""}
            >
              {opt.label}
              {selected === opt.value && <CheckIcon className="ml-auto" />}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
