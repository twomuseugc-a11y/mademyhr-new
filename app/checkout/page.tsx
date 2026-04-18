"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

declare global {
  interface Window {
    Razorpay: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity, // eslint-disable-line @typescript-eslint/no-explicit-any
    0
  );

  const handlePayment = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill required details");
      return;
    }

    try {
      // ✅ CREATE ORDER
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      if (!order.id) {
        alert("Order creation failed");
        return;
      }

      // ✅ RAZORPAY OPTIONS
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "madebyhr",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          try {
            // ✅ VERIFY PAYMENT
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
              alert("Payment verification failed ❌");
              return;
            }

            // ✅ SAVE ORDER
            await fetch("/api/save-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                customer: form,
                items: cart,
                total,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                status: "paid",
              }),
            });

            // 🔥 KEEP YOUR LOCAL STORAGE (UNCHANGED)
            localStorage.setItem(
              "lastOrder",
              JSON.stringify({
                name: form.name,
                phone: form.phone,
                total,
                items: cart,
              })
            );

            // 🔥 ✅ ADDED WHATSAPP MESSAGE
            const message = `
New Order 🛍️

Name: ${form.name}
Phone: ${form.phone}
Address: ${form.address}, ${form.city} - ${form.pincode}

Items:
${cart
  .map(
    (item: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
      `• ${item.name} (${item.size}, ${item.fit}) x${item.quantity} = ₹${
        item.price * item.quantity
      }`
  )
  .join("\n")}

Total: ₹${total}
`;

            const encodedMessage = encodeURIComponent(message);

            const phoneNumber = "919902379397";

            // ✅ CLEAR CART
            clearCart();

            // 🔥 UPDATED REDIRECT (ONLY CHANGE)
            router.push(`/success?msg=${encodedMessage}&phone=${phoneNumber}`);

          } catch (err) {
            console.error("VERIFY ERROR:", err);
            alert("Something went wrong after payment");
          }
        },

        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },

        theme: {
          color: "#b88a5a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("PAYMENT ERROR:", error);
      alert("Something went wrong");
    }
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

          <div className="space-y-4 text-sm text-[#3a3a3a]">

            {cart.map((item: any, index: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-[#1a1a1a]">{item.name}</p>
                  <p className="text-xs text-gray-600">
                    Size: {item.size}, Fit: {item.fit} × {item.quantity}
                  </p>
                </div>
                <span className="font-medium">₹{item.price * item.quantity}</span>
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