import BackBtn from "@/app/_components/common/BackBtn";
import ReserveBtn from "@/app/_components/features/posts/ReserveBtn";
import { Button } from "@/app/_components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Separator } from "@/app/_components/ui/separator";
import { TooltipButton } from "@/app/_components/ui/toottip-button";
import { auth } from "@/app/_lib/authentication/auth";
import { fetchPostById } from "@/app/_modules/post/post.services";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";
import { format } from "date-fns";
import Image from "next/image";

export default async function PostDetailPage({
  params,
}: {
  params: { lang: LangType; postId: string };
}) {
  const { lang, postId } = await params;
  const langPack = await getLanguage(lang);
  const session = await auth();
  // const post = await getPostDetail(postId);

  // Mocking the post detail for testing purposes
  //const post = mockPost;
  const post = await fetchPostById(postId);
  console.log("Fetched post: ", post);
  if (!post) {
    return <div>{langPack.postNotFound}</div>;
  }

  const formattedDate = format(new Date(post.createdAt), "yyyy-MM-dd HH:mm");

  return (
    <div className="w-full flex flex-col gap-2 justify-center mb-4">
      <div className="w-full flex flex-col justify-center sm:flex-row p-4 gap-4 max-w-6xl mx-auto">
        <div className="relative w-full sm:max-h-128 aspect-[3/4] p-4 border">
          <Image
            src={
              post.bookDetails.imgLarge || "/public/default-book-thumbnail.png"
            }
            alt={post.bookDetails.title || "No title available"}
            fill
            className="object-contain rounded-md p-4"
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-base md:text-2xl font-bold animate-vibrate">
            {post.bookDetails.title}
          </h1>
          <Separator />

          <div className="flex flex-col gap-2 text-sm sm:text-base">
            <div>
              <span className=" text-gray-500 sm:mr-4">
                {langPack.createdDate}:
              </span>
              <span>{formattedDate}</span>
            </div>
            <div>
              <span className=" text-gray-500 sm:mr-4">
                {langPack.location}:{" "}
              </span>
              <span>{post.location}</span>
            </div>
            <div>
              <span className=" text-gray-500 sm:mr-4">
                {langPack.remarks}:{" "}
              </span>
              <span>{post.remarks}</span>
            </div>

            <div className="flex items-center gap-2 m-2 mx-auto">
              {post.orderRef?.orderBy.id === session?.user?.id ? (
                <Button disabled>{langPack.reserved}</Button>
              ) : (
                <ReserveBtn postId={postId} />
              )}
              <TooltipButton
                variant="outline"
                tooltipContent={langPack.sendMessage}
              >
                {langPack.sendMessage}
              </TooltipButton>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 text-sm sm:text-base">
            <div>
              <span className=" text-gray-500 sm:mr-4">{langPack.isbn}: </span>
              <span>{post.bookDetails.isbn}</span>
            </div>
            <div>
              <span className=" text-gray-500 sm:mr-4">
                {langPack.author}:{" "}
              </span>
              <span>{post.bookDetails.authors}</span>
            </div>
            <div>
              <span className=" text-gray-500 sm:mr-4">
                {langPack.language}:{" "}
              </span>
              <span>{post.bookDetails.language}</span>
            </div>
            <div>
              <span className=" text-gray-500 sm:mr-4">
                {langPack.category}:{" "}
              </span>
              <span>{post.bookDetails.category}</span>
            </div>
            <div>
              <span className=" text-gray-500 sm:mr-4">
                {langPack.description}:
              </span>
              <Popover>
                <PopoverTrigger>{post.bookDetails.textSnippet}</PopoverTrigger>
                <PopoverContent>{post.bookDetails.description}</PopoverContent>
              </Popover>
            </div>
          </div>
          <Separator />
        </div>
      </div>
      <BackBtn />
    </div>
  );
}
