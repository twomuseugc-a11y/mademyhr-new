"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const router = useRouter();

  const { cart, increaseQty, decreaseQty, removeItem } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f5efe7] px-6 py-16">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT */}
        <div className="space-y-6">

          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex gap-5">

                {/* IMAGE */}
                <div className="relative w-28 h-36 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1">

                  <h2 className="text-[16px] font-medium text-[#1a1a1a]">
                    {item.name}
                  </h2>

                  <p className="text-sm text-[#3a3a3a] mt-1 leading-relaxed">
                    Size: {item.size} • Fit: {item.fit}
                  </p>

                  {item.note && (
                    <p className="text-xs text-[#4a4a4a] mt-2 leading-relaxed">
                      {item.note}
                    </p>
                  )}

                  {/* QTY */}
                  <div className="flex items-center gap-4 mt-4">

                    <button
                      onClick={() => decreaseQty(index)}
                      className="w-8 h-8 border border-gray-300 rounded-full hover:bg-black hover:text-white transition"
                    >
                      −
                    </button>

                    <span className="text-sm text-[#1a1a1a]">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(index)}
                      className="w-8 h-8 border border-gray-300 rounded-full hover:bg-black hover:text-white transition"
                    >
                      +
                    </button>

                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    className="text-xs text-[#4a4a4a] mt-4 hover:underline hover:text-black"
                  >
                    Remove item
                  </button>

                </div>

                {/* PRICE */}
                <div className="text-right text-[#1a1a1a] font-medium">
                  ₹{item.price * item.quantity}
                </div>

              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <p className="text-center text-[#4a4a4a]">
              Your cart is empty
            </p>
          )}

        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-fit">

          <h2 className="text-lg font-medium text-[#1a1a1a] mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm text-[#3a3a3a]">

            {cart.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="flex justify-between text-lg font-medium text-[#1a1a1a]">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="mt-6 w-full bg-[#b88a5a] text-white py-3 rounded-full text-sm tracking-wide hover:opacity-90 active:scale-95 transition"
          >
            Continue to Checkout
          </button>

          <p className="text-xs text-[#4a4a4a] mt-3 text-center leading-relaxed">
            Each piece is made to order. Delivery in 15–20 days.
          </p>

        </div>

      </div>

      {/* PREMIUM BRAND SECTION */}
      <div className="max-w-6xl mx-auto mt-24">

        <div className="border-t border-gray-200 mb-12"></div>

        {/* BRAND MESSAGE */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xl md:text-2xl font-light text-[#1a1a1a] tracking-wide">
            Thoughtfully Made, Just for You
          </h2>
          <p className="text-sm text-[#4a4a4a] mt-4 leading-relaxed">
            At madebyhr, each piece is crafted only after you place your order.
            We focus on slow fashion, intentional design, and timeless silhouettes.
          </p>
        </div>

        {/* TRUST BLOCKS */}
        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border flex items-center justify-center">
              ✂️
            </div>
            <p className="text-sm font-medium text-[#1a1a1a]">
              Made to Order
            </p>
            <p className="text-xs text-[#4a4a4a] max-w-[180px] leading-relaxed">
              Each garment is created after your order is placed.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border flex items-center justify-center">
              🚚
            </div>
            <p className="text-sm font-medium text-[#1a1a1a]">
              Delivery Timeline
            </p>
            <p className="text-xs text-[#4a4a4a] max-w-[180px] leading-relaxed">
              Ships within 15–20 days with careful craftsmanship.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border flex items-center justify-center">
              🌿
            </div>
            <p className="text-sm font-medium text-[#1a1a1a]">
              Conscious Design
            </p>
            <p className="text-xs text-[#4a4a4a] max-w-[180px] leading-relaxed">
              Designed for comfort, longevity, and mindful consumption.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}