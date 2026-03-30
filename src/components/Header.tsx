import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSettings, getWhatsAppLink } from "@/hooks/useSettings";
import localLogo from "@/assets/logo.png";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Atendimento", href: "/#atendimento" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contato", href: "/contato" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const { data: s } = useSettings();
  const waLink = s ? getWhatsAppLink(s) : "#";
  const isInternal = (href: string) => !href.startsWith("/#");

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src={s?.logo_url || localLogo}
            alt={s?.company_name || "Desentupidora Precisão"}
            className="h-10 w-auto md:h-12"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={148}
            height={48}
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {navItems.map((item) =>
            isInternal(item.href) ? (
              <Link key={item.href} to={item.href} className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary whitespace-nowrap">{item.label}</Link>
            ) : (
              <a key={item.href} href={item.href} className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary whitespace-nowrap">{item.label}</a>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href={`tel:+55${(s?.whatsapp_number || "").replace(/\D/g, "")}`}
            className="hidden items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:flex">
            <Phone className="h-4 w-4" /> <span className="hidden lg:inline">{s?.phone || "(31) 9999-9999"}</span>
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="hidden rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent/80 sm:block">
            Orçamento Grátis
          </a>
          <button onClick={() => setOpen(!open)} className="text-foreground xl:hidden" aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background xl:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {navItems.map((item) =>
              isInternal(item.href) ? (
                <Link key={item.href} to={item.href} onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-primary">{item.label}</Link>
              ) : (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-primary">{item.label}</a>
              )
            )}
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="mt-2 rounded-lg bg-accent px-4 py-3 text-center text-sm font-bold text-accent-foreground">Orçamento Grátis</a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
