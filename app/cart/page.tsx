"use client";

import { useState } from "react";
import Image from "next/image";

type CartItem = {
  id: number;
  name: string;
  price: number;
  size: string;
  fit: string;
  note: string;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Linen Wrap Dress",
      price: 4200,
      size: "M",
      fit: "Regular",
      note: "Sleeve slightly longer",
      image: "/dress.jpg",
      quantity: 1,
    },
  ]);

  const increase = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < 5
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrease = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f5efe7] px-6 py-16">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="space-y-6">

          {cart.map((item) => (
            <div
              key={item.id}
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

                  <h2 className="text-[16px] font-medium text-[#2b2b2b]">
                    {item.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Size: {item.size} • Fit: {item.fit}
                  </p>

                  {item.note && (
                    <p className="text-xs text-gray-400 mt-2">
                      {item.note}
                    </p>
                  )}

                  {/* QTY */}
                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() => decrease(item.id)}
                      className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                    >
                      −
                    </button>

                    <span className="text-sm">{item.quantity}</span>

                    <button
                      onClick={() => increase(item.id)}
                      className="w-8 h-8 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                    >
                      +
                    </button>

                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-gray-400 mt-4 hover:underline"
                  >
                    Remove item
                  </button>

                </div>

                {/* PRICE */}
                <div className="text-right text-[#2b2b2b] font-medium">
                  ₹{item.price * item.quantity}
                </div>

              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <p className="text-center text-gray-500">Your cart is empty</p>
          )}

        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-fit">

          <h2 className="text-lg font-medium text-[#2b2b2b] mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm text-gray-600">

            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="flex justify-between text-lg font-medium text-[#2b2b2b]">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="mt-6 w-full bg-[#b88a5a] text-white py-3 rounded-md text-sm tracking-wide hover:opacity-90 transition">
            Confirm Order
          </button>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Each piece is made to order. Delivery in 15–20 days.
          </p>

        </div>

      </div>

      {/* BRAND SECTION */}
      <div className="max-w-6xl mx-auto mt-20">

        <div className="border-t border-gray-200 mb-12"></div>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border flex items-center justify-center">
              ✂️
            </div>
            <p className="text-sm font-medium text-[#2b2b2b]">
              Made to Order
            </p>
            <p className="text-xs text-gray-500 max-w-[180px]">
              Each piece is crafted after your order is placed.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border flex items-center justify-center">
              🚚
            </div>
            <p className="text-sm font-medium text-[#2b2b2b]">
              Delivery Timeline
            </p>
            <p className="text-xs text-gray-500 max-w-[180px]">
              Dispatch within 15–20 days after confirmation.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border flex items-center justify-center">
              🌿
            </div>
            <p className="text-sm font-medium text-[#2b2b2b]">
              Thoughtfully Made
            </p>
            <p className="text-xs text-gray-500 max-w-[180px]">
              Designed with comfort and longevity in mind.
            </p>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto mt-16 pt-10 border-t border-gray-200">

        <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-500">

          <div>
            <h3 className="text-[#2b2b2b] font-medium mb-3">
              madebyhr
            </h3>
            <p className="text-xs leading-relaxed max-w-[220px]">
              Thoughtfully designed clothing made in small batches.
              Every piece is created with intention and care.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#2b2b2b] font-medium mb-2">Info</p>
            <span className="hover:text-black cursor-pointer">About</span>
            <span className="hover:text-black cursor-pointer">Contact</span>
            <span className="hover:text-black cursor-pointer">Shipping</span>
            <span className="hover:text-black cursor-pointer">Returns</span>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[#2b2b2b] font-medium mb-2">Connect</p>
            <span className="hover:text-black cursor-pointer">Instagram</span>
            <span className="hover:text-black cursor-pointer">Pinterest</span>
            <span className="hover:text-black cursor-pointer">Email</span>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">

          <p>© {new Date().getFullYear()} madebyhr. All rights reserved.</p>

          <p className="mt-2 md:mt-0">
            Crafted with care.
          </p>

        </div>

      </footer>

    </div>
  );
}