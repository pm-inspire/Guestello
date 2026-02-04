import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "success",
    message: "تم استلام الحجز (محاكاة).",
    bookingId: `BK-${Math.floor(Math.random() * 9000 + 1000)}`,
  });
}
