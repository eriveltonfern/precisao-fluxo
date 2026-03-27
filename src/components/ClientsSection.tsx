import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Building2 } from "lucide-react";

interface Client {
  id: string;
  name: string;
  logo_url: string;
}

const ClientsSection = () => {
  const { data: clients = [] } = useQuery({
    queryKey: ["public-clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("id, name, logo_url")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Client[];
    },
    staleTime: 1000 * 60 * 10,
  });

  if (clients.length === 0) return null;

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
            <div key={client.id}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 py-6 shadow-sm">
              {client.logo_url ? (
                <img src={client.logo_url} alt={client.name} loading="lazy"
                  className="h-12 w-auto max-w-[120px] object-contain" />
              ) : (
                <Building2 className="h-8 w-8 text-primary" />
              )}
              <span className="text-sm font-semibold text-foreground text-center">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
