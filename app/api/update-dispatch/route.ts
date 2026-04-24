import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { orderId, courier, trackingId } = await request.json();

    if (!orderId || !courier || !trackingId) {
      return NextResponse.json(
        { error: "Order ID, courier, and tracking ID are required" },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        dispatch: {
          courier,
          trackingId,
        },
        status: "dispatched",
        "timeline.dispatchedAt": new Date(),
      },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("UPDATE DISPATCH ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update dispatch information" },
      { status: 500 }
    );
  }
}