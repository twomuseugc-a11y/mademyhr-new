import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { orderId, deadline } = body;

    console.log(`[UPDATE-DEADLINE] Received request: orderId=${orderId}, deadline=${deadline}`);

    if (!orderId || !deadline) {
      console.log(`[UPDATE-DEADLINE] Missing required fields: orderId=${!!orderId}, deadline=${!!deadline}`);
      return NextResponse.json({ error: "Order ID and deadline are required" }, { status: 400 });
    }

    // Use native MongoDB update to avoid schema validation issues
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection not available");
    }
    const result = await db.collection('orders').updateOne(
      { _id: new mongoose.Types.ObjectId(orderId) },
      { $set: { deadline: new Date(deadline) } }
    );

    console.log(`[UPDATE-DEADLINE] Update result: matched=${result.matchedCount}, modified=${result.modifiedCount}`);

    if (result.matchedCount === 0) {
      console.log(`[UPDATE-DEADLINE] Order not found: ${orderId}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Fetch the updated order
    const updatedOrder = await Order.findById(orderId);
    console.log(`[UPDATE-DEADLINE] Successfully updated order ${orderId}`);

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Update deadline error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}