import { saveOrderToStorage } from "@/components/SecretOrderView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSubmitOrder } from "@/hooks/useQueries";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [mobileError, setMobileError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");

  const { mutate, isPending, isError, error } = useSubmitOrder();

  function handleMobileChange(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    setMobile(digits);
    if (digits.length > 0 && digits.length < 10) {
      setMobileError("मोबाइल नंबर 10 अंकों का होना चाहिए।");
    } else {
      setMobileError("");
    }
  }

  function handlePincodeChange(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 6);
    setPincode(digits);
    if (digits.length > 0 && digits.length < 6) {
      setPincodeError("पिनकोड 6 अंकों का होना चाहिए।");
    } else {
      setPincodeError("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mobile.length !== 10) {
      setMobileError("मोबाइल नंबर 10 अंकों का होना चाहिए।");
      return;
    }
    if (pincode.length !== 6) {
      setPincodeError("पिनकोड 6 अंकों का होना चाहिए।");
      return;
    }
    const qty = Number.parseInt(quantity);
    const capturedName = fullName;
    const capturedMobile = mobile;
    mutate(
      {
        name: capturedName,
        mobile: capturedMobile,
        address,
        city,
        pincode,
        quantity: qty,
      },
      {
        onSuccess: () => {
          saveOrderToStorage({
            name: capturedName,
            mobile: capturedMobile,
            address,
            city,
            pincode,
            quantity: qty,
            total: qty * 149,
          });

          // Store mobile for auto-fill in tracking
          sessionStorage.setItem("fk_track_mobile", capturedMobile);

          // Reset form
          setSuccessName(capturedName);
          setFullName("");
          setMobile("");
          setAddress("");
          setCity("");
          setPincode("");
          setQuantity("1");

          // Show success banner and scroll to tracking
          setOrderSuccess(true);
          setTimeout(() => {
            const el = document.getElementById("track-order");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 800);
        },
      },
    );
  }

  const totalPrice = quantity ? Number.parseInt(quantity) * 149 : 149;

  // --- Order Success Banner ---
  if (orderSuccess) {
    return (
      <section id="contact" className="py-24 organic-section">
        <div className="container mx-auto px-6 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            data-ocid="contact.success_state"
            className="bg-white rounded-3xl shadow-xl border border-green-200 p-8 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">
                बधाई हो! 🎉
              </h2>
              <p className="text-gray-600 text-base">
                {successName} जी, आपका ऑर्डर सफलतापूर्वक दर्ज कर लिया गया है।
              </p>
              <p className="text-gray-500 text-sm mt-2">
                हमारी टीम जल्द ही आपसे contact करेगी।
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <p className="text-green-800 font-semibold text-sm">
                📦 नीचे आप अपना Live Order Status देख सकते हैं।
              </p>
            </div>
            <button
              type="button"
              data-ocid="contact.tracking_button"
              onClick={() => {
                setOrderSuccess(false);
                const el = document.getElementById("track-order");
                if (el)
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="w-full py-4 px-6 rounded-3xl font-semibold text-white text-base bg-green-700 hover:bg-green-800 transition-colors"
            >
              📦 अपना Order Track करें →
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // --- Order Form ---
  return (
    <section id="contact" className="py-24 organic-section">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Order Now
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            ऑर्डर फॉर्म
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            नीचे अपनी details भरें और हम जल्द से जल्द आपका order deliver करेंगे।
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Why Choose Fungus Killer?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Join hundreds of satisfied customers who have found lasting
                relief from skin itching and ringworm — naturally, safely, and
                effectively.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "anupamn699@gmail.com",
                  color: "bg-accent/15 text-accent",
                },
                {
                  icon: MapPin,
                  label: "Delivery",
                  value: "Nationwide delivery available",
                  color: "bg-primary/10 text-primary",
                },
                {
                  icon: Banknote,
                  label: "Price",
                  value: "₹149 per box",
                  color: "bg-cta/10 text-cta",
                },
                {
                  icon: Truck,
                  label: "Payment",
                  value: "Cash on Delivery (COD) — सामान मिलने पर पैसे दें",
                  color: "bg-green-100 text-green-700",
                },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {label}
                    </p>
                    <p className="text-muted-foreground text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-3xl bg-primary/8 border border-primary/20">
              <p className="text-primary font-semibold text-sm mb-1">
                🌿 Natural Promise
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every box of Fungus Killer is handmade in small batches with the
                finest natural ingredients. If you're not satisfied, we'll make
                it right.
              </p>
            </div>
          </motion.div>

          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-3xl p-8 shadow-nature border border-border space-y-5"
            >
              <div className="pb-2 border-b border-border">
                <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Professional Order Form
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  सभी fields भरना अनिवार्य है।
                </p>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-2.5">
                <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
                <div>
                  <p className="text-green-800 font-semibold text-sm">
                    Secure COD — Cash on Delivery
                  </p>
                  <p className="text-green-600 text-xs">
                    सामान मिलने पर पैसे दें — 100% Safe & Trusted
                  </p>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="fullName"
                  className="text-foreground font-medium flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  पूरा नाम{" "}
                  <span className="text-muted-foreground font-normal">
                    (Full Name)
                  </span>
                </Label>
                <Input
                  id="fullName"
                  data-ocid="contact.input"
                  placeholder="अपना पूरा नाम लिखें"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="border-border focus:border-primary rounded-xl"
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="mobile"
                  className="text-foreground font-medium flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  मोबाइल नंबर{" "}
                  <span className="text-muted-foreground font-normal">
                    (Mobile Number)
                  </span>
                </Label>
                <Input
                  id="mobile"
                  data-ocid="contact.search_input"
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={(e) => handleMobileChange(e.target.value)}
                  required
                  inputMode="numeric"
                  maxLength={10}
                  className={`border-border focus:border-primary rounded-xl ${
                    mobileError ? "border-destructive" : ""
                  }`}
                />
                {mobileError && (
                  <p
                    data-ocid="contact.error_state"
                    className="text-destructive text-xs flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" /> {mobileError}
                  </p>
                )}
              </div>

              {/* Complete Address */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="address"
                  className="text-foreground font-medium flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  पूरा पता{" "}
                  <span className="text-muted-foreground font-normal">
                    (Complete Address)
                  </span>
                </Label>
                <Input
                  id="address"
                  data-ocid="contact.textarea"
                  placeholder="House No., Street, Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="border-border focus:border-primary rounded-xl"
                />
              </div>

              {/* City & Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="city"
                    className="text-foreground font-medium text-sm"
                  >
                    शहर{" "}
                    <span className="text-muted-foreground font-normal">
                      (City)
                    </span>
                  </Label>
                  <Input
                    id="city"
                    data-ocid="order.city.input"
                    placeholder="शहर का नाम"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="border-border focus:border-primary rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="pincode"
                    className="text-foreground font-medium text-sm"
                  >
                    पिनकोड{" "}
                    <span className="text-muted-foreground font-normal">
                      (Pincode)
                    </span>
                  </Label>
                  <Input
                    id="pincode"
                    data-ocid="order.pincode.input"
                    placeholder="6-digit pincode"
                    value={pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    required
                    inputMode="numeric"
                    maxLength={6}
                    className={`border-border focus:border-primary rounded-xl ${
                      pincodeError ? "border-destructive" : ""
                    }`}
                  />
                  {pincodeError && (
                    <p className="text-destructive text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {pincodeError}
                    </p>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="quantity"
                  className="text-foreground font-medium flex items-center gap-1.5"
                >
                  <Package className="w-3.5 h-3.5" />
                  मात्रा{" "}
                  <span className="text-muted-foreground font-normal">
                    (Quantity)
                  </span>
                </Label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        String(Math.max(1, Number.parseInt(quantity) - 1)),
                      )
                    }
                    className="w-10 h-10 rounded-xl border border-border bg-background text-foreground font-bold text-lg hover:bg-muted transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <Input
                    id="quantity"
                    data-ocid="order.quantity.input"
                    type="number"
                    min="1"
                    max="50"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        String(
                          Math.max(1, Number.parseInt(e.target.value) || 1),
                        ),
                      )
                    }
                    required
                    className="border-border focus:border-primary rounded-xl text-center font-bold text-lg w-20"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        String(Math.min(50, Number.parseInt(quantity) + 1)),
                      )
                    }
                    className="w-10 h-10 rounded-xl border border-border bg-background text-foreground font-bold text-lg hover:bg-muted transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                  <span className="text-muted-foreground text-sm">
                    bottle(s)
                  </span>
                </div>
              </div>

              {/* Price Summary */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/8 border border-primary/20">
                <span className="text-foreground font-medium text-sm">
                  कुल राशि (Total Amount)
                </span>
                <span className="text-primary font-bold text-xl">
                  ₹{totalPrice}
                </span>
              </div>

              <div className="flex items-start gap-2 text-sm text-green-700 font-medium bg-green-50 px-4 py-3 rounded-xl border border-green-200">
                <Truck className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Payment Mode: <strong>Cash on Delivery (COD)</strong> — सामान
                  मिलने पर पैसे दें
                </span>
              </div>

              {isError && (
                <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 px-4 py-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {error instanceof Error
                      ? error.message
                      : "Something went wrong. Please try again."}
                  </span>
                </div>
              )}

              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={isPending}
                className="w-full btn-orange shadow-orange font-semibold py-6 text-base rounded-2xl"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Order भेजा जा रहा है...
                  </>
                ) : (
                  "Order Now - Pay on Delivery (अभी ऑर्डर करें - सामान मिलने पर पैसे दें)"
                )}
              </Button>

              {/* Verification Note */}
              <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-300 rounded-xl px-4 py-3">
                <Phone className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-yellow-800 text-sm">
                  <strong>
                    Note: Our team will call you to verify your address. Orders
                    without phone verification will not be shipped.
                  </strong>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
