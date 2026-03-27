import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const uploadSiteAsset = async (file: File, path: string): Promise<string> => {
  const ext = file.name.split(".").pop();
  const filePath = `${path}.${ext}`;

  const { error } = await supabase.storage
    .from("site-assets")
    .upload(filePath, file, { upsert: true });
  if (error) throw error;

  return `${SUPABASE_URL}/storage/v1/object/public/site-assets/${filePath}`;
};
