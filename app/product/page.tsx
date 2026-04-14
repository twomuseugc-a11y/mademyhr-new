"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext"; // ✅ IMPORT

export default function ProductPage() {
  const router = useRouter();

  const { addToCart } = useCart(); // ✅ USE CONTEXT

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedFit, setSelectedFit] = useState("Regular");
  const [note, setNote] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    "https://via.placeholder.com/600x800",
    "https://via.placeholder.com/600x800?text=2",
    "https://via.placeholder.com/600x800?text=3",
  ];

  // ✅ UPDATED FUNCTION
  const handleOrder = () => {
    addToCart({
      id: 1,
      name: "Linen Wrap Dress",
      price: 4200,
      size: selectedSize,
      fit: selectedFit,
      note,
      image: "/dress.jpg",
    });

    router.push("/cart");
  };

  return (
    <div className="bg-[#f5efe6] min-h-screen px-6 md:px-10 py-16">

      {/* MAIN */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT */}
        <div className="flex gap-6">

          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-24 border rounded-md overflow-hidden cursor-pointer transition ${
                  selectedImage === i
                    ? "border-black"
                    : "border-gray-300 opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full h-[550px] rounded-xl overflow-hidden">
            <Image
              src={images[selectedImage]}
              alt=""
              fill
              className="object-cover transition duration-300"
            />
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">

          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-[#1a1a1a]">
            Linen Wrap Dress
          </h1>

          <p className="text-lg text-[#1a1a1a] font-medium">₹4,200</p>

          <p className="text-sm text-[#3a3a3a] leading-relaxed">
            Made-to-order · Ships in 15–20 days
          </p>

          {/* SIZE */}
          <div className="flex gap-3 mt-2">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-4 py-2 border rounded-full text-sm transition ${
                  selectedSize === s
                    ? "bg-black text-white"
                    : "border-gray-300 text-gray-700 hover:bg-black hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <p className="text-sm underline cursor-pointer text-[#4a4a4a] hover:text-black">
            View Size Guide
          </p>

          {/* FIT */}
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-sm text-[#3a3a3a]">Fit</p>

            <div className="flex gap-2">
              {["Regular", "Oversized"].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFit(f)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    selectedFit === f
                      ? "bg-black text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-black hover:text-white"
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
            className="w-full border border-gray-300 p-4 text-sm rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:border-black transition"
          />

          {/* BUTTON */}
          <button
            onClick={handleOrder}
            className="bg-[#b68a64] text-white py-3 rounded-full tracking-wide hover:opacity-90 active:scale-95 transition"
          >
            Continue to Cart
          </button>

          <p className="text-sm text-[#4a4a4a] leading-relaxed">
            Each piece is crafted exclusively after your order is placed.
          </p>

        </div>
      </div>

      {/* EXTRA INFO */}
      <div className="max-w-4xl mx-auto mt-20 space-y-4">

        {[
          {
            title: "Description",
            content: "Soft breathable linen, made just for you.",
          },
          {
            title: "Delivery & Timeline",
            content: "15–20 days crafting time.",
          },
          {
            title: "Returns & Exchanges",
            content: "Exchange available for size issues.",
          },
          {
            title: "Care Instructions",
            content: "Hand wash · Do not bleach · Dry in shade",
          },
        ].map((item, i) => (
          <details
            key={i}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <summary className="cursor-pointer font-medium text-[#1a1a1a]">
              {item.title}
            </summary>
            <p className="mt-3 text-sm text-[#3a3a3a] leading-relaxed">
              {item.content}
            </p>
          </details>
        ))}

      </div>

    </div>
  );
}