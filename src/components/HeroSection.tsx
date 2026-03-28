import { MessageCircle, Phone } from "lucide-react";
import heroImg from "@/assets/hero-plumber.jpg";
import { useSettings, getWhatsAppLink } from "@/hooks/useSettings";

const HeroSkeleton = () => (
  <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden bg-primary-dark">
    <div className="container relative z-10 py-24 md:py-40">
      <div className="max-w-2xl space-y-6">
        <div className="h-8 w-48 rounded-full bg-white/10 animate-pulse" />
        <div className="h-14 w-full rounded-lg bg-white/10 animate-pulse" />
        <div className="h-6 w-3/4 rounded bg-white/10 animate-pulse" />
        <div className="flex gap-4">
          <div className="h-14 w-48 rounded-xl bg-white/10 animate-pulse" />
          <div className="h-14 w-48 rounded-xl bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  </section>
);

const HeroSection = () => {
  const { data: s, isLoading } = useSettings();

  if (isLoading || !s) return <HeroSkeleton />;

  const waLink = getWhatsAppLink(s);
  const bgImage = s.hero_image_url || heroImg;

  return (
    <section id="inicio" className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden">
      <img src={bgImage} alt="Profissional de desentupimento em ação" width={1920} height={1080}
        className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/85 to-primary-dark/60" />

      <div className="container relative z-10 py-24 pt-28 md:py-40">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-warning/20 px-3 py-1.5 text-xs sm:text-sm font-semibold text-warning border border-warning/30">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            {s.hero_badge_text}
          </div>

          <h1 className="mb-4 sm:mb-6 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            {s.hero_title}{" "}
            <span className="text-warning">{s.hero_highlight}</span>
          </h1>

          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-white/80 md:text-xl">{s.hero_subtitle}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl bg-accent px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:bg-accent/90 hover:shadow-xl">
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" /> Falar no WhatsApp
            </a>
            <a href={`tel:+55${s.whatsapp_number.replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              <Phone className="h-5 w-5" /> {s.phone}
            </a>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-white/60">
            <span className="flex items-center gap-2">
              <span className="text-warning">★★★★★</span> {s.google_rating} no Google
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
