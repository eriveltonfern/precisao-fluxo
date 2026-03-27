import { useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";

interface SeoHeadProps {
  title?: string;
  description?: string;
}

const SeoHead = ({ title, description }: SeoHeadProps) => {
  const { data: s } = useSettings();

  useEffect(() => {
    if (!s) return;

    const pageTitle = title || s.seo_title;
    const pageDesc = description || s.seo_description;

    document.title = pageTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("name", "description", pageDesc);
    setMeta("property", "og:title", title || s.og_title || pageTitle);
    setMeta("property", "og:description", description || s.og_description || pageDesc);
    if (s.og_image) setMeta("property", "og:image", s.og_image);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = s.seo_canonical || window.location.origin;

    // Favicon
    if (s.favicon_url) {
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      favicon.href = s.favicon_url;
    }
  }, [s, title, description]);

  return null;
};

export default SeoHead;
