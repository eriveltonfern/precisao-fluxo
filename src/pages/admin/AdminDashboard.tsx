import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Wrench, MapPin, FileText, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data: servicesCount } = useQuery({
    queryKey: ["admin-services-count"],
    queryFn: async () => {
      const { count } = await supabase.from("services").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: citiesCount } = useQuery({
    queryKey: ["admin-cities-count"],
    queryFn: async () => {
      const { count } = await supabase.from("cities").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: postsCount } = useQuery({
    queryKey: ["admin-posts-count"],
    queryFn: async () => {
      const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const cards = [
    { label: "Serviços", count: servicesCount ?? 0, icon: Wrench, href: "/admin/servicos", color: "text-primary" },
    { label: "Cidades", count: citiesCount ?? 0, icon: MapPin, href: "/admin/cidades", color: "text-primary" },
    { label: "Blog Posts", count: postsCount ?? 0, icon: FileText, href: "/admin/blog", color: "text-primary" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-extrabold text-foreground">Dashboard</h1>
        <Link to="/" target="_blank" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Eye className="h-4 w-4" /> Ver Site
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} to={card.href}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="mt-1 font-display text-3xl font-extrabold text-foreground">{card.count}</p>
              </div>
              <card.icon className={`h-10 w-10 ${card.color} opacity-20`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
