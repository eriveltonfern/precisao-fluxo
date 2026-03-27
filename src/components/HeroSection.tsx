import { MessageCircle, Phone } from "lucide-react";
import heroImg from "@/assets/hero-plumber.jpg";
import { useSettings, getWhatsAppLink } from "@/hooks/useSettings";

const HeroSection = () => {
  const { data: s } = useSettings();
  if (!s) return null;

  const waLink = getWhatsAppLink(s);
  const bgImage = s.hero_image_url || heroImg;

  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <img src={bgImage} alt="Profissional de desentupimento em ação" width={1920} height={1080}
        className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary-dark/60" />

      <div className="container relative z-10 py-32 md:py-40">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent-foreground border border-accent/30">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            {s.hero_badge_text}
          </div>

          <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            {s.hero_title}{" "}
            <span className="text-accent">{s.hero_highlight}</span>
          </h1>

          <p className="mb-8 text-lg text-white/80 md:text-xl">{s.hero_subtitle}</p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:bg-red-700 hover:shadow-xl">
              <MessageCircle className="h-6 w-6" /> Falar no WhatsApp
            </a>
            <a href={`tel:+55${s.whatsapp_number.replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              <Phone className="h-5 w-5" /> {s.phone}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span> {s.google_rating} no Google
            </span>
            <span>{s.total_services_count}</span>
            <span>{s.years_experience}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
