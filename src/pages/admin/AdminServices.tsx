import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface ServiceForm {
  slug: string;
  title: string;
  short_title: string;
  description: string;
  long_description: string;
  image_url: string;
  keywords: string;
  sort_order: number;
  is_active: boolean;
}

const emptyForm: ServiceForm = {
  slug: "", title: "", short_title: "", description: "", long_description: "",
  image_url: "", keywords: "", sort_order: 0, is_active: true,
};

const AdminServices = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const { data: services, isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (f: ServiceForm) => {
      const payload = {
        slug: f.slug, title: f.title, short_title: f.short_title,
        description: f.description, long_description: f.long_description,
        image_url: f.image_url || null,
        keywords: f.keywords.split(",").map((k) => k.trim()).filter(Boolean),
        sort_order: f.sort_order, is_active: f.is_active,
      };
      if (editing) {
        const { error } = await supabase.from("services").update(payload).eq("id", editing);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast.success(editing ? "Serviço atualizado!" : "Serviço criado!");
      setShowForm(false); setEditing(null); setForm(emptyForm);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      toast.success("Serviço removido!");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openEdit = (s: any) => {
    setForm({
      slug: s.slug, title: s.title, short_title: s.short_title,
      description: s.description, long_description: s.long_description,
      image_url: s.image_url || "", keywords: (s.keywords || []).join(", "),
      sort_order: s.sort_order || 0, is_active: s.is_active ?? true,
    });
    setEditing(s.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-extrabold text-foreground">Serviços</h1>
        <button onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Novo Serviço
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">{editing ? "Editar" : "Novo"} Serviço</h2>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X className="h-5 w-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }} className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Título</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Título Curto</label>
              <input value={form.short_title} onChange={(e) => setForm({ ...form, short_title: e.target.value })} required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Ordem</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Descrição Curta</label>
              <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Descrição Completa</label>
              <textarea value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} required rows={4}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">URL da Imagem</label>
              <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Keywords (separadas por vírgula)</label>
              <input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2 flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
                Ativo
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
      ) : !services?.length ? (
        <div className="text-center py-12 text-muted-foreground">Nenhum serviço cadastrado.</div>
      ) : (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Título</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Slug</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Ativo</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Ordem</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">{s.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.slug}</td>
                  <td className="px-4 py-3 text-center">{s.is_active ? "✅" : "❌"}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{s.sort_order}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => openEdit(s)} className="text-primary hover:text-primary/80"><Pencil className="h-4 w-4 inline" /></button>
                    <button onClick={() => { if (confirm("Remover serviço?")) deleteMutation.mutate(s.id); }} className="text-destructive hover:text-destructive/80"><Trash2 className="h-4 w-4 inline" /></button>
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

export default AdminServices;
