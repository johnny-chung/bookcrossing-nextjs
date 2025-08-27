"use client";
import React from "react";
import { Button } from "@/app/_components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p>Please sign in</p>
      <Button
        variant="outline"
        onClick={() => signIn("auth0", { redirectTo: "/" })}
      >
        Sign In
      </Button>
    </div>
  );
}
