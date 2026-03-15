import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    id: "children",
    q: "Is Fungus Killer safe for children?",
    a: "Yes! Fungus Killer is specifically formulated to be safe for all ages, including babies and young children. It contains only 100% natural, plant-based ingredients with no harsh chemicals or synthetic compounds that could irritate sensitive skin.",
  },
  {
    id: "ingredients",
    q: "What are the ingredients?",
    a: "Fungus Killer is made from a carefully selected blend of natural herbs and plant extracts known for their antifungal and soothing properties, including neem extract, turmeric, aloe vera, and other traditional herbal ingredients. All components are 100% natural and ethically sourced.",
  },
  {
    id: "results",
    q: "How long until I see results?",
    a: "Most users begin to see noticeable improvement within 3 to 7 days of consistent daily application. For more persistent or severe infections, full clearance typically occurs within 2\u20133 weeks. Individual results may vary based on the severity of the condition.",
  },
  {
    id: "chemical",
    q: "Is it really chemical-free?",
    a: "Absolutely. Fungus Killer contains zero synthetic chemicals, preservatives, parabens, steroids, or artificial fragrances. Every ingredient is derived from natural plant sources, making it one of the safest topical remedies available.",
  },
  {
    id: "apply",
    q: "How do I apply Fungus Killer?",
    a: "First, clean and dry the affected area thoroughly. Then apply a thin layer of Fungus Killer directly onto the skin. Gently massage until absorbed. Repeat this process once or twice daily for best results. Avoid covering with tight bandages unless advised by a healthcare professional.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">
            Common Questions
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Everything you need to know about Fungus Killer.
          </p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              data-ocid={`faq.item.${i + 1}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <AccordionItem
                value={`item-${i + 1}`}
                className="bg-card border border-border rounded-2xl px-6 shadow-xs hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="font-semibold text-foreground hover:text-primary text-left py-5 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
