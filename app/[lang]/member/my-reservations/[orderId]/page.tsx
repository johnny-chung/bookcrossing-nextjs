import BackBtn from "@/app/_components/common/BackBtn";
import CancelOrderBtn from "@/app/_components/features/order/CancelOrderBtn";
import CompleteOrderBtn from "@/app/_components/features/order/CompleteOrderBtn";
import { Badge } from "@/app/_components/ui/badge";
import { Separator } from "@/app/_components/ui/separator";
import { TooltipButton } from "@/app/_components/ui/toottip-button";
import { mockOrder } from "@/app/_modules/order/__mocks__/order.mock";
import { fetchOrderById } from "@/app/_modules/order/order.services";
import { OrderStatus } from "@/app/_modules/order/order.type";
import { getLanguage } from "@/app/languages/_getLanguage";
import { LangType } from "@/app/languages/_lang.types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: { lang: LangType; orderId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { lang, orderId } = await params;
  const langPack = await getLanguage(lang);

  // const post = await fetchPostById(postId);

  // Mocking the post detail for testing purposes
  //const order = mockOrder;

  const order = await fetchOrderById(orderId);

  if (!order) {
    return <div>{langPack.orderNotFound}</div>;
  }

  console.log("Fetched order: ", order);
  const formattedDate = format(new Date(order.createdAt), "yyyy-MM-dd HH:mm");

  return (
    <div className="w-full flex flex-col gap-2 justify-center mb-4">
      <div className="w-full flex flex-col justify-center sm:flex-row p-4 gap-4 max-w-6xl mx-auto">
        <div className="relative w-full sm:max-h-64 aspect-[3/4] p-4 border">
          <Image
            src={
              order.postRef.bookRef.thumbnail ||
              "/public/default-book-thumbnail.png"
            }
            alt={order.postRef.bookRef.title || "No title available"}
            fill
            className="object-contain rounded-md p-4"
          />
          {order.orderStatus === OrderStatus.CANCELED && (
            <Badge
              variant="default"
              className="absolute top-0 left-2 z-10 shadow-md animate-fadeInDelay"
            >
              {langPack.cancelled}
            </Badge>
          )}
          {order.orderStatus === OrderStatus.COMPLETED && (
            <Badge
              variant="secondary"
              className="absolute top-0 left-2 z-10 shadow-md animate-fadeInDelay"
            >
              {langPack.completed}
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-base md:text-2xl font-bold animate-vibrate">
            {order.id}
          </h1>
          <Separator />

          <div className="flex flex-col gap-2 text-sm sm:text-base">
            <div>
              <span className=" text-gray-500 sm:mr-4">
                {langPack.bookTitle}:{" "}
              </span>
              <span>{order.postRef.bookRef.title}</span>
            </div>

            <div>
              <span className=" text-gray-500 sm:mr-4">
                {langPack.postBy}:{" "}
              </span>
              <span>{order.postRef.postBy.name}</span>
            </div>
            <div>
              <span className=" text-gray-500 sm:mr-4">
                {langPack.createdDate}:
              </span>
              <span>{formattedDate}</span>
            </div>

            <div className="flex flex-col w-full items-start gap-2 m-2 mx-auto">
              <Separator />

              <div>
                <span className=" text-gray-500 sm:mr-4">
                  {langPack.status}:{" "}
                </span>
                <span>{langPack[order.orderStatus]}</span>
              </div>

              <div>
                <span className=" text-gray-500 sm:mr-4">
                  {langPack.orderBy}:{" "}
                </span>
                <span>{order.orderBy.name}</span>
              </div>
              <TooltipButton
                variant="outline"
                tooltipContent={langPack.sendMessage}
                asChild
              >
                <Link
                  href={`/messages/post/${order.postRef.id}/${order.orderBy.id}`}
                >
                  {langPack.sendMessage}
                </Link>
              </TooltipButton>

              {order.orderStatus === OrderStatus.PENDING && (
                <div className="flex flex-row gap-2 wrap">
                  <CancelOrderBtn orderId={orderId} />
                  <CompleteOrderBtn orderId={orderId} />
                </div>
              )}
            </div>
          </div>
          <Separator />
        </div>
      </div>
      <BackBtn />
    </div>
  );
}
