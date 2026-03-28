import { MessageCircle } from "lucide-react";
import { useSettings, getWhatsAppLink } from "@/hooks/useSettings";

const CTASection = () => {
  const { data: s } = useSettings();
  const waLink = s ? getWhatsAppLink(s) : "#";

  return (
    <section id="contato" className="py-16 sm:py-20 md:py-28 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>
      <div className="container relative text-center px-4">
        <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary-foreground">
          Precisa de desentupimento <span className="text-warning">agora</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-white/80">
          Não espere o problema piorar. Fale conosco agora mesmo e receba um orçamento grátis em minutos.
        </p>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="mt-6 sm:mt-8 inline-flex items-center gap-2 sm:gap-3 rounded-xl bg-accent px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-xl font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:bg-accent/90 hover:shadow-xl hover:scale-105">
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" /> Falar no WhatsApp Agora
        </a>
        <p className="mt-4 text-xs sm:text-sm text-white/60">Resposta imediata • Orçamento sem compromisso</p>
      </div>
    </section>
  );
};

export default CTASection;
