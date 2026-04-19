import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    // Fetch all orders, sorted by newest first
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean(); // Use lean() for better performance

    // Ensure consistent data structure for each order
    const processedOrders = orders.map(order => ({
      _id: order._id.toString(),
      orderId: order.orderId || `ORD-${order._id.toString().slice(-6)}`,
      customer: {
        name: order.customer?.name || "Customer",
        phone: order.customer?.phone || "Not provided",
        address: order.customer?.address || "",
        city: order.customer?.city || "",
        pincode: order.customer?.pincode || "",
        email: order.customer?.email || "",
      },
      items: order.items || [],
      total: order.total || 0,
      status: order.status || "new",
      paymentStatus: order.paymentStatus || "pending",
      timeline: order.timeline || {},
      dispatch: order.dispatch || null,
      deadline: order.deadline || null,
      paymentId: order.paymentId || null,
      createdAt: order.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: order.updatedAt?.toISOString() || new Date().toISOString(),
    }));

    console.log(`[ORDERS API] Fetched ${processedOrders.length} orders`);

    return NextResponse.json(processedOrders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    // Return empty array instead of error to prevent admin panel crash
    return NextResponse.json([]);
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const orderId = url.pathname.split('/').pop(); // Extract orderId from URL

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("DELETE ORDER ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}