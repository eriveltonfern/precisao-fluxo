import { Building2 } from "lucide-react";

const clients = [
  "Construtora MG", "Rede Supermercados BH", "Hospital Santa Casa",
  "Shopping Del Rey", "Condomínio Alto da Serra", "Restaurante Sabor Mineiro",
  "Hotel Belo Horizonte Palace", "Escola São José",
];

const ClientsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">Confiança Comprovada</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Empresas que confiam em nosso trabalho
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {clients.map((client) => (
            <div
              key={client}
              className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-6 shadow-sm"
            >
              <Building2 className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-semibold text-foreground">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
