import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface CityForm {
  slug: string;
  name: string;
  description: string;
  neighborhoods: string;
  sort_order: number;
  is_active: boolean;
}

const emptyForm: CityForm = { slug: "", name: "", description: "", neighborhoods: "", sort_order: 0, is_active: true };

const AdminCities = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<CityForm>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const { data: cities, isLoading } = useQuery({
    queryKey: ["admin-cities"],
    queryFn: async () => {
      const { data, error } = await supabase.from("cities").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (f: CityForm) => {
      const payload = {
        slug: f.slug, name: f.name, description: f.description,
        neighborhoods: f.neighborhoods.split(",").map((n) => n.trim()).filter(Boolean),
        sort_order: f.sort_order, is_active: f.is_active,
      };
      if (editing) {
        const { error } = await supabase.from("cities").update(payload).eq("id", editing);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("cities").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
      toast.success(editing ? "Cidade atualizada!" : "Cidade criada!");
      setShowForm(false); setEditing(null); setForm(emptyForm);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("cities").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cities"] });
      toast.success("Cidade removida!");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openEdit = (c: any) => {
    setForm({
      slug: c.slug, name: c.name, description: c.description,
      neighborhoods: (c.neighborhoods || []).join(", "),
      sort_order: c.sort_order || 0, is_active: c.is_active ?? true,
    });
    setEditing(c.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-extrabold text-foreground">Cidades</h1>
        <button onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Nova Cidade
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">{editing ? "Editar" : "Nova"} Cidade</h2>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X className="h-5 w-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Nome</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Descrição</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Bairros (separados por vírgula)</label>
              <input value={form.neighborhoods} onChange={(e) => setForm({ ...form, neighborhoods: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Ordem</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
                Ativa
              </label>
              <button type="submit" disabled={saveMutation.isPending}
                className="rounded-lg bg-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                {saveMutation.isPending ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Carregando...</div>
      ) : !cities?.length ? (
        <div className="text-center py-12 text-muted-foreground">Nenhuma cidade cadastrada.</div>
      ) : (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nome</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Bairros</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Ativa</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cities.map((c) => (
                <tr key={c.id} className="hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.slug}</td>
                  <td className="px-4 py-3 text-muted-foreground">{(c.neighborhoods || []).length} bairros</td>
                  <td className="px-4 py-3 text-center">{c.is_active ? "✅" : "❌"}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => openEdit(c)} className="text-primary hover:text-primary/80"><Pencil className="h-4 w-4 inline" /></button>
                    <button onClick={() => { if (confirm("Remover cidade?")) deleteMutation.mutate(c.id); }} className="text-destructive hover:text-destructive/80"><Trash2 className="h-4 w-4 inline" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminCities;
