import { Button } from "@/components/ui/button";
import {
  Box,
  CheckCircle2,
  Home,
  Menu,
  Package,
  Search,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const STEPS: { key: OrderStatus; icon: React.ElementType; hindi: string }[] = [
  { key: "Placed", icon: Box, hindi: "ऑर्डर मिला" },
  { key: "Packed", icon: Package, hindi: "पैकिंग चालू" },
  { key: "Shipped", icon: Truck, hindi: "रास्ते में है" },
  { key: "Delivered", icon: Home, hindi: "पहुँच गया" },
];

const STATUS_INDEX: Record<OrderStatus, number> = {
  Placed: 0,
  Packed: 1,
  Shipped: 2,
  Delivered: 3,
};

const navLinks = [
  { label: "Benefits", href: "#benefits" },
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function TrackOrderPopup({ onClose }: { onClose: () => void }) {
  const [mobileInput, setMobileInput] = useState("");
  const [order, setOrder] = useState<LocalOrder | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
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
    <div
      ref={ref}
      data-ocid="track_order.modal"
      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-green-100 p-5 z-50"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-green-800 text-base">ऑर्डर ट्रैक करें</h3>
        <button
          type="button"
          data-ocid="track_order.close_button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          placeholder="10-digit मोबाइल नंबर"
          value={mobileInput}
          onChange={(e) => {
            setMobileInput(e.target.value.replace(/\D/g, "").slice(0, 10));
            setSearched(false);
            setOrder(null);
            setNotFound(false);
          }}
          data-ocid="track_order.input"
          className="flex-1 border border-green-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />
        <button
          type="submit"
          data-ocid="track_order.submit_button"
          className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-3 py-2 text-sm font-semibold flex items-center gap-1 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {searched && notFound && (
        <div
          data-ocid="track_order.error_state"
          className="text-center py-3 text-red-500 text-xs font-medium bg-red-50 rounded-xl border border-red-200"
        >
          इस नंबर से कोई ऑर्डर नहीं मिला।
        </div>
      )}

      {order && (
        <div data-ocid="track_order.card" className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800 text-sm">{order.name}</p>
            <p className="font-bold text-green-700 text-sm">₹{order.total}</p>
          </div>

          {/* Stepper */}
          <div className="relative flex items-start justify-between pt-1">
            <div className="absolute top-4 left-0 right-0 flex items-center px-[12%]">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                    activeIndex > i ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            {STEPS.map((step, i) => {
              const isActive = i <= activeIndex;
              const isCurrent = i === activeIndex;
              const Icon = step.icon;
              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center gap-1 z-10"
                  style={{ width: "25%" }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      isActive
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    } ${isCurrent ? "ring-2 ring-green-200 scale-110" : ""}`}
                  >
                    {i === 3 && isActive ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <p
                    className={`text-[10px] text-center font-semibold leading-tight ${
                      isActive ? "text-green-700" : "text-gray-400"
                    }`}
                  >
                    {step.hindi}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${
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
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-nature"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo — always visible with white pill background */}
        <a
          href="/#"
          className="flex items-center gap-2 group bg-white/95 rounded-2xl px-3 py-1.5 shadow-sm border border-green-100"
          style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
        >
          <img
            src="/assets/uploads/1773651174046-1.jpg"
            alt="Fungus Killer Logo"
            className="w-10 h-10 rounded-full object-cover shadow-sm border border-green-200"
            style={{ backgroundColor: "white" }}
            onError={(e) => {
              const target = e.currentTarget;
              target.style.backgroundColor = "#228B22";
              target.style.display = "flex";
            }}
          />
          <span className="font-display text-lg font-bold text-green-800">
            Fungus Killer
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                data-ocid="nav.link"
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="relative">
            <button
              type="button"
              data-ocid="nav.track_order.open_modal_button"
              onClick={() => setTrackOpen((v) => !v)}
              className="text-sm font-medium text-green-700 hover:text-green-900 transition-colors border border-green-300 hover:border-green-600 rounded-xl px-3 py-1.5 bg-green-50 hover:bg-green-100"
            >
              ऑर्डर ट्रैक करें
            </button>
            {trackOpen && (
              <TrackOrderPopup onClose={() => setTrackOpen(false)} />
            )}
          </li>
        </ul>

        <Button
          asChild
          className="hidden md:flex btn-orange shadow-orange rounded-xl font-semibold"
          size="sm"
        >
          <a href="#contact">Order Now</a>
        </Button>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              data-ocid="nav.link"
              href={link.href}
              className="text-sm font-medium text-foreground py-1 hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            data-ocid="nav.track_order.open_modal_button"
            onClick={() => {
              setOpen(false);
              setTrackOpen(true);
            }}
            className="text-sm font-semibold text-green-700 border border-green-300 rounded-xl px-4 py-2 bg-green-50 text-left"
          >
            🔍 ऑर्डर ट्रैक करें
          </button>
          <Button
            onClick={() => setOpen(false)}
            className="btn-orange w-full mt-2 rounded-xl font-semibold"
            size="sm"
            asChild
          >
            <a href="#contact">Order Now</a>
          </Button>
        </div>
      )}

      {/* Mobile track popup - shown below header */}
      {trackOpen && (
        <div className="md:hidden px-6 pb-4 bg-card border-t border-green-100">
          <TrackOrderPopup onClose={() => setTrackOpen(false)} />
        </div>
      )}
    </header>
  );
}
