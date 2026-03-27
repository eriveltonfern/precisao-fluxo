import { useParams, Link } from "react-router-dom";
import { MessageCircle, Phone, MapPin, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import SeoHead from "@/components/SeoHead";
import { useCity, useCities } from "@/hooks/useData";
import { useSettings, getWhatsAppLink } from "@/hooks/useSettings";
import { useEffect } from "react";
import heroImg from "@/assets/hero-plumber.jpg";

const CityPage = () => {
  const { slug } = useParams();
  const { data: city, isLoading } = useCity(slug);
  const { data: allCities } = useCities();
  const { data: s } = useSettings();

  const waLink = s ? getWhatsAppLink(s) : "#";
  const bgImage = s?.hero_image_url || heroImg;

  useEffect(() => {
    if (!city || !s) return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: `${s.company_name} — ${city.name}`,
      description: city.description,
      url: `${s.seo_canonical || window.location.origin}/desentupidora/${city.slug}`,
      telephone: `+55${s.whatsapp_number}`,
      address: { "@type": "PostalAddress", addressLocality: city.name, addressRegion: "MG", addressCountry: "BR" },
      areaServed: city.name,
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [city, s]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  if (!city) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Cidade não encontrada</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">Voltar ao início</Link>
      </div>
    </div>
  );

  const companyName = s?.company_name || "Desentupidora Precisão";

  return (
    <div className="min-h-screen">
      <SeoHead
        title={`Desentupidora em ${city.name} | ${companyName} 24h`}
        description={`${city.description} Atendimento 24h em ${city.name} e região. Orçamento grátis!`}
      />
      <Header />

      {/* Hero localizado */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <img src={bgImage} alt={`Desentupidora em ${city.name}`} width={1920} height={1080}
          className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary-dark/60" />
        <div className="container relative z-10 py-32 md:py-40">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent-foreground border border-accent/30">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Atendimento 24 horas em {city.name}
            </div>
            <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              Desentupidora em <span className="text-accent">{city.name}</span>
            </h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">{city.description}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg shadow-accent/30 hover:bg-red-700">
                <MessageCircle className="h-6 w-6" /> Falar no WhatsApp
              </a>
              <a href={`tel:+55${(s?.whatsapp_number || "").replace(/\D/g, "")}`}
                className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20">
                <Phone className="h-5 w-5" /> {s?.phone}
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
              <span className="flex items-center gap-2"><span className="text-yellow-400">★★★★★</span> {s?.google_rating} no Google</span>
              <span>{s?.total_services_count}</span>
              <span>{s?.years_experience}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Authority stats */}
      <section className="relative -mt-16 z-10">
        <div className="container">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: "24h", label: "Atendimento", desc: `Todos os dias em ${city.name}` },
              { value: s?.years_experience || "+10 anos", label: "Experiência", desc: "Atuando na região" },
              { value: s?.total_services_count || "+5.000", label: "Clientes", desc: "Atendimentos realizados" },
              { value: "30 min", label: "Chegada", desc: `Tempo médio em ${city.name}` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-card p-6 shadow-lg shadow-primary/5 border border-border text-center">
                <div className="font-display text-2xl font-extrabold text-foreground md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-sm font-semibold text-foreground">{stat.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <ServicesSection />

      {/* Como Funciona */}
      <HowItWorksSection />

      {/* Bairros */}
      {city.neighborhoods && city.neighborhoods.length > 0 && (
        <section className="py-20 md:py-28 bg-secondary">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-14">
              <span className="text-sm font-bold uppercase tracking-wider text-primary">Área de Cobertura</span>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
                Bairros atendidos em {city.name}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {city.neighborhoods.map((n) => (
                <div key={n} className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-sm">
                  <MapPin className="h-4 w-4 text-primary shrink-0" /> {n}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfólio */}
      <PortfolioSection />

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />

      {/* Outras cidades */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <span className="text-sm font-bold uppercase tracking-wider text-primary">Região Metropolitana</span>
            <h2 className="mt-3 font-display text-2xl font-extrabold text-foreground md:text-3xl">Outras cidades atendidas</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {allCities?.filter((c) => c.slug !== slug).map((c) => (
              <Link key={c.slug} to={`/desentupidora/${c.slug}`}
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:border-primary/30 transition-colors">{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CityPage;
