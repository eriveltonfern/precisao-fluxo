import { Star } from "lucide-react";

const testimonials = [
  { name: "Maria Clara S.", city: "Belo Horizonte", text: "Chegaram em 20 minutos e resolveram o problema da pia em menos de 1 hora. Super profissionais!", rating: 5 },
  { name: "João Pedro M.", city: "Contagem", text: "Serviço excelente! Preço justo e atendimento rápido. Recomendo a todos.", rating: 5 },
  { name: "Ana Beatriz L.", city: "Nova Lima", text: "Já é a terceira vez que chamo. Sempre pontuais e eficientes. Confiança total.", rating: 5 },
  { name: "Carlos Eduardo R.", city: "Betim", text: "Atendimento 24h de verdade! Liguei às 23h e em 30 minutos estavam aqui.", rating: 5 },
  { name: "Fernanda O.", city: "Sabará", text: "Fizeram a limpeza da fossa com equipamento moderno. Tudo limpo e organizado!", rating: 5 },
  { name: "Roberto A.", city: "Santa Luzia", text: "Profissionais educados e preço honesto. Resolveram o esgoto rapidamente.", rating: 5 },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-16 sm:py-20 md:py-28 bg-secondary">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-14">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">Depoimentos</span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-foreground md:text-4xl">
            O que nossos clientes dizem
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-warning">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />)}
            </div>
            <span className="font-bold text-foreground">4.9</span>
            <span className="text-muted-foreground text-sm">no Google</span>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl bg-card p-5 sm:p-6 shadow-sm border border-border">
              <div className="mb-3 flex text-warning">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
