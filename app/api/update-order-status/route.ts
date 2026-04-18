import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { orderId, status } = await request.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    // Update the order status and timeline
    const updateData: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
      status,
      [`timeline.${status}At`]: new Date(),
    };

    // If marking as delivered, also update the deliveredAt timestamp
    if (status === "delivered") {
      updateData["timeline.deliveredAt"] = new Date();
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updateData,
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
    console.error("UPDATE ORDER STATUS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}