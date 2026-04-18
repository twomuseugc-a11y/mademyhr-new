"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

// ✅ ADD TYPE (VERY IMPORTANT)
type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  fit?: string;
  note?: string;
};

export default function CartPage() {
  const router = useRouter();

  const { cart, increaseQty, decreaseQty, removeItem } = useCart();

  // ✅ FIXED TYPE ERROR HERE
  const total = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f5efe7] px-6 py-16">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT */}
        <div className="space-y-6">

          {cart.map((item: CartItem, index: number) => {

            // ✅ FIX IMAGE ERROR (VERY IMPORTANT)
            const image =
              item.image &&
              (item.image.startsWith("/") || item.image.startsWith("http"))
                ? item.image
                : "/product1.jpg";

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="flex gap-5">

                  {/* IMAGE */}
                  <div className="relative w-28 h-36 rounded-lg overflow-hidden">
                    {image && !image.includes('cloudinary') ? (
                      <Image
                        src={image}
                        alt={item.name || "product image"}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1">

                    <h2 className="text-[16px] font-medium text-[#1a1a1a]">
                      {item.name}
                    </h2>

                    <p className="text-sm text-[#3a3a3a] mt-1 leading-relaxed">
                      Size: {item.size || "N/A"} • Fit: {item.fit || "N/A"}
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
            );
          })}

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

            {cart.map((item: CartItem, index: number) => (
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

    </div>
  );
}