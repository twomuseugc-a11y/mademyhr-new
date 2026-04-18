"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
      console.log("Error fetching orders");
    }
  };

  useEffect(() => {
    fetchOrders().then(() => setLoading(false)); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  // 🔥 UPDATE STATUS
  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/update-order-status", {
      method: "POST",
      body: JSON.stringify({ id, status }),
    });

    fetchOrders();
  };

  // 🎨 STATUS COLOR
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "text-blue-500";
      case "confirmed":
        return "text-green-600";
      case "stitching":
        return "text-yellow-600";
      case "ready":
        return "text-purple-600";
      case "dispatched":
        return "text-black";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe7] px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-semibold mb-8">
          Admin Orders Dashboard
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <div className="space-y-6">

            {orders.map((order, i) => {
              const phone = order.customer?.phone || "";
              const whatsappMsg = `Hi ${order.customer?.name}, your order is ${order.status}`;
              const whatsappLink = `https://wa.me/91${phone}?text=${encodeURIComponent(whatsappMsg)}`;

              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="font-semibold text-lg">
                        {order.customer?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.customer?.phone}
                      </p>
                    </div>

                    <p className={`text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </p>
                  </div>

                  {/* ITEMS */}
                  <div className="space-y-2 text-sm">
                    {order.items.map((item: any, idx: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                      <div key={idx} className="flex justify-between">
                        <span>
                          {item.name} ({item.size})
                        </span>
                        <span>₹{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* TOTAL */}
                  <div className="border-t mt-4 pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{order.total}</span>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-wrap gap-2 mt-5">

                    <button
                      onClick={() => updateStatus(order._id, "confirmed")}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "stitching")}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Stitching
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "ready")}
                      className="bg-purple-500 text-white px-3 py-1 rounded"
                    >
                      Ready
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "dispatched")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Dispatch
                    </button>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      className="bg-black text-white px-3 py-1 rounded"
                    >
                      WhatsApp
                    </a>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}