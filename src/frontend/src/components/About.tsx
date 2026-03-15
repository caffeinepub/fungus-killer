import { Heart, Leaf, Target, Youtube } from "lucide-react";
import { motion } from "motion/react";

const goals = [
  {
    icon: Target,
    text: "To provide the most effective remedy for Itching and Fungal Infections.",
  },
  {
    icon: Leaf,
    text: "To share expert tips on skin health and hygiene.",
  },
  {
    icon: Heart,
    text: "To help you live a life free from skin irritation.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center max-w-5xl mx-auto">
          {/* Logo + brand */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start gap-6"
          >
            <img
              src="/assets/uploads/IMG_20260315_123152-1.png"
              alt="Fungus Killer Logo"
              className="w-40 h-40 rounded-full object-cover shadow-nature border-4 border-primary/20"
            />
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Welcome to <span className="text-primary">Fungus Killer!</span>
              </h2>
              <p className="text-muted-foreground mt-3 text-lg leading-relaxed">
                Our mission is to help people get rid of skin problems naturally
                and effectively. We specialize in solutions for Ringworm (Daad),
                Itching (Khaj-Khujali), and Fungal Infections.
              </p>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                We understand how uncomfortable and persistent skin infections
                can be. That's why we focus on targeting the root cause — so you
                get clear and healthy skin for good.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@GreatInformation-d4y"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="about.link"
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors shadow-md"
            >
              <Youtube className="w-5 h-5" />
              Watch on YouTube
            </a>
          </motion.div>

          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                Our Goals
              </span>
              <h3 className="font-display text-2xl font-bold text-foreground mt-2">
                Why We Do What We Do
              </h3>
            </div>

            <div className="space-y-5">
              {goals.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={Icon.displayName ?? text}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex items-start gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground leading-relaxed text-sm">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-primary/8 border border-primary/20">
              <p className="text-primary font-semibold text-sm mb-1">
                Your health and comfort are our top priority.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Thank you for trusting Fungus Killer for your skin care needs!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
