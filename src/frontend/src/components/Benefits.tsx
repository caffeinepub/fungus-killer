import {
  Baby,
  CheckCircle2,
  FlaskConical,
  Heart,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  {
    icon: Leaf,
    title: "100% Natural Ingredients",
    description:
      "Every element sourced directly from nature's finest herbs. Zero synthetic compounds, zero artificial additives — pure botanical potency you can see and feel.",
    iconClass: "bg-primary/12 text-primary",
  },
  {
    icon: FlaskConical,
    title: "Chemical-Free Formula",
    description:
      "Crafted entirely without harsh chemicals or lab-made substitutes. Our remedy stays as clean as the earth it comes from — trusted by families for generations.",
    iconClass: "bg-accent/15 text-accent",
  },
  {
    icon: ShieldCheck,
    title: "Handmade in Small Batches",
    description:
      "Each jar is carefully prepared by hand in limited quantities. Artisan-crafted for unmatched freshness, potency, and the personal care that mass production never offers.",
    iconClass: "bg-primary/12 text-primary",
  },
  {
    icon: Baby,
    title: "Trusted by Families Everywhere",
    description:
      "Gentle enough for babies, powerful enough for adults. Dermatologist-approved and cherished by parents who choose safety above all else.",
    iconClass: "bg-accent/15 text-accent",
  },
];

const keyBenefits = [
  {
    icon: CheckCircle2,
    title: "Fast Relief",
    description:
      "Works from the very first application. Calms itching and irritation rapidly, restoring comfort within hours.",
  },
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description:
      "Every drop sourced from nature. No synthetic compounds, ever. Pure herbs, pure healing.",
  },
  {
    icon: Heart,
    title: "Skin-Friendly Formula",
    description:
      "Zero harsh chemicals. Perfectly safe for children, sensitive skin, and daily use.",
  },
];

const trustBadges = [
  { label: "100% Safe for Children", icon: Baby },
  { label: "No Harsh Chemicals", icon: Sparkles },
  { label: "Handmade with Love", icon: Heart },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-background water-drop-texture">
      <div className="container mx-auto px-6">
        {/* ── Section Header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            The Artisan Difference
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 leading-tight">
            The Artisan Remedy{" "}
            <span className="text-primary">Your Skin Deserves</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-lg font-medium tracking-wide">
            Handcrafted in small batches. Pure. Gentle. Trusted.
          </p>
        </motion.div>

        {/* ── Premium Product Highlight Block ────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative mb-16 rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.97 0.025 142) 0%, oklch(0.95 0.03 152) 50%, oklch(0.96 0.02 232) 100%)",
            boxShadow:
              "0 8px 40px -8px oklch(0.42 0.15 142 / 0.18), 0 2px 8px oklch(0.47 0.14 232 / 0.1)",
          }}
        >
          {/* Decorative background rings */}
          <div
            className="absolute -top-10 -right-10 w-56 h-56 rounded-full opacity-10 pointer-events-none"
            style={{ background: "oklch(0.42 0.15 142)" }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-8 pointer-events-none"
            style={{ background: "oklch(0.47 0.14 232)" }}
          />

          <div className="relative z-10 px-8 py-12 md:px-14 md:py-14">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Left: intro copy */}
              <div className="flex-1 max-w-sm">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full px-4 py-1.5 mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Premium Handmade Remedy
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug mb-4">
                  Fungus Killer —{" "}
                  <span className="text-primary">Nature's Finest</span> in Every
                  Jar
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Born from a tradition of plant-based healing, Fungus Killer is
                  an artisan-grade skin remedy formulated without a single harsh
                  chemical. Safe for the whole family. Trusted by thousands.
                  Made with the precision and care of a master herbalist.
                </p>
              </div>

              {/* Right: punchy bullet benefits */}
              <div className="flex-1">
                <div className="space-y-5">
                  {keyBenefits.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.12 }}
                      className="flex gap-4 items-start bg-card/70 rounded-2xl p-5 border border-border backdrop-blur-sm shadow-xs hover:shadow-nature transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/12 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-base font-bold text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust badge row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-2 bg-card border border-primary/20 text-foreground text-sm font-semibold rounded-full px-5 py-2.5 shadow-xs"
                >
                  <badge.icon className="w-4 h-4 text-primary shrink-0" />
                  {badge.label}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── Section sub-label ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
            Four Pillars of Trust
          </span>
        </motion.div>

        {/* ── 4 Benefit Cards ────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-3xl p-7 shadow-xs border border-border hover:shadow-nature transition-all duration-300 group hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${b.iconClass}`}
              >
                <b.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {b.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
