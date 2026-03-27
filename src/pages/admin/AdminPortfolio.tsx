import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { uploadSiteAsset } from "@/hooks/useUpload";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { toast } from "sonner";

interface PortfolioForm {
  title: string;
  description: string;
  location: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

const emptyForm: PortfolioForm = {
  title: "", description: "", location: "", image_url: "", sort_order: 0, is_active: true,
};

const AdminPortfolio = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<PortfolioForm>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: items, isLoading } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: async () => {
      const { data, error } = await supabase.from("portfolio_items").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadSiteAsset(file, `portfolio/${Date.now()}`);
      setForm((f) => ({ ...f, image_url: url }));
      toast.success("Imagem enviada!");
    } catch {
      toast.error("Erro ao enviar imagem");
    }
    setUploading(false);
  };

  const saveMutation = useMutation({
    mutationFn: async (f: PortfolioForm) => {
      if (!f.image_url) throw new Error("Imagem é obrigatória");
      if (editing) {
        const { error } = await supabase.from("portfolio_items").update(f).eq("id", editing);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("portfolio_items").insert(f);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast.success(editing ? "Item atualizado!" : "Item criado!");
      setShowForm(false); setEditing(null); setForm(emptyForm);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
      toast.success("Item removido!");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openEdit = (item: any) => {
    setForm({
      title: item.title, description: item.description, location: item.location,
      image_url: item.image_url, sort_order: item.sort_order || 0, is_active: item.is_active ?? true,
    });
    setEditing(item.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-extrabold text-foreground">Portfólio</h1>
        <button onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Novo Item
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">{editing ? "Editar" : "Novo"} Item</h2>
            <button onClick={() => { setShowForm(false); setEditing(null); }}><X className="h-5 w-5 text-muted-foreground" /></button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(form); }} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Imagem *</label>
              <div className="flex items-center gap-4">
                {form.image_url && (
                  <img src={form.image_url} alt="Preview" className="h-20 w-32 rounded-lg border border-border object-cover" />
                )}
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50">
                  <Upload className="h-4 w-4" /> {uploading ? "Enviando..." : "Enviar imagem"}
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Título</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Local</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Belo Horizonte — Savassi" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Descrição</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
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
      ) : !items?.length ? (
        <div className="text-center py-12 text-muted-foreground">Nenhum item no portfólio.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              <img src={item.image_url} alt={item.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-display font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-xs font-medium ${item.is_active ? "text-green-600" : "text-muted-foreground"}`}>
                    {item.is_active ? "Ativo" : "Inativo"}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(item)} className="text-primary hover:text-primary/80"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => { if (confirm("Remover item?")) deleteMutation.mutate(item.id); }} className="text-destructive hover:text-destructive/80"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
