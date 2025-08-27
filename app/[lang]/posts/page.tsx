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

import { PlusIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import Image from "next/image";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";
import {
  fetchAvaliablePosts,
  searchPosts,
} from "@/app/_modules/post/post.services";
import {
  getBookCategories,
  getBookLanguages,
} from "@/app/_modules/book/book.service";

export default async function PostsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: LangType }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined | number;
    language?: string | string[];
    category?: string | string[];
    q?: string;
    sort?: "asc" | "desc";
  }>;
}) {
  const { lang } = await params;
  const { q, sort, category, language } = await searchParams;
  const langPack = await getLanguage(lang);
  const bookLanguages = await getBookLanguages();
  const bookCategories = await getBookCategories();

  const filters: FilterOptsType = [];
  if (bookLanguages.length > 0) {
    filters.push({
      category: "language",
      options: bookLanguages.map((lang) => ({
        label: lang,
        value: langPack[lang as keyof typeof langPack] ?? lang,
      })),
    });
  }

  if (bookCategories.length > 0) {
    filters.push({
      category: "category",
      options: bookCategories.map((cat) => ({
        label: cat,
        value: langPack[cat as keyof typeof langPack] ?? cat,
      })),
    });
  }

  const sortOpts = [
    {
      label: langPack.sortDateAsc,
      value: "asc",
    },
    {
      label: langPack.sortDateDesc,
      value: "desc",
    },
  ];

  const postList =
    (await searchPosts({
      languages: language,
      categories: category,
      search: q,
      order: sort,
    })) || [];

  //const postList = await fetchAvaliablePosts();

  //console.log("Fetched post list: ", postList);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex flex-row items-center gap-2 mx-auto">
          <FilterSideBarTrigger />
          <SortMenuBar sortOpts={sortOpts} />
          <SearchInput />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {!postList || postList.length === 0 ? (
          <p>{langPack.postNotFound}</p>
        ) : (
          <>
            {postList.map((post, idx) => (
              <Link key={idx} href={`/posts/${post.id}`}>
                <Card className="cursor-pointer hover:shadow-lg hover:bg-accent/35 transition-shadow duration-200">
                  <CardContent>
                    <div className="relative w-40 aspect-3/4 mx-4 mt-2">
                      <Image
                        src={
                          post.bookRef.thumbnail ||
                          "/public/default-book-thumbnail.png"
                        }
                        alt={post.bookRef.title || "No title available"}
                        fill
                        className="object-fit rounded-md"
                      />
                    </div>
                  </CardContent>
                  <CardHeader>
                    <CardTitle>{post.bookRef.title}</CardTitle>
                    <CardDescription>
                      {langPack.location}: {post.location}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </>
        )}
      </div>

      <FilterSideBar filterOpts={filters} className="mt-9 md:mt-13" />
    </div>
  );
}
