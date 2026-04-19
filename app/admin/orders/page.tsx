"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  size: string;
  fit: string;
  quantity: number;
  image: string;
  customSize?: string;
  notes?: string;
}

interface Order {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    email: string;
  };
  items: OrderItem[];
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      // Handle new response format: { success, orders, count, dbConnected }
      const ordersData = data.orders || (Array.isArray(data) ? data : []);
      setOrders(ordersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin-check");
      if (res.ok) {
        setAuthenticated(true);
        await fetchOrders();
      } else {
        router.push("/login");
      }
    } catch {
      router.push("/login");
    }
  }, [fetchOrders, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!authenticated) return <div className="text-center py-8">Checking authentication...</div>;
  if (loading) return <div className="text-center py-8">Loading orders...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{order.orderId}</h2>
                  <p className="text-gray-600">{order.customer.name} - {order.customer.phone}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">₹{order.total}</p>
                  <p className="text-sm text-gray-600">Status: {order.status}</p>
                  <p className="text-sm text-gray-600">Payment: {order.paymentStatus}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Products Ordered:</h3>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Size: {item.size} | Fit: {item.fit} | Qty: {item.quantity}
                        </p>
                        {item.customSize && (
                          <p className="text-sm text-gray-600">Custom Size: {item.customSize}</p>
                        )}
                        {item.notes && (
                          <p className="text-sm text-gray-600">Notes: {item.notes}</p>
                        )}
                        <p className="text-sm font-semibold">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p><strong>Address:</strong> {order.customer.address}, {order.customer.city} - {order.customer.pincode}</p>
                {order.customer.email && <p><strong>Email:</strong> {order.customer.email}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}