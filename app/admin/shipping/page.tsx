"use client";

import { useState } from "react";

export default function ShippingPage() {
  const [courier, setCourier] = useState("");
  const [trackingId, setTrackingId] = useState("");

  const handleSave = async () => {
    await fetch("/api/update-dispatch", {
      method: "POST",
      body: JSON.stringify({
        id: "", // we will connect this later
        courier,
        trackingId,
      }),
    });

    alert("Saved");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Dispatch Order
      </h1>

      <select
        value={courier}
        onChange={(e) => setCourier(e.target.value)}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Select Courier</option>
        <option>Delhivery</option>
        <option>DTDC</option>
        <option>Blue Dart</option>
      </select>

      <input
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        placeholder="Tracking ID"
        className="border p-2 mb-4 w-full"
      />

      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Dispatch
      </button>
    </div>
  );
}