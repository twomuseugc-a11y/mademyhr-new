import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  let dbConnected = false;

  try {
    await connectDB();
    dbConnected = true;

    const body = await req.json();

    // ✅ SAFETY: ensure structure exists
    const customer = body.customer || {};
    const items = body.items || [];

    // ✅ ADD DEFAULTS
    const orderData = {
      ...body,
      customer,
      items,
      status: "new",
      deadline: null,
    };

    const order = await Order.create(orderData);

    // ✅ EMAIL (SAFE MODE - NEVER BREAK ORDER)
    try {
      if (customer.email) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const itemsList = items
          .map(
            (item: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
              `${item?.name || "Item"} (${item?.size || "-"}, ${item?.fit || "-"}) x${item?.quantity || 1} - ₹${item?.price || 0}`
          )
          .join("\n");

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: customer.email,
          subject: "Your Order is Confirmed ✨",
          text: `
Hi ${customer.name || "Customer"},

Your order has been placed successfully!

🧾 Order Details:
${itemsList}

💰 Total: ₹${body.total || 0}

📍 Delivery Address:
${customer.address || "-"}

We’ll start crafting your piece soon 💛

— madebyhr
          `,
        });
      }
    } catch (mailError) {
      console.log("Email failed but order saved ✅", mailError);
    }

    return NextResponse.json({
      success: true,
      order,
      dbConnected: true,
    });

  } catch (error) {
    console.error("SAVE ORDER ERROR:", error);

    // If DB connection failed, return success but indicate DB issue
    if (!dbConnected) {
      console.error("DATABASE CONNECTION FAILED - Order not saved!");
      return NextResponse.json({
        success: true, // Don't fail payment flow
        order: null,
        dbConnected: false,
        warning: "Database connection failed - order not saved"
      });
    }

    // If DB connected but order creation failed, still return success
    return NextResponse.json({
      success: true, // Don't fail the payment flow
      order: null,
      dbConnected: true,
      warning: "Order creation failed but payment verified"
    });
  }
}