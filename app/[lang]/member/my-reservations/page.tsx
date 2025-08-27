// Mocking getPostList for testing purposes
const fetchMemberOrder = async () => mockOrders;

import {
  FilterOptsType,
  FilterSideBar,
  FilterSideBarTrigger,
} from "@/app/_components/common/FilterSideBar";
import SearchInput from "@/app/_components/common/SearchInput";
import SortMenuBar from "@/app/_components/common/SortMenuBar";
import { mockFilterOpts } from "@/app/_components/common/__mocks__/filterOpts.mocks";
import { mockSortOpts } from "@/app/_components/common/__mocks__/sortOpts.mocks";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link"; // Update import to use Next.js Link

import { MemberPostCard } from "@/app/_components/features/posts/MemberPostCard";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";
import { PlusIcon } from "lucide-react";
import { SidebarProvider } from "@/app/_components/ui/sidebar";
import { fetchMemberPosts } from "@/app/_modules/post/post.services";
import { mockOrders } from "@/app/_modules/order/__mocks__/order.mock";
import { MemberOrderCard } from "@/app/_components/features/order/MemberOrderCard";
import { fetchOrdersByMember } from "@/app/_modules/order/order.services";
import { OrderStatus } from "@/app/_modules/order/order.type";

export default async function MyOrdersPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: LangType }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined | number;
    status?: string | string[];
    q?: string;
  }>;
}) {
  const { lang } = await params;

  const { q, status } = await searchParams;

  //const orderList = await fetchMemberOrder();

  const orderList = await fetchOrdersByMember({ status, search: q });

  const langPack = await getLanguage(lang);
  const filters: FilterOptsType = [
    {
      category: "status",
      options: Object.values(OrderStatus).map((status) => ({
        label: status,
        value: status,
      })),
    },
  ];

  return (
    <div className="flex flex-col items-center w-full min-h-screen mx-auto">
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex flex-row items-center gap-2 mx-auto">
          <FilterSideBarTrigger />
          {/* <SortMenuBar sortOpts={mockSortOpts} /> */}
          <SearchInput />
        </div>
      </div>
      {orderList.length === 0 ? (
        <p className="text-lg font-medium mt-10">{langPack.noReservations}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {orderList.map((order, idx) => (
            <MemberOrderCard key={idx} order={order} />
          ))}
        </div>
      )}
      <FilterSideBar filterOpts={filters} className="mt-9 md:mt-13" />
    </div>
  );
}
