import { useState, useEffect, useRef } from "react";
import { useSettings, useSaveSettings, SiteSettings, SETTING_DEFAULTS } from "@/hooks/useSettings";
import { uploadSiteAsset } from "@/hooks/useUpload";
import { toast } from "sonner";
import { Save, Upload, Image, Globe, FileText, Smartphone, Star } from "lucide-react";

const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
    <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground mb-6">
      <Icon className="h-5 w-5 text-accent" /> {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Field = ({ label, value, onChange, type = "text", placeholder = "", rows }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; rows?: number;
}) => (
  <div>
    <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
    {rows ? (
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
    ) : (
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    )}
  </div>
);

const ImageUpload = ({ label, value, onUpload, path }: {
  label: string; value: string; onUpload: (url: string) => void; path: string;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadSiteAsset(file, path);
      onUpload(url);
      toast.success("Imagem enviada!");
    } catch {
      toast.error("Erro ao enviar imagem");
    }
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      <div className="flex items-center gap-4">
        {value && (
          <img src={value} alt={label} className="h-16 w-16 rounded-lg border border-border object-contain bg-muted" />
        )}
        <button type="button" onClick={() => ref.current?.click()} disabled={uploading}
          className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50">
          <Upload className="h-4 w-4" /> {uploading ? "Enviando..." : "Enviar imagem"}
        </button>
        <input ref={ref} type="file" accept="image/*" onChange={handle} className="hidden" />
      </div>
      {value && (
        <input type="text" value={value} readOnly
          className="mt-2 w-full rounded-lg border border-input bg-muted px-3 py-1.5 text-xs text-muted-foreground" />
      )}
    </div>
  );
};

const AdminSettings = () => {
  const { data: settings, isLoading } = useSettings();
  const save = useSaveSettings();
  const [form, setForm] = useState<SiteSettings>(SETTING_DEFAULTS);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const update = (key: keyof SiteSettings) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    save.mutate(form, {
      onSuccess: () => toast.success("Configurações salvas com sucesso!"),
      onError: () => toast.error("Erro ao salvar"),
    });
  };

  if (isLoading) return <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-extrabold text-foreground">Configurações Gerais</h1>
        <button onClick={handleSave} disabled={save.isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors">
          <Save className="h-4 w-4" /> {save.isPending ? "Salvando..." : "Salvar"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Identidade Visual */}
        <Section title="Identidade Visual" icon={Image}>
          <Field label="Nome da Empresa" value={form.company_name} onChange={update("company_name")} />
          <ImageUpload label="Logo" value={form.logo_url} onUpload={update("logo_url")} path="branding/logo" />
          <ImageUpload label="Favicon" value={form.favicon_url} onUpload={update("favicon_url")} path="branding/favicon" />
        </Section>

        {/* Contato */}
        <Section title="Contato & WhatsApp" icon={Smartphone}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Telefone" value={form.phone} onChange={update("phone")} placeholder="(31) 9999-9999" />
            <Field label="Número WhatsApp (com DDI)" value={form.whatsapp_number} onChange={update("whatsapp_number")} placeholder="5531999999999" />
          </div>
          <Field label="Mensagem padrão do WhatsApp" value={form.whatsapp_message} onChange={update("whatsapp_message")} rows={2} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="E-mail" value={form.email} onChange={update("email")} type="email" />
            <Field label="Endereço" value={form.address} onChange={update("address")} />
          </div>
        </Section>

        {/* SEO */}
        <Section title="SEO Global" icon={Globe}>
          <Field label="Título da Página (SEO)" value={form.seo_title} onChange={update("seo_title")} />
          <Field label="Meta Description" value={form.seo_description} onChange={update("seo_description")} rows={3} />
          <Field label="URL Canônica" value={form.seo_canonical} onChange={update("seo_canonical")} placeholder="https://seusite.com.br" />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="OG Title" value={form.og_title} onChange={update("og_title")} />
            <Field label="OG Description" value={form.og_description} onChange={update("og_description")} />
          </div>
          <ImageUpload label="OG Image (compartilhamento social)" value={form.og_image} onUpload={update("og_image")} path="seo/og-image" />
        </Section>

        {/* Hero */}
        <Section title="Seção Hero (Banner Principal)" icon={FileText}>
          <ImageUpload label="Imagem de Fundo do Hero" value={form.hero_image_url} onUpload={update("hero_image_url")} path="hero/background" />
          <Field label="Badge (ex: Atendimento 24 horas)" value={form.hero_badge_text} onChange={update("hero_badge_text")} />
          <Field label="Título Principal" value={form.hero_title} onChange={update("hero_title")} />
          <Field label="Texto em Destaque (cor accent)" value={form.hero_highlight} onChange={update("hero_highlight")} />
          <Field label="Subtítulo" value={form.hero_subtitle} onChange={update("hero_subtitle")} rows={2} />
        </Section>

        {/* Sobre Nós */}
        <Section title="Sobre Nós" icon={FileText}>
          <ImageUpload label="Imagem da Seção Sobre Nós" value={form.about_image_url} onUpload={update("about_image_url")} path="about/company" />
          <Field label="Texto Sobre a Empresa" value={form.about_text} onChange={update("about_text")} rows={5} />
        </Section>

        {/* Prova Social */}
        <Section title="Prova Social" icon={Star}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Nota Google" value={form.google_rating} onChange={update("google_rating")} />
            <Field label="Nº de Avaliações" value={form.google_reviews_count} onChange={update("google_reviews_count")} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Total de Atendimentos" value={form.total_services_count} onChange={update("total_services_count")} />
            <Field label="Anos de Experiência" value={form.years_experience} onChange={update("years_experience")} />
          </div>
        </Section>
      </div>
    </div>
  );
};

export default AdminSettings;
