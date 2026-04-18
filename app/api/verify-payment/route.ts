import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    // 🔐 CREATE SIGNATURE
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // ✅ VERIFY
    if (generated_signature === razorpay_signature) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 400 }
      );
    }
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error("VERIFY ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Verification failed" },
      { status: 500 }
    );
  }
}