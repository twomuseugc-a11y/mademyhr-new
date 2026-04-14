"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5efe7] flex flex-col items-center justify-center px-6 text-center">

      {/* SUCCESS ICON */}
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <span className="text-2xl">✓</span>
      </div>

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-light text-[#1a1a1a] tracking-wide">
        Order Confirmed
      </h1>

      {/* MESSAGE */}
      <p className="text-sm text-[#4a4a4a] mt-4 max-w-md leading-relaxed">
        Thank you for choosing madebyhr. Your piece will now be crafted
        exclusively for you with care and intention.
      </p>

      {/* DETAILS */}
      <div className="mt-8 text-sm text-[#3a3a3a] space-y-1">
        <p>Delivery Timeline: 15–20 days</p>
        <p>You’ll receive updates via email</p>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 mt-10">

        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-[#b88a5a] text-white rounded-full text-sm tracking-wide hover:opacity-90 transition"
        >
          Continue Shopping
        </button>

        <button
          onClick={() => router.push("/admin")}
          className="px-6 py-3 border border-gray-300 rounded-full text-sm hover:bg-black hover:text-white transition"
        >
          View Orders
        </button>

      </div>

    </div>
  );
}