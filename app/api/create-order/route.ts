import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    // TEMP FAKE ORDER (for now)
    return NextResponse.json({
      id: "test_order_123",
      amount: amount * 100,
      currency: "INR",
    });

  } catch (error) {
    return NextResponse.json({ error: "Error creating order" });
  }
}