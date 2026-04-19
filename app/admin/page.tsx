"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Order {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    phone: string;
    address?: string;
    city?: string;
    pincode?: string;
    email?: string;
  };
  status: string;
  total: number;
  items: {
    id?: string;
    name?: string;
    size?: string;
    fit?: string;
    quantity?: number;
    price?: number;
    image?: string;
    customMeasurements?: string;
    notes?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  deadline?: string | null;
  dispatch?: {
    courier?: string;
    trackingId?: string;
  } | null;
  paymentStatus?: string;
  paymentId?: string;
  timeline?: {
    createdAt?: string;
    confirmedAt?: string;
    stitchingAt?: string;
    readyAt?: string;
    dispatchedAt?: string;
    deliveredAt?: string;
  };
}

const statusConfig = {
  new: { color: "bg-blue-500 text-white", label: "New" },
  pending: { color: "bg-blue-500 text-white", label: "New" }, // Backward compatibility
  confirmed: { color: "bg-blue-500 text-white", label: "Confirmed" },
  stitching: { color: "bg-yellow-500 text-white", label: "Stitching" },
  ready: { color: "bg-purple-500 text-white", label: "Ready" },
  dispatched: { color: "bg-orange-500 text-white", label: "Dispatched" },
  delivered: { color: "bg-green-500 text-white", label: "Delivered" },
  return: { color: "bg-red-500 text-white", label: "Return" },
  refund: { color: "bg-red-500 text-white", label: "Refund" },
};

