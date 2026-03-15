import { Heart, Leaf, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="/#" className="flex items-center gap-2">
              <img
                src="/assets/uploads/IMG_20260315_123152-1.png"
                alt="Fungus Killer Logo"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-display text-lg font-bold">
                Fungus Killer
              </span>
            </a>
            <p className="text-sm text-primary-foreground/70 font-medium">
              Pure Nature. Proven Results.
            </p>
            <a
              href="https://www.youtube.com/@GreatInformation-d4y"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mt-1"
            >
              <Youtube className="w-4 h-4" />
              YouTube Channel
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
            {[
              "Benefits",
              "About Us",
              "How It Works",
              "Testimonials",
              "Contact",
            ].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                className="hover:text-primary-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="text-center text-sm text-primary-foreground/60">
            <p>
              &copy; {year}. Built with{" "}
              <Heart className="inline w-3.5 h-3.5 fill-current text-red-300" />{" "}
              using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
