import { MessageCircle, Phone } from "lucide-react";
import heroImg from "@/assets/hero-plumber.jpg";
import { whatsappLink } from "./WhatsAppButton";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <img
        src={heroImg}
        alt="Profissional de desentupimento em ação"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary-dark/60" />

      <div className="container relative z-10 py-32 md:py-40">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent-foreground border border-accent/30">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Atendimento 24 horas
          </div>

          <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
            Desentupidora em Belo Horizonte 24h —{" "}
            <span className="text-accent">Atendimento Rápido</span>
          </h1>

          <p className="mb-8 text-lg text-white/80 md:text-xl">
            Chegamos em até <strong className="text-white">30 minutos</strong> • Orçamento sem compromisso • Profissionais especializados
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:bg-red-700 hover:shadow-xl"
            >
              <MessageCircle className="h-6 w-6" />
              Falar no WhatsApp
            </a>
            <a
              href="tel:+553199999999"
              className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Phone className="h-5 w-5" />
              (31) 9999-9999
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span> 4.9 no Google
            </span>
            <span>+5.000 atendimentos</span>
            <span>+10 anos de experiência</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
