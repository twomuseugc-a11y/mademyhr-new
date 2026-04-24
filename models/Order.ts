import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },

    items: [
      {
        id: String,
        name: String,
        price: Number,
        size: String,
        fit: String,
        quantity: { type: Number, default: 1 },
        image: String,
        customMeasurements: String,
        notes: String,
      },
    ],

    total: Number,

    customer: {
      name: String,
      phone: String,
      address: String,
      city: String,
      pincode: String,
      email: String,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    status: {
      type: String,
      enum: ["new", "confirmed", "stitching", "ready", "dispatched", "delivered", "return", "refund"],
      default: "new",
    },

    timeline: {
      createdAt: { type: Date, default: Date.now },
      confirmedAt: Date,
      stitchingAt: Date,
      readyAt: Date,
      dispatchedAt: Date,
      deliveredAt: Date,
    },

    dispatch: {
      courier: {
        type: String,
        enum: ["Delhivery", "DTDC", "Blue Dart"],
      },
      trackingId: String,
    },

    deadline: Date,

    paymentId: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);