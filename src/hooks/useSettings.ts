import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export interface SiteSettings {
  logo_url: string;
  favicon_url: string;
  company_name: string;
  phone: string;
  whatsapp_number: string;
  whatsapp_message: string;
  email: string;
  address: string;
  seo_title: string;
  seo_description: string;
  seo_canonical: string;
  og_title: string;
  og_description: string;
  og_image: string;
  hero_title: string;
  hero_highlight: string;
  hero_subtitle: string;
  hero_image_url: string;
  hero_badge_text: string;
  google_rating: string;
  google_reviews_count: string;
  total_services_count: string;
  years_experience: string;
  about_image_url: string;
  about_text: string;
  gtm_id: string;
  gtm_head_code: string;
  gtm_body_code: string;
}

const DEFAULTS: SiteSettings = {
  logo_url: "",
  favicon_url: "",
  company_name: "Desentupidora Precisão",
  phone: "(31) 9 9979-8413",
  whatsapp_number: "5531999798413",
  whatsapp_message: "Olá! Preciso de um orçamento para desentupimento.",
  email: "comercialdesentupidoraprecisao@gmail.com",
  address: "Rua Lúcia Fonseca, nº 205 – Caieiras, Vespasiano/MG – CEP 33200-166",
  seo_title: "Desentupidora Precisão BH | Desentupimento 24h Belo Horizonte",
  seo_description: "Desentupidora em Belo Horizonte e Região Metropolitana 24h. Desentupimento de pia, esgoto, vaso sanitário, ralo, limpeza de fossa e hidrojateamento. Orçamento grátis!",
  seo_canonical: "https://desentupidoraprecisao.com.br",
  og_title: "Desentupidora Precisão BH | Desentupimento 24h",
  og_description: "Desentupidora em Belo Horizonte e Região Metropolitana 24h. Orçamento grátis!",
  og_image: "",
  hero_title: "Desentupidora em Belo Horizonte 24h —",
  hero_highlight: "Atendimento Rápido",
  hero_subtitle: "Chegamos em até 30 minutos • Orçamento sem compromisso • Profissionais especializados",
  hero_image_url: "",
  hero_badge_text: "Atendimento 24 horas",
  google_rating: "4.9",
  google_reviews_count: "287",
  total_services_count: "+5.000 atendimentos",
  years_experience: "+10 anos de experiência",
  about_image_url: "",
  about_text: "A Desentupidora Precisão Ltda é uma empresa especializada em serviços de desentupimento e manutenção preventiva. Todos os atendimentos são realizados mediante avaliação técnica, com orçamento previamente informado e autorizado pelo cliente, conforme previsto no Código de Defesa do Consumidor (Lei nº 8.078/90).",
};

export const useSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("key, value");
      if (error) throw error;

      const settings = { ...DEFAULTS };
      data?.forEach((row) => {
        const val = row.value as Record<string, string>;
        if (val && typeof val === "object") {
          Object.assign(settings, val);
        }
      });
      return settings;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};

export const useSaveSettings = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings: Partial<SiteSettings>) => {
      const { error } = await supabase
        .from("settings")
        .upsert({ key: "general", value: settings as unknown as Json }, { onConflict: "key" });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site-settings"] }),
  });
};

export const getWhatsAppLink = (settings: SiteSettings) =>
  `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_message)}`;

export const SETTING_DEFAULTS = DEFAULTS;
