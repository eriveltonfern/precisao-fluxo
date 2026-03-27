import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const AdminLogin = () => {
  const { user, isAdmin, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error } = await signIn(email, password);
    if (error) setError(error.message);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl border border-border shadow-lg">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl font-extrabold text-foreground">
            <span className="text-accent">●</span> Painel Admin
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Desentupidora Precisão</p>
        </div>

        {user && !isAdmin && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
            Você não tem permissão de administrador.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="submit" disabled={submitting}
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {submitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
