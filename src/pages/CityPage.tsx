import { useParams, Link } from "react-router-dom";
import { MessageCircle, Phone, ArrowLeft, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { whatsappLink } from "@/components/WhatsAppButton";
import { useCity, useCities, useServices } from "@/hooks/useData";
import { useEffect } from "react";

const CityPage = () => {
  const { slug } = useParams();
  const { data: city, isLoading } = useCity(slug);
  const { data: allCities } = useCities();
  const { data: services } = useServices();

  useEffect(() => {
    if (city) {
      document.title = `Desentupidora em ${city.name} | Desentupidora Precisão 24h`;
    }
  }, [city]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Cidade não encontrada</h1>
          <Link to="/" className="mt-4 inline-block text-primary hover:underline">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative bg-primary-dark pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container relative z-10">
          <Link to="/#atendimento" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm">
            <ArrowLeft className="h-4 w-4" /> Áreas de atendimento
          </Link>
          <h1 className="font-display text-3xl font-extrabold text-white md:text-5xl">
            Desentupidora em <span className="text-accent">{city.name}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{city.description}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg hover:bg-red-700">
              <MessageCircle className="h-6 w-6" /> Solicitar Orçamento
            </a>
            <a href="tel:+553199999999"
              className="inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white hover:bg-white/20">
              <Phone className="h-5 w-5" /> (31) 9999-9999
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl mb-8">
            Bairros atendidos em {city.name}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {(city.neighborhoods || []).map((n) => (
              <div key={n} className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-sm">
                <MapPin className="h-4 w-4 text-primary shrink-0" /> {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary">
        <div className="container">
          <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl mb-8">Serviços em {city.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services?.map((s) => (
              <Link key={s.slug} to={`/servicos/${s.slug}`}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all">
                <h3 className="font-display font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary">Solicitar →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl mb-8">Outras cidades</h2>
          <div className="flex flex-wrap gap-3">
            {allCities?.filter((c) => c.slug !== slug).map((c) => (
              <Link key={c.slug} to={`/desentupidora/${c.slug}`}
                className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:border-primary/30">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-dark text-center">
        <div className="container">
          <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">
            Precisa de desentupidora em {city.name}?
          </h2>
          <p className="mt-3 text-white/70">Atendimento 24h • Chegamos em 30 minutos</p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
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

export default CityPage;
