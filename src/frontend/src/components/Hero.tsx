import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const badges = [
  "100% Natural",
  "Chemical-Free",
  "Safe for Children",
  "Handmade",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen hero-gradient leaf-texture flex items-center pt-20 overflow-hidden">
      <div className="absolute top-1/4 right-[-80px] w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-60px] w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide"
          >
            🌿 Trusted Natural Remedy
          </motion.span>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-foreground">
            Nature's Answer to{" "}
            <span className="text-primary">Skin Itching</span> &amp;{" "}
            <span className="text-primary">Ringworm</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Handcrafted from 100% pure, natural ingredients — completely free of
            chemicals. Effective, gentle, and safe for the whole family,
            including young children.
          </p>

          <div className="flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-medium border border-primary/15"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                {b}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-display text-4xl font-bold text-primary">
              ₹149
            </span>
            <span className="text-muted-foreground text-base">per box</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              asChild
              data-ocid="hero.primary_button"
              size="lg"
              className="btn-orange shadow-orange font-semibold text-base px-8 rounded-2xl"
            >
              <a href="#contact">🛒 Order Now — ₹149</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/40 text-primary hover:bg-secondary font-medium rounded-2xl"
            >
              <a href="#benefits">Learn More</a>
            </Button>
          </div>
        </motion.div>

        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-primary/10 blur-2xl scale-105" />
            <img
              src="/assets/generated/fungus-killer-product.dim_800x600.jpg"
              alt="Fungus Killer Product"
              className="relative rounded-[2rem] shadow-nature w-full max-w-lg object-cover"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              className="absolute -bottom-5 -left-5 bg-card rounded-2xl shadow-nature px-5 py-3 flex items-center gap-3 border border-border"
            >
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <span className="text-xl">🌱</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Trusted by</p>
                <p className="font-display font-bold text-foreground text-lg leading-tight">
                  500+ Families
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              className="absolute -top-4 -right-4 btn-orange rounded-2xl shadow-orange px-4 py-2 text-center"
            >
              <p className="text-xs font-semibold text-white/80">Only</p>
              <p className="font-bold text-white text-lg leading-tight">₹149</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
