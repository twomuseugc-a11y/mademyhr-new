"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ✅ FIXED TYPE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FIXED TYPE ERROR HERE
  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill required details");
      return;
    }

    const res = await fetch("/api/create-order", {
      method: "POST",
      body: JSON.stringify({ amount: total }),
    });

    const data = await res.json();

    alert("Simulating payment...");

    setTimeout(async () => {
      // ✅ SAVE ORDER
      await fetch("/api/save-order", {
        method: "POST",
        body: JSON.stringify({
          customer: form,
          items: cart,
          total,
          status: "paid",
        }),
      });

      // ✅ CLEAR CART
      clearCart();

      // ✅ REDIRECT
      router.push("/success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f5efe7] px-6 py-16">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT - FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

          <h1 className="text-2xl font-medium text-[#1a1a1a] mb-6">
            Checkout
          </h1>

          <div className="space-y-5">

            {[
              { name: "name", placeholder: "Full Name" },
              { name: "email", placeholder: "Email Address" },
              { name: "phone", placeholder: "Phone Number" },
              { name: "address", placeholder: "Full Address" },
              { name: "city", placeholder: "City" },
              { name: "pincode", placeholder: "Pincode" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                placeholder={field.placeholder}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-lg text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-black transition"
              />
            ))}

          </div>

        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">

          <h2 className="text-lg font-medium text-[#1a1a1a] mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm text-[#3a3a3a]">

            {cart.map((item: any, index: number) => (
              <div key={index} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
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
            onClick={handlePayment}
            className="mt-6 w-full bg-[#b88a5a] text-white py-3 rounded-full tracking-wide hover:opacity-90 active:scale-95 transition"
          >
            Proceed to Payment
          </button>

          <p className="text-xs text-[#4a4a4a] mt-3 text-center leading-relaxed">
            Secure checkout powered by Razorpay.
          </p>

        </div>

      </div>

    </div>
  );
}