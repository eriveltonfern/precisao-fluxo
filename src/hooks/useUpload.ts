import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const convertToWebP = (file: File, maxWidth = 1200, quality = 0.82): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    if (file.type === "image/svg+xml") {
      resolve(file);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const ratio = Math.min(1, maxWidth / img.width);
      const w = Math.round(img.width * ratio);
      const h = Math.round(img.height * ratio);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Falha ao converter imagem"))),
        "image/webp",
        quality
      );
    };
    img.onerror = () => reject(new Error("Falha ao carregar imagem"));
    img.src = URL.createObjectURL(file);
  });
};

export const uploadSiteAsset = async (file: File, path: string): Promise<string> => {
  const isSvg = file.type === "image/svg+xml";
  const blob = await convertToWebP(file);
  const ext = isSvg ? "svg" : "webp";
  const filePath = `${path}.${ext}`;
  const contentType = isSvg ? "image/svg+xml" : "image/webp";

  const { error } = await supabase.storage
    .from("site-assets")
    .upload(filePath, blob, { upsert: true, contentType });
  if (error) throw error;

  return `${SUPABASE_URL}/storage/v1/object/public/site-assets/${filePath}`;
};
