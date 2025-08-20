"use client";

import { Badge } from "@/app/_components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { OrderStatus, OrderType } from "@/app/_modules/order/order.type";
import { useLang } from "@/app/_providers/LangProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function MemberOrderCard({ order }: { order: OrderType }) {
  const { langPack } = useLang();
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <Link href={`/member/my-orders/${order.id}`}>
      <Card
        ref={ref}
        className={`cursor-pointer hover:shadow-lg hover:bg-accent/35 transition-shadow duration-200 ${
          visible ? "animate-slideFadeIn" : "opacity-0"
        }`}
      >
        <div className="relative">
          {order.orderStatus === OrderStatus.CANCELLED && (
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
          <CardContent>
            <div className="relative w-40 aspect-3/4 mx-4 mt-2">
              <Image
                src={
                  order.postRef.bookRef.thumbnail ||
                  "/public/default-book-thumbnail.png"
                }
                alt={order.postRef.bookRef.title || "No title available"}
                fill
                className="object-fit rounded-md"
              />
            </div>
          </CardContent>
        </div>
        <CardHeader>
          <CardTitle>{order.postRef.bookRef.title}</CardTitle>
          <CardDescription>
            {langPack.id}: {order.id}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
