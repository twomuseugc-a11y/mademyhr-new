"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    alert("Product Added 🎉");
  };

  return (
    <div className="min-h-screen bg-[#f5efe7] px-6 py-16 flex justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg">

        <h1 className="text-2xl mb-6">Admin Panel</h1>

        <div className="space-y-4">

          <input name="name" placeholder="Product Name" onChange={handleChange}
            className="w-full border p-3 rounded" />

          <input name="price" placeholder="Price" onChange={handleChange}
            className="w-full border p-3 rounded" />

          <input name="image" placeholder="Image URL" onChange={handleChange}
            className="w-full border p-3 rounded" />

          <textarea name="description" placeholder="Description"
            onChange={handleChange}
            className="w-full border p-3 rounded" />

          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded"
          >
            Add Product
          </button>

        </div>

      </div>

    </div>
  );
}