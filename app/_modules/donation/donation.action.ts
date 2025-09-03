"use server";

import { redirect } from "next/navigation";

export default async function donationInStripeAction(formData: FormData) {
  const amount = Number(formData.get("amount"));
  console.log("Donation amount in server action:", amount);
  let url = "";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout_sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to create checkout session");
    }
    const resJson = await res.json();
    console.log("Response from checkout_sessions:", resJson);
    url = resJson.url;
  } catch (error) {
    console.error("Error in handleSubmit:", error);
    throw new Error((error as Error).message);
  }
  if (url) {
    console.log("Redirecting to:", url);
    redirect(url);
  }
}
