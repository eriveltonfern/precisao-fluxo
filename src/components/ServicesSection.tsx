import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useServices, getFallbackImage } from "@/hooks/useData";
import { useSettings, getWhatsAppLink } from "@/hooks/useSettings";

const ServicesSection = () => {
  const { data: services, isLoading } = useServices();
  const { data: settings } = useSettings();
  const waLink = settings ? getWhatsAppLink(settings) : "#";

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
          {isLoading
            ? [...Array(8)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-card border border-border h-72 animate-pulse" />
              ))
            : services?.map((service) => (
                <Link key={service.slug} to={`/servicos/${service.slug}`}
                  className="group overflow-hidden rounded-2xl bg-card shadow-sm border border-border transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                  <div className="overflow-hidden">
                    <img src={service.image_url || getFallbackImage(service.slug)} alt={service.title}
                      width={768} height={512} loading="lazy"
                      className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-foreground">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-primary group-hover:underline">Saiba mais →</span>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
