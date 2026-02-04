import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "paid",
    message: "تمت عملية الإيداع (محاكاة Stripe).",
    paymentIntent: `pi_${Math.floor(Math.random() * 1000000)}`,
  });
}
