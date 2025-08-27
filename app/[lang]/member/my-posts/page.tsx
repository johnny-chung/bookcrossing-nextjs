// import { getPostList } from "@/app/_modules/post/post.service"; // Uncomment this to use the original implementation
import { mockPosts } from "@/app/_modules/post/__mocks__/post.mocks";

// Mocking getPostList for testing purposes
const getPostList = async () => mockPosts;

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
import { PostStatus } from "@/app/_modules/post/post.type";

export default async function MyPostsPage({
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
  const langPack = await getLanguage(lang);
  //const postList = await fetchMemberPosts();
  //const postList = await getPostList();

  const postList = await fetchMemberPosts({ status, search: q });

  const filters: FilterOptsType = [
    {
      category: "status",
      options: Object.values(PostStatus).map((status) => ({
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
        <Button variant="outline" size="icon" asChild>
          <Link href="/member/my-posts/create">
            <PlusIcon className="size-4" />
          </Link>
        </Button>
      </div>
      {postList.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg">{langPack.noPosts}</p>
          <p className="text-sm text-muted-foreground">
            {langPack.notCreatedAnyPost}
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/member/my-posts/create">
              {langPack.shareYourFirstBook}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
          {postList.map((post, idx) => (
            <MemberPostCard key={idx} post={post} />
          ))}
        </div>
      )}

      <FilterSideBar filterOpts={filters} className="mt-9 md:mt-13" />
    </div>
  );
}
