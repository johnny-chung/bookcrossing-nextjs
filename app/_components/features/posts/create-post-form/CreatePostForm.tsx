"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePostFormSchema,
  CreatePostFormState,
  CreatePostFormValues,
} from "@/app/_modules/post/zod/create-post.schema";
import { useLang } from "@/app/_providers/LangProvider";
import { createPostAction } from "@/app/_modules/post/post.actions";
import { useSelectedBook } from "./book.context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { useSession } from "next-auth/react";
import { Button } from "@/app/_components/ui/button";
import { useRouter } from "next/navigation";

export function CreatePostForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const { langPack } = useLang();
  const [isPending, startTransition] = useTransition();
  const [serverState, setServerState] =
    React.useState<CreatePostFormState>(undefined);

  const { book } = useSelectedBook();

  const form = useForm({
    resolver: zodResolver(CreatePostFormSchema),
    defaultValues: {
      postById: session?.user?.id ?? "",
      isbn:
        book?.volumeInfo?.industryIdentifiers?.[0]?.identifier ?? "mock-isbn",
      location: "",
      remarks: "",
    },
  });

  function onSubmit(values: CreatePostFormValues) {
    startTransition(async () => {
      const response = await createPostAction(values);
      setServerState(response);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-4 p-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center">
          <FormLabel className="min-w-20 text-sm sm:text-base sm:-mb-2">
            {langPack.bookTitle}:
          </FormLabel>
          <span className="text-sm sm:text-base align-baseline">
            {book?.volumeInfo?.title || "-"}
          </span>
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <FormLabel className="min-w-20 text-sm sm:text-base sm:-mb-2">
                  {langPack.location}:
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage className="sm:ml-20" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <FormLabel className="min-w-20 text-sm sm:text-base sm:-mb-2">
                  {langPack.remarks}:
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage className="sm:ml-20" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage className="sm:ml-20" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postById"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage className="sm:ml-20" />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center gap-6">
          <Button type="submit" variant="outline" disabled={isPending}>
            {isPending ? "Creating..." : `${langPack.createPost}`}
          </Button>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            {langPack.back}
          </Button>
        </div>
      </form>
    </Form>
  );
}
