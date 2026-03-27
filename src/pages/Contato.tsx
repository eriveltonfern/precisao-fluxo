import { useEffect } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useSettings, getWhatsAppLink } from "@/hooks/useSettings";

const Contato = () => {
  const { data: s } = useSettings();
  const waLink = s ? getWhatsAppLink(s) : "#";

  useEffect(() => {
    document.title = `Contato | ${s?.company_name || "Desentupidora Precisão"} — Belo Horizonte`;
  }, [s]);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-primary-dark pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container">
          <h1 className="font-display text-3xl font-extrabold text-white md:text-5xl">
            Entre em <span className="text-accent">Contato</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Estamos disponíveis 24 horas. Fale conosco pelo WhatsApp, telefone ou e-mail.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-foreground mb-8">Informações de contato</h2>
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Telefone", value: s?.phone || "(31) 9999-9999", href: `tel:+55${(s?.whatsapp_number || "").replace(/\D/g, "")}` },
                { icon: MessageCircle, label: "WhatsApp", value: "Fale conosco agora", href: waLink },
                { icon: Mail, label: "E-mail", value: s?.email || "", href: `mailto:${s?.email || ""}` },
                { icon: MapPin, label: "Endereço", value: s?.address || "Belo Horizonte, MG", href: "#" },
                { icon: Clock, label: "Horário", value: "24 horas, 7 dias por semana", href: "#" },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-lg hover:border-primary/30">
                  <div className="rounded-lg bg-primary/10 p-3"><item.icon className="h-5 w-5 text-primary" /></div>
                  <div>
                    <div className="font-semibold text-foreground">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe title="Localização Desentupidora Precisão"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240216.8685428!2d-44.1!3d-19.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690cacacf2c33%3A0x5b35a9f5b0d4f80e!2sBelo%20Horizonte%2C%20MG!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%" height="100%" style={{ border: 0, minHeight: 400 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contato;
