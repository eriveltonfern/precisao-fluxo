import { MessageCircle } from "lucide-react";
import { whatsappLink } from "./WhatsAppButton";

const CTASection = () => {
  return (
    <section id="contato" className="py-20 md:py-28 bg-primary relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="container relative text-center">
        <h2 className="font-display text-3xl font-extrabold text-primary-foreground md:text-5xl">
          Precisa de desentupimento <span className="text-accent">agora</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
          Não espere o problema piorar. Fale conosco agora mesmo e receba um orçamento grátis em minutos.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-accent px-10 py-5 text-xl font-bold text-accent-foreground shadow-lg shadow-accent/30 transition-all hover:bg-red-700 hover:shadow-xl hover:scale-105"
        >
          <MessageCircle className="h-7 w-7" />
          Falar no WhatsApp Agora
        </a>
        <p className="mt-4 text-sm text-white/60">Resposta imediata • Orçamento sem compromisso</p>
      </div>
    </section>
  );
};

export default CTASection;
