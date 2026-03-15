import { Star } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    name: "Amira Hassan",
    location: "Lagos, Nigeria",
    quote:
      "My daughter had terrible ringworm for months. Two weeks of Fungus Killer and it's completely gone! I'm so relieved it's safe for kids.",
    rating: 5,
    initials: "AH",
    accentColor: "bg-primary/15 text-primary",
  },
  {
    name: "Kemi Adeyemi",
    location: "Abuja, Nigeria",
    quote:
      "I've tried several creams from the pharmacy with no lasting results. This natural remedy cleared my skin itching in just 5 days. Absolutely incredible.",
    rating: 5,
    initials: "KA",
    accentColor: "bg-accent/15 text-accent",
  },
  {
    name: "Emmanuel Okafor",
    location: "Port Harcourt, Nigeria",
    quote:
      "Chemical-free and it actually works! I was skeptical but the results spoke for themselves. My ringworm cleared up completely within 10 days.",
    rating: 5,
    initials: "EO",
    accentColor: "bg-primary/15 text-primary",
  },
];

const STARS = [1, 2, 3, 4, 5];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 organic-section">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Real Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Hundreds of families have experienced the healing power of Fungus
            Killer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-3xl p-7 shadow-xs border border-border flex flex-col hover:shadow-nature transition-all duration-300 hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {STARS.slice(0, t.rating).map((s) => (
                  <Star key={s} className="w-4 h-4 fill-cta text-cta" />
                ))}
              </div>

              <p className="text-foreground text-sm leading-relaxed flex-1 italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${t.accentColor}`}
                >
                  <span className="text-sm font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
