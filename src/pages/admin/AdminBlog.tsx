import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface PostForm {
  slug: string; title: string; excerpt: string; content: string;
  image_url: string; meta_title: string; meta_description: string; is_published: boolean;
}

const emptyForm: PostForm = {
  slug: "", title: "", excerpt: "", content: "", image_url: "", meta_title: "", meta_description: "", is_published: false,
};

const AdminBlog = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<PostForm>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (f: PostForm) => {
      const payload = {
        slug: f.slug, title: f.title, excerpt: f.excerpt || null, content: f.content,
        image_url: f.image_url || null, meta_title: f.meta_title || null,
        meta_description: f.meta_description || null, is_published: f.is_published,
        published_at: f.is_published ? new Date().toISOString() : null,
      };
      if (editing) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", editing);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success(editing ? "Post atualizado!" : "Post criado!");
      setShowForm(false); setEditing(null); setForm(emptyForm);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Post removido!");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openEdit = (p: any) => {
    setForm({
      slug: p.slug, title: p.title, excerpt: p.excerpt || "", content: p.content,
      image_url: p.image_url || "", meta_title: p.meta_title || "",
      meta_description: p.meta_description || "", is_published: p.is_published ?? false,
    });
    setEditing(p.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-extrabold text-foreground">Blog</h1>
        <button onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Novo Post
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">{editing ? "Editar" : "Novo"} Post</h2>
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
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Resumo</label>
              <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Conteúdo</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={8}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">URL da Imagem</label>
              <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Meta Title</label>
              <input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Meta Description</label>
              <input value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div className="sm:col-span-2 flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
                Publicado
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
      ) : !posts?.length ? (
        <div className="text-center py-12 text-muted-foreground">Nenhum post cadastrado.</div>
      ) : (
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Título</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Data</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium text-foreground">{p.title}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${p.is_published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {p.is_published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(p.created_at).toLocaleDateString("pt-BR")}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => openEdit(p)} className="text-primary hover:text-primary/80"><Pencil className="h-4 w-4 inline" /></button>
                    <button onClick={() => { if (confirm("Remover post?")) deleteMutation.mutate(p.id); }} className="text-destructive hover:text-destructive/80"><Trash2 className="h-4 w-4 inline" /></button>
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

export default AdminBlog;
