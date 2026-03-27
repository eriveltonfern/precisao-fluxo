import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Static fallback images
import servicePia from "@/assets/service-pia.jpg";
import serviceEsgoto from "@/assets/service-esgoto.jpg";
import serviceVaso from "@/assets/service-vaso.jpg";
import serviceRalo from "@/assets/service-ralo.jpg";
import serviceFossa from "@/assets/service-fossa.jpg";
import serviceHidrojateamento from "@/assets/service-hidrojateamento.jpg";
import serviceCaixaGordura from "@/assets/service-caixa-gordura.jpg";
import service24h from "@/assets/service-24h.jpg";

const fallbackImages: Record<string, string> = {
  "desentupimento-de-pia": servicePia,
  "desentupimento-de-esgoto": serviceEsgoto,
  "desentupimento-de-vaso-sanitario": serviceVaso,
  "desentupimento-de-ralo": serviceRalo,
  "limpeza-de-fossa": serviceFossa,
  "hidrojateamento": serviceHidrojateamento,
  "limpeza-de-caixa-de-gordura": serviceCaixaGordura,
  "desentupidora-24-horas": service24h,
};

export const getFallbackImage = (slug: string) => fallbackImages[slug] || servicePia;

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
};

export const useService = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["service", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
};

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
};

export const useCity = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["city", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
};
