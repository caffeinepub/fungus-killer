import { Box, CheckCircle2, Home, Package, Search, Truck } from "lucide-react";
import { useEffect, useState } from "react";

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

const STORAGE_KEY = "fk_orders";

const STEPS: {
  key: OrderStatus;
  icon: React.ElementType;
  hindi: string;
  label: string;
}[] = [
  { key: "Placed", icon: Box, hindi: "ऑर्डर मिला", label: "Order Placed" },
  { key: "Packed", icon: Package, hindi: "पैकिंग चालू", label: "Packed" },
  { key: "Shipped", icon: Truck, hindi: "रास्ते में है", label: "Shipped" },
  { key: "Delivered", icon: Home, hindi: "पहुँच गया", label: "Delivered" },
];

const LINE_KEYS = [
  "line-placed-packed",
  "line-packed-shipped",
  "line-shipped-delivered",
];

const STATUS_INDEX: Record<OrderStatus, number> = {
  Placed: 0,
  Packed: 1,
  Shipped: 2,
  Delivered: 3,
};

export default function OrderTracking() {
  const [mobileInput, setMobileInput] = useState("");
  const [order, setOrder] = useState<LocalOrder | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);
  const [justOrdered, setJustOrdered] = useState(false);

  // Auto-fill and auto-search if customer just placed an order
  useEffect(() => {
    const savedMobile = sessionStorage.getItem("fk_track_mobile");
    if (savedMobile) {
      sessionStorage.removeItem("fk_track_mobile");
      setMobileInput(savedMobile);
      setJustOrdered(true);
      // Auto-search
      const orders: LocalOrder[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]",
      );
      const found = orders.find((o) => o.mobile === savedMobile);
      if (found) {
        setOrder(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setSearched(true);
    }
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setJustOrdered(false);
    const orders: LocalOrder[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]",
    );
    const found = orders.find((o) => o.mobile === mobileInput.trim());
    if (found) {
      setOrder(found);
      setNotFound(false);
    } else {
      setOrder(null);
      setNotFound(true);
    }
    setSearched(true);
  }

  const activeIndex = order ? STATUS_INDEX[order.status] : -1;

  return (
    <section
      id="track-order"
      className="py-16 bg-gradient-to-b from-white to-green-50 border-t border-green-100"
    >
      <div className="container mx-auto px-6 max-w-2xl">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Track Order
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
            अपना ऑर्डर ट्रैक करें
          </h2>
          {justOrdered ? (
            <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-300 rounded-2xl px-5 py-2.5">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-green-800 font-semibold text-sm">
                बधाई हो! आपका ऑर्डर सफलतापूर्वक दर्ज कर लिया गया है। नीचे आप लाइव स्टेटस
                देख सकते हैं।
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground mt-3 text-base">
              अपना मोबाइल नंबर डालें और अपने ऑर्डर की स्थिति जानें।
            </p>
          )}
        </div>

        {/* Mobile Search */}
        <form
          onSubmit={handleSearch}
          className="flex gap-3 mb-10"
          data-ocid="tracking.section"
        >
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit मोबाइल नंबर"
            value={mobileInput}
            onChange={(e) => {
              setMobileInput(e.target.value.replace(/\D/g, "").slice(0, 10));
              setSearched(false);
              setJustOrdered(false);
            }}
            data-ocid="tracking.input"
            className="flex-1 border border-green-300 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
          <button
            type="submit"
            data-ocid="tracking.submit_button"
            className="bg-green-700 hover:bg-green-800 text-white rounded-2xl px-6 py-3 text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            खोजें
          </button>
        </form>

        {/* Not found message */}
        {searched && notFound && (
          <div
            data-ocid="tracking.error_state"
            className="text-center py-6 text-red-500 text-sm font-medium bg-red-50 rounded-2xl border border-red-200"
          >
            इस मोबाइल नंबर से कोई ऑर्डर नहीं मिला।
          </div>
        )}

        {/* Tracking Line */}
        {order && (
          <div
            data-ocid="tracking.card"
            className="bg-white rounded-3xl shadow-md border border-green-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-bold text-gray-800">{order.name}</p>
                <p className="text-sm text-gray-500">📱 {order.mobile}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">₹{order.total}</p>
                <p className="text-xs text-gray-400">{order.date}</p>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative flex items-start justify-between">
              {/* Connecting lines between icons */}
              <div className="absolute top-5 left-0 right-0 flex items-center px-[10%]">
                {LINE_KEYS.map((lineKey, i) => (
                  <div
                    key={lineKey}
                    className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                      activeIndex > i ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Steps */}
              {STEPS.map((step, i) => {
                const isActive = i <= activeIndex;
                const isCurrent = i === activeIndex;
                const Icon = step.icon;

                return (
                  <div
                    key={step.key}
                    className="flex flex-col items-center gap-2 z-10"
                    style={{ width: "25%" }}
                  >
                    {/* Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        isActive
                          ? "bg-green-500 border-green-500 text-white shadow-lg"
                          : "bg-white border-gray-300 text-gray-400"
                      } ${isCurrent ? "ring-4 ring-green-200 scale-110" : ""}`}
                    >
                      {i === 3 && isActive ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>

                    {/* Hindi label */}
                    <p
                      className={`text-xs text-center font-semibold leading-tight ${
                        isActive ? "text-green-700" : "text-gray-400"
                      }`}
                    >
                      {step.hindi}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Status badge */}
            <div className="mt-6 flex justify-center">
              <span
                className={`px-5 py-2 rounded-full text-sm font-bold border ${
                  activeIndex === 3
                    ? "bg-green-100 text-green-800 border-green-300"
                    : activeIndex === 2
                      ? "bg-blue-100 text-blue-800 border-blue-300"
                      : activeIndex === 1
                        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {activeIndex === 3
                  ? "✅ पहुँच गया!"
                  : activeIndex === 2
                    ? "🚚 रास्ते में है"
                    : activeIndex === 1
                      ? "📦 पैकिंग चालू"
                      : "🛒 ऑर्डर मिला"}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
