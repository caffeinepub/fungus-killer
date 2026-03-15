import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Clean the Affected Area",
    description:
      "Gently wash and dry the skin thoroughly. Keeping it clean ensures the herbal formula can absorb effectively.",
    emoji: "🧼",
    color: "bg-primary",
  },
  {
    number: "02",
    title: "Apply Fungus Killer",
    description:
      "Apply a thin layer of the natural formula directly onto the affected skin area. Massage gently until absorbed.",
    emoji: "🌿",
    color: "bg-accent",
  },
  {
    number: "03",
    title: "See Results in Days",
    description:
      "With consistent daily application, most users notice visible improvement within 3–7 days. No harsh chemicals needed.",
    emoji: "✨",
    color: "bg-cta",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Simple Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            How It Works
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Three simple steps to clear, healthy skin.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-border" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="relative inline-flex">
                  <div
                    className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-6 shadow-nature relative z-10`}
                  >
                    <span className="text-2xl">{step.emoji}</span>
                  </div>
                </div>
                <div className="font-display text-5xl font-bold text-primary/15 leading-none mb-3">
                  {step.number}
                </div>
                <div className="bg-card rounded-3xl p-6 shadow-xs border border-border">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
