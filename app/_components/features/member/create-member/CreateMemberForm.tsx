"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import TooltipWrapper from "@/app/_components/ui/tooltip-wrapper";
import { createMemberAction } from "@/app/_modules/member/member.actions";
import {
  CreateUserFormState,
  CreateUserInput,
  CreateUserSchema,
} from "@/app/_modules/member/zod/create-user-schema";
import { useLang } from "@/app/_providers/LangProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

export function CreateMemberForm() {
  const router = useRouter();
  const { langPack } = useLang();
  const [isPending, startTransition] = useTransition();
  const [serverState, setServerState] =
    React.useState<CreateUserFormState>(undefined);

  const form = useForm({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      given_name: "",
      family_name: "",
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values: CreateUserInput) {
    startTransition(async () => {
      const response = await createMemberAction(values);
      setServerState(response);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-4 p-4 max-w-7xl mx-auto"
      >
        <FormField
          control={form.control}
          name="family_name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <FormLabel className="min-w-20 text-sm sm:text-base sm:-mb-2">
                  {langPack.familyName}:
                </FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
              </div>
              <FormMessage className="sm:ml-20" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="given_name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <FormLabel className="min-w-20 text-sm sm:text-base sm:-mb-2">
                  {langPack.givenName}:
                </FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
              </div>
              <FormMessage className="sm:ml-20" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <FormLabel className="min-w-20 text-sm sm:text-base sm:-mb-2">
                  {langPack.nickname}:
                </FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
              </div>
              <FormMessage className="sm:ml-20" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <FormLabel className="min-w-20 text-sm sm:text-base sm:-mb-2">
                  {langPack.userName}:
                </FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
              </div>
              <FormMessage className="sm:ml-20" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <FormLabel className="min-w-20 text-sm sm:text-base sm:-mb-2">
                  {langPack.email}:
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} required />
                </FormControl>
              </div>
              <FormMessage className="sm:ml-20" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <FormLabel className="min-w-20 text-sm sm:text-base sm:-mb-2">
                  {langPack.password}:
                </FormLabel>
                <TooltipWrapper toolTipsContent={<PassWordToolTips />}>
                  <FormControl>
                    <Input
                      {...field}
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
                      required
                    />
                  </FormControl>
                </TooltipWrapper>
                {/* <Button
                  className="my-2 sm:my-0 mx-2 max-w-40 self-center"
                  variant="outline"
                  onClick={(e) => getNewPassword(e)}
                >
                  {langPack.generatePwd}
                </Button> */}
              </div>
              <FormMessage className="sm:ml-20" />
            </FormItem>
          )}
        />
        <div className="flex justify-center items-center gap-6">
          <Button type="submit" variant="outline" disabled={isPending}>
            {isPending ? "Creating..." : `${langPack.createUser}`}
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
      {serverState && serverState.fieldErrors && (
        <p>{JSON.stringify(serverState.fieldErrors)}</p>
      )}
    </Form>
  );
}

function PassWordToolTips() {
  const { langPack } = useLang();
  return (
    <div className="flex flex-col gap-2">
      <p>{langPack.passwordTooltip1}</p>
      <p>{langPack.passwordTooltip2}</p>
      <p>{langPack.passwordTooltip3}</p>
    </div>
  );
}
