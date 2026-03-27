import { usePortfolioItems } from "@/hooks/useData";

// Static fallbacks
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const fallbackWorks = [
  { image: portfolio1, title: "Desobstrução de tubulação de esgoto", location: "Belo Horizonte — Savassi" },
  { image: portfolio2, title: "Desentupimento de pia de cozinha", location: "Contagem — Eldorado" },
  { image: portfolio3, title: "Limpeza de rede de esgoto", location: "Betim — Centro" },
];

const PortfolioSection = () => {
  const { data: items, isLoading } = usePortfolioItems();
  const hasDbItems = items && items.length > 0;

  const works = hasDbItems
    ? items.map((i) => ({ image: i.image_url, title: i.title, location: i.location }))
    : fallbackWorks;

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">Portfólio</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Serviços realizados
          </h2>
          <p className="mt-4 text-muted-foreground">
            Veja alguns dos nossos trabalhos — antes e depois.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <div key={work.title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    width={768}
                    height={512}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-foreground">{work.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{work.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
