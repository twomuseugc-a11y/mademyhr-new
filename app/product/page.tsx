"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedFit, setSelectedFit] = useState("Regular");
  const [note, setNote] = useState("");

  const handleOrder = () => {
    const order = {
      product: "Linen Wrap Dress",
      price: "₹4,200",
      size: selectedSize,
      fit: selectedFit,
      note,
    };

    localStorage.setItem("order", JSON.stringify(order));
    router.push("/cart");
  };

  return (
    <div className="bg-[#f5efe6] min-h-screen px-10 py-16">

      {/* MAIN */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="flex gap-4">

          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative w-20 h-24 border rounded-md overflow-hidden">
                <Image
                  src="https://via.placeholder.com/200x300"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="relative w-full h-[550px]">
            <Image
              src="https://via.placeholder.com/600x800"
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">

          <h1 className="text-3xl text-[#2d2d2d]">
            Linen Wrap Dress
          </h1>

          <p className="text-lg text-gray-600">₹4,200</p>

          <p className="text-sm text-gray-600">
            This piece is made slowly, just for you.
          </p>

          {/* SIZE */}
          <div className="flex gap-2">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-3 py-1 border rounded-full text-sm ${
                  selectedSize === s
                    ? "bg-[#2d2d2d] text-white"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <p className="text-sm underline cursor-pointer">
            View Size Guide
          </p>

          {/* FIT */}
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-sm">Fit</p>

            <div className="flex gap-2">
              {["Regular", "Oversized"].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFit(f)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedFit === f
                      ? "bg-[#2d2d2d] text-white"
                      : "border border-gray-300 text-gray-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* NOTE */}
          <textarea
            placeholder="Add a note (fit, sleeve, length...)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-gray-300 p-4 text-sm rounded-md bg-white text-black placeholder-gray-400"
          />

          {/* BUTTON */}
          <button
            onClick={handleOrder}
            className="bg-[#b68a64] text-white py-3 rounded-md"
          >
            Continue to Cart
          </button>

          <p className="text-sm text-gray-500">
            Each piece takes 15–20 days to craft with care.
          </p>

        </div>
      </div>

      {/* EXTRA INFO */}
      <div className="max-w-4xl mx-auto mt-16 space-y-4">

        <details className="bg-white p-5 rounded-md">
          <summary className="cursor-pointer font-medium">Description</summary>
          <p className="mt-3 text-sm text-gray-600">
            Soft breathable linen, made just for you.
          </p>
        </details>

        <details className="bg-white p-5 rounded-md">
          <summary className="cursor-pointer font-medium">Delivery & Timeline</summary>
          <p className="mt-3 text-sm text-gray-600">
            15–20 days crafting time.
          </p>
        </details>

        <details className="bg-white p-5 rounded-md">
          <summary className="cursor-pointer font-medium">Returns & Exchanges</summary>
          <p className="mt-3 text-sm text-gray-600">
            Exchange available for size issues.
          </p>
        </details>

        <details className="bg-white p-5 rounded-md">
          <summary className="cursor-pointer font-medium">Care Instructions</summary>
          <ul className="mt-3 text-sm text-gray-600 list-disc pl-5">
            <li>Hand wash</li>
            <li>Do not bleach</li>
            <li>Dry in shade</li>
          </ul>
        </details>

      </div>

    </div>
  );
}