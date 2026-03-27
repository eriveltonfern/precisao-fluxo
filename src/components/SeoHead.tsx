import { useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";

const SeoHead = () => {
  const { data: s } = useSettings();

  useEffect(() => {
    if (!s) return;

    document.title = s.seo_title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("name", "description", s.seo_description);
    setMeta("property", "og:title", s.og_title);
    setMeta("property", "og:description", s.og_description);
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
  }, [s]);

  return null;
};

export default SeoHead;
