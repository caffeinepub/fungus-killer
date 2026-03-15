import { useState } from "react";

type OrderStatus = "Placed" | "Packed" | "Shipped" | "Delivered";

interface LocalOrder {
  id: string;
  name: string;
  mobile: string;
  address: string;
  city: string;
  pincode: string;
  quantity: number;
  total: number;
  date: string;
  status: OrderStatus;
}

const STATUS_OPTIONS: OrderStatus[] = [
  "Placed",
  "Packed",
  "Shipped",
  "Delivered",
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  Placed: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Packed: "bg-blue-100 text-blue-700 border-blue-300",
  Shipped: "bg-purple-100 text-purple-700 border-purple-300",
  Delivered: "bg-green-100 text-green-700 border-green-300",
};

const PASSWORD = "741571";
const STORAGE_KEY = "fk_orders";

export function saveOrderToStorage(
  order: Omit<LocalOrder, "id" | "date" | "status">,
) {
  const existing: LocalOrder[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]",
  );
  const newOrder: LocalOrder = {
    ...order,
    id: Date.now().toString(),
    date: new Date().toLocaleString("en-IN"),
    status: "Placed",
  };
  existing.unshift(newOrder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export default function SecretOrderView() {
  const [triggered, setTriggered] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [orders, setOrders] = useState<LocalOrder[]>([]);

  function handleTrigger() {
    setTriggered(true);
  }

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      const stored: LocalOrder[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]",
      );
      setOrders(stored);
      setUnlocked(true);
      setWrongPassword(false);
    } else {
      setWrongPassword(true);
    }
  }

  function updateStatus(id: string, status: OrderStatus) {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  return (
    <div className="w-full">
      {/* Hidden trigger - small padlock icon */}
      {!triggered && (
        <div className="flex justify-center py-3">
          <button
            type="button"
            data-ocid="secret.toggle"
            onClick={handleTrigger}
            className="text-xs text-gray-300 hover:text-gray-500 transition-colors select-none cursor-pointer"
            title="Admin"
          >
            🔒
          </button>
        </div>
      )}

      {/* Password prompt */}
      {triggered && !unlocked && (
        <div className="py-10 px-6 bg-gray-50 border-t border-gray-200">
          <form
            onSubmit={handleUnlock}
            className="max-w-sm mx-auto flex flex-col items-center gap-4"
          >
            <p className="text-sm text-gray-500 font-medium">🔐 Admin Access</p>
            <input
              data-ocid="secret.input"
              type="password"
              placeholder="Password डालें"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-600"
            />
            {wrongPassword && (
              <p className="text-red-500 text-xs">
                गलत password। फिर कोशिश करें।
              </p>
            )}
            <button
              type="submit"
              data-ocid="secret.submit_button"
              className="w-full bg-green-700 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-green-800 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      )}

      {/* Order list */}
      {unlocked && (
        <div className="py-10 px-4 bg-gray-50 border-t border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl text-gray-800">
                📦 Order List ({orders.length})
              </h2>
              <button
                type="button"
                onClick={() => {
                  setUnlocked(false);
                  setTriggered(false);
                  setPasswordInput("");
                }}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                बंद करें
              </button>
            </div>

            {orders.length === 0 ? (
              <p
                data-ocid="secret.empty_state"
                className="text-center text-gray-400 py-10"
              >
                अभी कोई ऑर्डर नहीं है।
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order, idx) => (
                  <div
                    key={order.id}
                    data-ocid={`secret.order.card.${idx + 1}`}
                    className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-bold text-gray-800 text-base">
                          {order.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          📱 {order.mobile}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-700">
                          ₹{order.total}
                        </p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-1">
                      📍 {order.address}, {order.city} - {order.pincode}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      मात्रा: {order.quantity} box
                    </p>

                    {/* Status buttons */}
                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          data-ocid={`secret.order.toggle.${idx + 1}`}
                          onClick={() => updateStatus(order.id, s)}
                          className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                            order.status === s
                              ? `${STATUS_COLORS[s]} ring-2 ring-offset-1 ring-current`
                              : "bg-white text-gray-400 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
