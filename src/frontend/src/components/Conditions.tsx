import { RotateCcw, Zap } from "lucide-react";
import { motion } from "motion/react";

const conditions = [
  {
    icon: Zap,
    title: "Skin Itching",
    description:
      "Persistent itching caused by dryness, eczema, allergies, or fungal infection — Fungus Killer provides fast, soothing relief by treating the root cause naturally.",
    tag: "Fast Relief",
    iconBg: "bg-primary",
    tagBg: "bg-primary/10 text-primary",
  },
  {
    icon: RotateCcw,
    title: "Ringworm (Tinea)",
    description:
      "Ringworm is a common fungal infection causing circular, ring-shaped rashes. Fungus Killer's antifungal herbal blend eliminates the infection and prevents recurrence.",
    tag: "Eliminates Fungi",
    iconBg: "bg-accent",
    tagBg: "bg-accent/10 text-accent",
  },
];

export default function Conditions() {
  return (
    <section className="py-24 organic-section">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Conditions Treated
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            What We Heal
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Targeted relief for the two most common skin conditions caused by
            fungal infections.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {conditions.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-card rounded-3xl p-8 shadow-nature border border-border overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Decorative bg shape */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full translate-x-12 -translate-y-12" />
              <div className="absolute bottom-0 left-0 w-28 h-28 bg-accent/5 rounded-full -translate-x-8 translate-y-8" />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center shadow-nature`}
                  >
                    <c.icon className="w-7 h-7 text-white" />
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${c.tagBg}`}
                  >
                    {c.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {c.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {c.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