const statusSections = [
  { key: "new", title: "🆕 New Orders", statuses: ["new", "pending"] }, // Include pending for backward compatibility
  { key: "stitching", title: "✂️ Stitching", statuses: ["confirmed", "stitching"] },
  { key: "ready", title: "📦 Ready", statuses: ["ready"] },
  { key: "dispatched", title: "🚚 Dispatched", statuses: ["dispatched"] },
  { key: "delivered", title: "✅ Delivered", statuses: ["delivered"] },
];

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'today' | 'pending'>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin-check");
      if (res.ok) {
        setAuthenticated(true);
        fetchOrders();
      } else {
        router.push("/login");
      }
    } catch {
      router.push("/login");
    }
  };

  const fetchOrders = async () => {
    try {
      console.log("[ADMIN] Fetching orders...");
      const res = await fetch("/api/orders");

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("[ADMIN] API Response:", data);

      // Handle new response format: { success, orders, count, dbConnected }
      const orders = data.orders || (Array.isArray(data) ? data : []);
      console.log(`[ADMIN] Received ${orders.length} orders from API`);

      // Check if database connection failed
      if (data.dbConnected === false) {
        console.error("[ADMIN] Database connection failed:", data.error);
        alert("Database connection failed. Orders may not be up to date.");
      }

      setOrders(orders);
    } catch (error) {
      console.error("[ADMIN] Failed to fetch orders:", error);
      setOrders([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin-logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    console.log(`[ADMIN] Updating order ${orderId} status to ${newStatus}`);
    setUpdatingOrder(orderId);
    try {
      const res = await fetch("/api/update-order-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (res.ok) {
        console.log(`[ADMIN] Status updated successfully, refreshing orders...`);
        await fetchOrders(); // Refresh orders
      } else {
        console.error(`[ADMIN] Failed to update status: ${res.status}`);
      }
    } catch (error) {
      console.error("[ADMIN] Failed to update status:", error);
    } finally {
      setUpdatingOrder(null);
    }
  };

  const updateDispatch = async (orderId: string, courier: string, trackingId: string) => {
    console.log(`[ADMIN] Updating dispatch for order ${orderId}: ${courier} - ${trackingId}`);
    try {
      const res = await fetch("/api/update-dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, courier, trackingId }),
      });

      const data = await res.json();
      console.log(`[ADMIN] Dispatch update response:`, data);

      if (res.ok) {
        console.log(`[ADMIN] Dispatch updated successfully, refreshing orders...`);
        await fetchOrders(); // Refresh orders
        return true;
      } else {
        console.error(`[ADMIN] Failed to update dispatch: ${res.status} - ${data.error || JSON.stringify(data)}`);
        return false;
      }
    } catch (error) {
      console.error("[ADMIN] Failed to update dispatch:", error);
      return false;
    }
  };

  const updateDeadline = async (orderId: string, deadline: string) => {
    console.log(`[ADMIN] Updating deadline for order ${orderId}: ${deadline}`);
    try {
      const res = await fetch("/api/update-deadline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, deadline }),
      });

      console.log(`[ADMIN] Deadline update response status: ${res.status}`);

      if (res.ok) {
        const data = await res.json();
        console.log(`[ADMIN] Deadline updated successfully:`, data);
        await fetchOrders(); // Refresh orders
        return true;
      } else {
        const errorText = await res.text();
        console.error(`[ADMIN] Failed to update deadline: ${res.status} - ${errorText}`);
        return false;
      }
    } catch (error) {
      console.error("[ADMIN] Failed to update deadline (network error):", error);
      return false;
    }
  };

  const deleteOrder = async (orderId: string) => {
    console.log(`[ADMIN] Deleting order ${orderId}`);
    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
      if (res.ok) {
        console.log(`[ADMIN] Order deleted successfully, refreshing orders...`);
        await fetchOrders(); // Refresh orders
        setShowDeleteModal(false);
        setOrderToDelete(null);
      } else {
        console.error(`[ADMIN] Failed to delete order: ${res.status}`);
      }
    } catch (error) {
      console.error("[ADMIN] Failed to delete order:", error);
    }
  };

  const openWhatsApp = (phone: string, orderId: string, status: string) => {
    const message = `Hi! Your order ${orderId || "N/A"} is now ${status}. Thank you for choosing madebyhr! ❤️`;
    const whatsappUrl = `https://wa.me/91${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const getStats = () => {
    const allOrders = orders;
    const today = new Date().toDateString();
    const todayOrders = allOrders.filter(order =>
      order.createdAt && new Date(order.createdAt).toDateString() === today
    );

    const pendingOrders = allOrders.filter(order =>
      ["new", "pending", "confirmed", "stitching", "ready", "dispatched"].includes(order.status)
    );

    const totalRevenue = allOrders
      .filter(order => order.status === "delivered")
      .reduce((sum, order) => sum + (order.total || 0), 0);

    console.log(`[ADMIN] Stats calculated: ${todayOrders.length} today, ${pendingOrders.length} pending, ₹${totalRevenue} revenue`);

    return {
      todayOrders: todayOrders.length,
      pendingOrders: pendingOrders.length,
      revenue: totalRevenue,
    };
  };

  const groupOrdersByStatus = () => {
    const filteredOrders = getFilteredOrders();
    const grouped: { [key: string]: Order[] } = {};
    statusSections.forEach(section => {
      grouped[section.key] = filteredOrders.filter(order =>
        section.statuses.includes(order.status)
      );
    });
    return grouped;
  };

  const getFilteredOrders = () => {
    let filtered = orders;

    if (filter === 'today') {
      const today = new Date().toDateString();
      filtered = orders.filter(order =>
        order.createdAt && new Date(order.createdAt).toDateString() === today
      );
      console.log(`[ADMIN] Filtered to ${filtered.length} today orders`);
    } else if (filter === 'pending') {
      filtered = orders.filter(order =>
        ["new", "pending", "confirmed", "stitching", "ready", "dispatched"].includes(order.status)
      );
      console.log(`[ADMIN] Filtered to ${filtered.length} pending orders`);
    } else if (filter === 'all') {
      // Explicitly handle 'all' filter
      filtered = orders;
      console.log(`[ADMIN] Showing all ${filtered.length} orders`);
    }
    // For any other filter value, default to all orders

    return filtered;
  };

  const isOverdue = (order: Order) => {
    if (!order.deadline) return false;
    return new Date(order.deadline) < new Date();
  };

  const isDueToday = (order: Order) => {
    if (!order.deadline) return false;
    const today = new Date().toDateString();
    return new Date(order.deadline).toDateString() === today;
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center">
        <div className="text-xl text-gray-600">Checking authentication...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  const stats = getStats();
  const groupedOrders = groupOrdersByStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">madebyhr</h1>
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.open("https://wa.me/919902379397", "_blank")}
                className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📱 WhatsApp
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Controls */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Filter:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'today' | 'pending')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Orders</option>
                <option value="today">Today</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Orders Today</p>
                <p className="text-5xl font-bold text-gray-900">{stats.todayOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Orders</p>
                <p className="text-5xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Revenue</p>
                <p className="text-5xl font-bold text-gray-900">₹{stats.revenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Sections */}
        <div className="space-y-12">
          {statusSections.map(section => {
            const sectionOrders = groupedOrders[section.key] || [];

            return (
              <div key={section.key} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {sectionOrders.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sectionOrders.length > 0 ? sectionOrders.map((order) => (
                    <OrderCard
                      key={order._id}
                      order={order}
                      onStatusUpdate={updateOrderStatus}
                      onDispatchUpdate={updateDispatch}
                      onDeadlineUpdate={updateDeadline}
                      onWhatsApp={openWhatsApp}
                      onDelete={(id) => {
                        setOrderToDelete(id);
                        setShowDeleteModal(true);
                      }}
                      updating={updatingOrder === order._id}
                      isOverdue={isOverdue(order)}
                      isDueToday={isDueToday(order)}
                    />
                  )) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500 text-lg">No orders found in this section</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Order</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => orderToDelete && deleteOrder(orderToDelete)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderCard({
  order,
  onStatusUpdate,
  onDispatchUpdate,
  onDeadlineUpdate,
  onWhatsApp,
  onDelete,
  updating,
  isOverdue,
  isDueToday
}: {
  order: Order;
  onStatusUpdate: (orderId: string, status: string) => void;
  onDispatchUpdate: (orderId: string, courier: string, trackingId: string) => Promise<boolean>;
  onDeadlineUpdate: (orderId: string, deadline: string) => Promise<boolean>;
  onWhatsApp: (phone: string, orderId: string, status: string) => void;
  onDelete: (orderId: string) => void;
  updating: boolean;
  isOverdue: boolean;
  isDueToday: boolean;
}) {
  const [courier, setCourier] = useState(order.dispatch?.courier || "");
  const [trackingId, setTrackingId] = useState(order.dispatch?.trackingId || "");
  const [deadline, setDeadline] = useState(order.deadline ? new Date(order.deadline).toISOString().split('T')[0] : "");
  const [deadlineChanged, setDeadlineChanged] = useState(false);
  const [dispatchUpdating, setDispatchUpdating] = useState(false);
  const [dispatchMessage, setDispatchMessage] = useState<string>("");
  const [deadlineMessage, setDeadlineMessage] = useState<string>("");

  useEffect(() => {
    if (!courier) {
      setCourier(order.dispatch?.courier || "");
    }
  }, [order.dispatch?.courier, courier]);

  useEffect(() => {
    if (!trackingId) {
      setTrackingId(order.dispatch?.trackingId || "");
    }
  }, [order.dispatch?.trackingId, trackingId]);

  useEffect(() => {
    setDeadline(order.deadline ? new Date(order.deadline).toISOString().split('T')[0] : "");
    setDeadlineChanged(false);
    setDeadlineMessage("");
  }, [order.deadline]);

  const handleDispatch = async () => {
    if (!courier || !trackingId) {
      console.warn("Dispatch update blocked: courier or tracking ID missing");
      setDispatchMessage("Please enter both courier and tracking ID.");
      return;
    }

    setDispatchUpdating(true);
    setDispatchMessage("");

    try {
      const success = await onDispatchUpdate(order._id, courier, trackingId);

      if (success) {
        console.log(`[ORDER CARD] Dispatch update successful for ${order._id}`);
        setDispatchMessage("Dispatch updated successfully.");
      } else {
        console.error(`[ORDER CARD] Dispatch update failed for ${order._id}`);
        setDispatchMessage("Failed to update dispatch. Please try again.");
      }
    } finally {
      setDispatchUpdating(false);
    }
  };

  const handleDeadlineChange = (newDeadline: string) => {
    setDeadline(newDeadline);
    setDeadlineChanged(true);
    setDeadlineMessage("");
  };

  const handleDeadlineSave = async () => {
    if (!deadline) return;

    setDeadlineMessage("");
    const success = await onDeadlineUpdate(order._id, deadline);

    if (success) {
      setDeadlineChanged(false);
      setDeadlineMessage("Deadline updated successfully.");
    } else {
      setDeadlineMessage("Failed to update deadline. Please try again.");
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
      isOverdue ? "border-red-300 bg-red-50" :
      isDueToday ? "border-yellow-300 bg-yellow-50" :
      "border-gray-100"
    } ${updating ? "opacity-50" : ""}`}>

      {/* Top Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{order.customer?.name || "Customer"}</h3>
          <p className="text-sm text-gray-600 mb-1">{order.customer?.phone || "Phone not provided"}</p>
          <p className="text-xs text-gray-500">Order #{order.orderId || order._id.slice(-6)}</p>
          {order.customer?.address && (
            <p className="text-xs text-gray-500 mt-1">{order.customer.address}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <select
            value={order.status}
            onChange={(e) => onStatusUpdate(order._id, e.target.value)}
            disabled={updating}
            className={`px-4 py-2 text-sm font-medium rounded-full border-0 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 ${statusConfig[order.status as keyof typeof statusConfig]?.color || "bg-gray-500 text-white"}`}
          >
            <option value="new">New</option>
            <option value="pending">New</option> {/* Backward compatibility */}
            <option value="confirmed">Confirmed</option>
            <option value="stitching">Stitching</option>
            <option value="ready">Ready</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="return">Return</option>
            <option value="refund">Refund</option>
          </select>
          <button
            onClick={() => onDelete(order._id)}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Item Summary & Total */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-600">
            {order.items && order.items.length > 0
              ? `${order.items.length} item${order.items.length !== 1 ? 's' : ''} • ${order.items[0]?.name || "Item"}${order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}`
              : "No items found"
            }
          </p>
          <div className="bg-amber-50 px-4 py-2 rounded-xl">
            <span className="text-lg font-bold text-gray-900">₹{order.total || 0}</span>
          </div>
        </div>
      </div>

      {/* Deadline */}
      <div className="mb-4">
        <label className="block text-base font-semibold text-gray-900 mb-2">Expected Completion Date</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => handleDeadlineChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white text-gray-900 appearance-none"
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
          <div>
            {isOverdue && (
              <p className="text-sm font-semibold text-red-700 flex items-center gap-2">
                ⚠️ Overdue
              </p>
            )}
            {isDueToday && !isOverdue && (
              <p className="text-sm font-semibold text-yellow-700 flex items-center gap-2">
                ⏰ Due Today
              </p>
            )}
            {!deadline && (
              <p className="text-sm text-gray-600">No deadline set</p>
            )}
          </div>
          <button
            onClick={handleDeadlineSave}
            disabled={!deadlineChanged || !deadline}
            className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
          >
            {deadlineChanged ? "Save Deadline" : "Deadline Saved"}
          </button>
        </div>
        {deadlineMessage && (
          <p className="mt-2 text-sm text-blue-700">{deadlineMessage}</p>
        )}
      </div>

      {/* Dispatch Section */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Dispatch & Tracking</h4>
        {(order.dispatch?.courier || courier) ? (
          <div className="p-3 bg-green-50 rounded-xl mb-3">
            <p className="text-sm text-green-800">
              🚚 {order.dispatch?.courier || courier} • Tracking: {order.dispatch?.trackingId || trackingId || "No tracking ID"}
            </p>
          </div>
        ) : (
          <div className="p-3 bg-gray-50 rounded-xl mb-3">
            <p className="text-sm text-gray-600">No dispatch information added</p>
          </div>
        )}

        <div className="space-y-3">
          <select
            value={courier}
            onChange={(e) => setCourier(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="">Select Courier</option>
            <option value="Delhivery">Delhivery</option>
            <option value="DTDC">DTDC</option>
            <option value="Blue Dart">Blue Dart</option>
            <option value="FedEx">FedEx</option>
          </select>
          <input
            type="text"
            placeholder="Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          />
          <button
            type="button"
            onClick={handleDispatch}
            disabled={!courier || !trackingId || dispatchUpdating}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
          >
            {dispatchUpdating ? "Updating..." : "Update Dispatch"}
          </button>
          {dispatchMessage && (
            <p className="mt-2 text-sm text-blue-700">{dispatchMessage}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onWhatsApp(order.customer?.phone || "", order.orderId || order._id, statusConfig[order.status as keyof typeof statusConfig]?.label || order.status)}
          className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 font-medium"
        >
          💬 WhatsApp
        </button>
      </div>
    </div>
  );
}
