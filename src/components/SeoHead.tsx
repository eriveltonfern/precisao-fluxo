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

  // Google Tag Manager injection
  useEffect(() => {
    if (!s) return;

    const cleanups: (() => void)[] = [];

    // GTM via ID (standard method)
    if (s.gtm_id && s.gtm_id.trim()) {
      const gtmId = s.gtm_id.trim();

      // Head script
      if (!document.querySelector(`script[data-gtm-id="${gtmId}"]`)) {
        const headScript = document.createElement("script");
        headScript.setAttribute("data-gtm-id", gtmId);
        headScript.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`;
        document.head.appendChild(headScript);
        cleanups.push(() => headScript.remove());
      }

      // Body noscript
      if (!document.querySelector(`noscript[data-gtm-ns="${gtmId}"]`)) {
        const noscript = document.createElement("noscript");
        noscript.setAttribute("data-gtm-ns", gtmId);
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
        cleanups.push(() => noscript.remove());
      }
    }

    // Custom head code
    if (s.gtm_head_code && s.gtm_head_code.trim()) {
      const existing = document.querySelector('script[data-custom-head]');
      if (!existing) {
        const el = document.createElement("script");
        el.setAttribute("data-custom-head", "true");
        el.textContent = s.gtm_head_code.trim();
        document.head.appendChild(el);
        cleanups.push(() => el.remove());
      }
    }

    // Custom body code
    if (s.gtm_body_code && s.gtm_body_code.trim()) {
      const existing = document.querySelector('div[data-custom-body]');
      if (!existing) {
        const el = document.createElement("div");
        el.setAttribute("data-custom-body", "true");
        el.innerHTML = s.gtm_body_code.trim();
        document.body.insertBefore(el, document.body.firstChild);
        cleanups.push(() => el.remove());
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, [s]);

  return null;
};

export default SeoHead;
