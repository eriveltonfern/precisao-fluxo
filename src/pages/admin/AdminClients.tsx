import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { uploadSiteAsset } from "@/hooks/useUpload";
import { toast } from "sonner";
import { Plus, Trash2, Upload, GripVertical } from "lucide-react";

interface Client {
  id: string;
  name: string;
  logo_url: string;
  sort_order: number;
  is_active: boolean;
}

const AdminClients = () => {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["admin-clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Client[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("clients").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
      toast.success("Cliente removido!");
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!name.trim()) {
      toast.error("Informe o nome do cliente antes de enviar o logo");
      return;
    }
    setUploading(true);
    try {
      const slug = name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const url = await uploadSiteAsset(file, `clients/${slug}-${Date.now()}`);
      const { error } = await supabase.from("clients").insert({
        name: name.trim(),
        logo_url: url,
        sort_order: clients.length,
      });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ["admin-clients"] });
      setName("");
      toast.success("Cliente adicionado!");
    } catch {
      toast.error("Erro ao adicionar cliente");
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  if (isLoading) return <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold text-foreground mb-8">Clientes Atendidos</h1>

      {/* Add new */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-8">
        <h2 className="font-display text-lg font-bold text-foreground mb-4">Adicionar Cliente</h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-1">Nome do Cliente</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Construtora ABC"
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading || !name.trim()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors">
            <Upload className="h-4 w-4" /> {uploading ? "Enviando..." : "Enviar Logo"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
      </div>

      {/* List */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {clients.map((client) => (
          <div key={client.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm flex flex-col items-center gap-3">
            <img src={client.logo_url} alt={client.name} className="h-20 w-20 rounded-lg border border-border object-contain bg-muted" />
            <span className="text-sm font-semibold text-foreground text-center">{client.name}</span>
            <button onClick={() => deleteMutation.mutate(client.id)}
              className="inline-flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 transition-colors">
              <Trash2 className="h-3 w-3" /> Remover
            </button>
          </div>
        ))}
        {clients.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-10">Nenhum cliente cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
};

export default AdminClients;
