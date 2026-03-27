import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useCities } from "@/hooks/useData";

const CoverageSection = () => {
  const { data: cities, isLoading } = useCities();

  return (
    <section id="atendimento" className="py-20 md:py-28 bg-primary-dark text-primary-foreground">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-wider text-white/60">Área de Atendimento</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
            Belo Horizonte e Região Metropolitana
          </h2>
          <p className="mt-4 text-white/70">
            Atendemos toda a Grande BH com rapidez e eficiência.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {isLoading
            ? [...Array(10)].map((_, i) => <div key={i} className="h-12 rounded-xl bg-white/10 animate-pulse" />)
            : cities?.map((city) => (
                <Link
                  key={city.slug}
                  to={`/desentupidora/${city.slug}`}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur-sm border border-white/10 transition-all hover:bg-white/20 hover:border-white/20"
                >
                  <MapPin className="h-4 w-4 text-accent shrink-0" />
                  {city.name}
                </Link>
              ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="Localização Desentupidora Precisão"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240216.8685428!2d-44.1!3d-19.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690cacacf2c33%3A0x5b35a9f5b0d4f80e!2sBelo%20Horizonte%2C%20MG!5e0!3m2!1spt-BR!2sbr!4v1"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
