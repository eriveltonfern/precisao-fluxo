import { Droplets, ShowerHead, Pipette, CircleDot, Trash2, Waves, Package, Clock } from "lucide-react";
import { whatsappLink } from "./WhatsAppButton";

const services = [
  { icon: Pipette, title: "Desentupimento de Pia", desc: "Pia da cozinha ou banheiro, resolvemos rápido." },
  { icon: Droplets, title: "Desentupimento de Esgoto", desc: "Desobstrução completa da rede de esgoto." },
  { icon: ShowerHead, title: "Desentupimento de Vaso", desc: "Vaso sanitário entupido? Ligou, resolveu." },
  { icon: CircleDot, title: "Desentupimento de Ralo", desc: "Ralos de banheiro, área de serviço e garagem." },
  { icon: Trash2, title: "Limpeza de Fossa", desc: "Limpeza e manutenção de fossas sépticas." },
  { icon: Waves, title: "Hidrojateamento", desc: "Alta pressão para desobstrução eficiente." },
  { icon: Package, title: "Caixa de Gordura", desc: "Limpeza preventiva de caixas de gordura." },
  { icon: Clock, title: "Desentupidora 24h", desc: "Emergência? Estamos disponíveis a qualquer hora." },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">Nossos Serviços</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Soluções completas em desentupimento
          </h2>
          <p className="mt-4 text-muted-foreground">
            Oferecemos todos os tipos de desentupimento com equipamentos modernos e profissionais experientes.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <a
              key={service.title}
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-card p-6 shadow-sm border border-border transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
                Solicitar orçamento →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
