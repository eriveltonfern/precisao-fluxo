import { MessageCircle, Truck, CheckCircle } from "lucide-react";

const steps = [
  { icon: MessageCircle, step: "01", title: "Entre em Contato", desc: "Fale conosco pelo WhatsApp ou telefone e descreva o problema." },
  { icon: Truck, step: "02", title: "Atendimento Rápido", desc: "Nossa equipe chega em até 30 minutos no local." },
  { icon: CheckCircle, step: "03", title: "Problema Resolvido", desc: "Desentupimento feito com rapidez, limpeza e garantia." },
];

const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">Como Funciona</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Simples, rápido e sem complicação
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.step} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="absolute top-12 left-1/2 hidden h-0.5 w-full bg-border md:block" />
              )}
              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <s.icon className="h-10 w-10" />
                <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {s.step}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
