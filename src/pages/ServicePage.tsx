import { useParams, Link } from "react-router-dom";
import { MessageCircle, Phone, ArrowLeft, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useService, useServices, getFallbackImage } from "@/hooks/useData";
import { useSettings, getWhatsAppLink } from "@/hooks/useSettings";
import { useEffect } from "react";

const ServicePage = () => {
  const { slug } = useParams();
  const { data: service, isLoading } = useService(slug);
  const { data: allServices } = useServices();
  const { data: s } = useSettings();

  const waLink = s ? getWhatsAppLink(s) : "#";

  useEffect(() => {
    if (service) document.title = `${service.title} em Belo Horizonte | ${s?.company_name || "Desentupidora Precisão"}`;
  }, [service, s]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  if (!service) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Serviço não encontrado</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Voltar ao início</Link>
      </div>
    </div>
  );

  const image = service.image_url || getFallbackImage(service.slug);
  const benefits = [
    "Atendimento 24 horas", "Chegamos em até 30 minutos", "Orçamento gratuito",
    "Profissionais qualificados", "Equipamentos modernos", "Garantia no serviço",
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20">
        <img src={image} alt={service.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/85 to-primary-dark/70" />
        <div className="container relative z-10">
          <Link to="/#servicos" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm">
            <ArrowLeft className="h-4 w-4" /> Voltar aos serviços
          </Link>
          <h1 className="font-display text-3xl font-extrabold text-white md:text-5xl">
            {service.title} em <span className="text-accent">Belo Horizonte</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{service.long_description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg transition-all hover:bg-red-700">
              <MessageCircle className="h-6 w-6" /> Solicitar Orçamento
            </a>
            <a href={`tel:+55${(s?.whatsapp_number || "").replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20">
              <Phone className="h-5 w-5" /> {s?.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl mb-8">Por que escolher a {s?.company_name}?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-foreground">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary">
        <div className="container">
          <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl mb-8">Outros serviços</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {allServices?.filter((sv) => sv.slug !== slug).slice(0, 4).map((sv) => (
              <Link key={sv.slug} to={`/servicos/${sv.slug}`}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all">
                <h3 className="font-display font-bold text-foreground">{sv.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{sv.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary">Ver mais →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-dark text-center">
        <div className="container">
          <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">Precisa de {service.title.toLowerCase()}?</h2>
          <p className="mt-3 text-white/70">Ligue agora ou fale pelo WhatsApp. Atendimento 24h.</p>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg hover:bg-red-700">
            <MessageCircle className="h-6 w-6" /> Falar no WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServicePage;
