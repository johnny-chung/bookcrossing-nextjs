import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/app/_services/stripe/stripe-srv";

export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Accept both JSON and form submissions
    let amount: number | null = null;
    //console.log("req", req);
    // Try JSON first
    try {
      const body: any = await req.json();
      console.log("body", body);
      if (body && body.amount !== undefined) {
        amount = Number(body.amount);
      }
    } catch {
      // Not JSON, fall back to form data
    }

    if (!amount || Number.isNaN(amount) || amount <= 0) {
      throw new Error("Invalid donation amount.");
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "Custom amount donation",
            },
            unit_amount: Math.round(amount * 100), // amount in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation?canceled=true`,
      automatic_tax: { enabled: true },
    });
    console.log("Created checkout session:", session);
    return NextResponse.json({ url: session.url! }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
