"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { XIcon, SearchIcon } from "lucide-react";
import { cn } from "@/app/_lib/utils/shadcn";

export default function SearchInput({
  className,
  type = "text",
  placeholder = "Search...",
  ...props
}: React.ComponentProps<"input">) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleSearch(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    updatePathname(query);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      updatePathname(query);
    }
  }

  function handleClear() {
    setQuery(() => "");
    updatePathname();
  }

  function updatePathname(query: string = "") {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex w-full items-center max-w-sm gap-0.5">
      <Input
        className={cn("pv-0 rounded-sm", className)}
        type={type}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
        value={query}
        {...props}
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          onClick={(e) => handleClear()}
        >
          <XIcon />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="size-7"
        onClick={(e) => handleSearch(e)}
      >
        <SearchIcon />
      </Button>
    </div>
  );
}
