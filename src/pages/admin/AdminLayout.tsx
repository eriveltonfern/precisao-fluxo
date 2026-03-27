import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Wrench, MapPin, FileText, Image, Settings, LogOut, Users } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Serviços", href: "/admin/servicos", icon: Wrench },
  { label: "Cidades", href: "/admin/cidades", icon: MapPin },
  { label: "Portfólio", href: "/admin/portfolio", icon: Image },
  { label: "Clientes", href: "/admin/clientes", icon: Users },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-dark text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="font-display text-lg font-bold">
            <span className="text-accent">●</span> Precisão
          </Link>
          <p className="text-xs text-white/50 mt-1">Painel Administrativo</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${active ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={signOut}
            className="flex items-center gap-3 w-full rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
