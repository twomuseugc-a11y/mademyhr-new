"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation"; // ✅ ADDED

export default function SuccessPage() {

  // ✅ ADDED
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg");
  const phone = searchParams.get("phone");

  const whatsappLink =
    msg && phone
      ? `https://wa.me/${phone}?text=${msg}`
      : "https://wa.me/919902379397"; // fallback

  return (
    <div className="min-h-screen bg-[#f5efe7] flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">

        {/* ✅ SUCCESS ICON */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-2xl">
          ✅
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-medium text-[#1a1a1a] mb-3">
          Payment Successful
        </h1>

        {/* SUBTEXT */}
        <p className="text-sm text-[#4a4a4a] leading-relaxed mb-6">
          Your order has been placed successfully.
          <br />
          We’ll start crafting your piece with care.
        </p>

        {/* BRAND LINE */}
        <p className="text-xs text-gray-400 mb-8">
          Made slowly · Delivered with intention
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3">

          {/* CONTINUE SHOPPING */}
          <Link
            href="/"
            className="w-full bg-[#b88a5a] text-white py-3 rounded-full text-sm tracking-wide hover:opacity-90 transition text-center"
          >
            Continue Shopping
          </Link>

          {/* ✅ UPDATED WHATSAPP BUTTON */}
          <a
            href={whatsappLink}
            target="_blank"
            className="w-full bg-[#25D366] text-white py-3 rounded-full text-sm tracking-wide hover:opacity-90 transition text-center"
          >
            Send Order on WhatsApp
          </a>

        </div>

      </div>

    </div>
  );
}