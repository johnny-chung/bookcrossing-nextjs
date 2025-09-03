"use client";
import { Button } from "@/app/_components/ui/button";
import donationInStripeAction from "@/app/_modules/donation/donation.action";
import { useLang } from "@/app/_providers/LangProvider";
import { redirect } from "next/navigation";
import React from "react";

function DonationForm() {
  const { langPack } = useLang();

  return (
    <form className="flex flex-col gap-2 my-4" action={donationInStripeAction}>
      <div className="flex flex-row gap-2 my-1">
        <label htmlFor="amount" className="block font-medium">
          {langPack.donationAmount}
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          min={5}
          step={1}
          defaultValue={5}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <Button type="submit" variant="outline">
        {langPack.donate}
      </Button>
    </form>
  );
}

export default DonationForm;
