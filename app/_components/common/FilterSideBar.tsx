"use client";
import React from "react";

import { Checkbox } from "@/app/_components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import {
  Sidebar,
  SidebarClose,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/app/_components/ui/sidebar";
import { useLang } from "@/app/_providers/LangProvider";
import { ChevronDown, FunnelPlusIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

export type FilterOptsType = {
  category: string;
  options: {
    label: string;
    value: string;
  }[];
}[];

type SelectedFilterType = {
  [category: string]: string[];
};

export function FilterSideBar({
  filterOpts,
  className,
  ...props
}: { filterOpts: FilterOptsType } & React.ComponentProps<"div">) {
  const { langPack } = useLang();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { setOpen, setOpenMobile } = useSidebar();

  const [checkedItems, setCheckedItems] =
    React.useState<SelectedFilterType | null>(null);

  function handleCheckedChange(
    checked: boolean,
    category: string,
    value: string
  ) {
    setCheckedItems((prev) => {
      if (!prev) {
        return { [category]: checked ? [value] : [] };
      }
      const updatedCategory = prev[category] || [];
      const updatedCheckedItems = checked
        ? {
            ...prev,
            [category]: [...updatedCategory, value],
          }
        : {
            ...prev,
            [category]: updatedCategory.filter((item) => item !== value),
          };

      // Check if all categories are empty
      const allEmpty = Object.values(updatedCheckedItems).every(
        (items) => items.length === 0
      );

      return allEmpty ? null : updatedCheckedItems;
    });
  }

  function handleApply(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (checkedItems) {
      const params = new URLSearchParams(searchParams);
      Object.entries(checkedItems).forEach(([category, values]) => {
        values.forEach((value) => {
          params.append(category, value);
        });
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    } else {
      router.replace(pathname, { scroll: false });
    }
    setOpen(false);
    setOpenMobile(false);
  }

  function handleReset(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setCheckedItems(null);
    router.replace(pathname, { scroll: false });
  }

  return (
    <Sidebar side="left" className={className} {...props}>
      <SidebarClose />
      <SidebarHeader>{langPack.filter}</SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="gap-0">
        {filterOpts.map((elem, idx) => (
          <Collapsible defaultOpen className="group/collapsible" key={idx}>
            <SidebarGroup className="pt-0">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {langPack[elem.category]}
                  <ChevronDown
                    className="ml-auto transition-transform 
                      group-data-[state=open]/collapsible:rotate-180"
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent className="mb-2 mt-1">
                  <SidebarMenu>
                    {elem.options.map((opt, idx) => (
                      <SidebarMenuItem key={idx}>
                        <div className="flex justify-between items-center pl-4 pr-2.5 my-0.5">
                          <p>{opt.label}</p>
                          <Checkbox
                            checked={
                              !!checkedItems?.[elem.category]?.includes(
                                opt.value
                              )
                            }
                            onCheckedChange={(checked) =>
                              handleCheckedChange(
                                checked === true,
                                elem.category,
                                opt.value
                              )
                            }
                            className="bg-white cursor-pointer hover:shadow-md transition duration-200 ease-in-out"
                          />
                        </div>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
            <SidebarSeparator />
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter className="sticky bottom-0">
        <div className="flex w-full items-center justify-center gap-4 pb-2">
          <Button variant="outline" onClick={(e) => handleReset(e)}>
            {langPack.reset}
          </Button>
          <Button variant="outline" onClick={(e) => handleApply(e)}>
            {langPack.apply}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function FilterSideBarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof SidebarTrigger>) {
  const { langPack } = useLang();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarTrigger className={className} {...props}>
          <FunnelPlusIcon className="size-4" />
          <span className="sr-only">Filter</span>
        </SidebarTrigger>
      </TooltipTrigger>
      <TooltipContent>{langPack.filter}</TooltipContent>
    </Tooltip>
  );
}
