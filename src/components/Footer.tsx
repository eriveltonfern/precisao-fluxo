import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useServices, useCities } from "@/hooks/useData";
import { useSettings } from "@/hooks/useSettings";

const Footer = () => {
  const { data: services } = useServices();
  const { data: cities } = useCities();
  const { data: s } = useSettings();

  const companyName = s?.company_name || "Desentupidora Precisão";

  return (
    <footer className="bg-primary-dark text-white/80 pt-16 pb-8">
      <div className="container">
        {/* Top banner */}
        <div className="rounded-xl bg-accent/10 border border-accent/20 p-6 mb-12 text-center">
          <p className="font-display text-lg font-bold text-accent uppercase tracking-wide mb-1">
            Atendimento 24 horas em Belo Horizonte e toda Região Metropolitana
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-3 text-sm text-white">
            <a href="tel:+5531999798413" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="h-4 w-4 text-accent" /> (31) 9 9979-8413
            </a>
            <a href="mailto:comercialdesentupidoraprecisao@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="h-4 w-4 text-accent" /> comercialdesentupidoraprecisao@gmail.com
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Coluna 1 – Institucional */}
          <div>
            <div className="font-display text-xl font-bold text-white mb-4">
              {s?.logo_url ? (
                <img src={s.logo_url} alt={companyName} className="h-8 w-auto" />
              ) : (
                <><span className="text-accent">●</span> {companyName}</>
              )}
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Especialistas em desentupimento em Belo Horizonte e região metropolitana. Atendimento 24 horas com profissionais qualificados.
            </p>
            <ul className="space-y-1.5 text-xs text-white/60">
              <li className="flex items-start gap-2">
                <Building2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent/70" />
                <span>Desentupidora Precisão Ltda</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="shrink-0 text-accent/70 font-bold text-[10px] mt-0.5">CNPJ</span>
                <span>33.770.939/0001-94</span>
              </li>
            </ul>
          </div>

          {/* Coluna 2 – Serviços */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              {services?.slice(0, 6).map((sv) => (
                <li key={sv.slug}><Link to={`/servicos/${sv.slug}`} className="hover:text-white transition-colors">{sv.title}</Link></li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 – Cidades */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Cidades</h4>
            <ul className="space-y-2 text-sm">
              {cities?.slice(0, 6).map((c) => (
                <li key={c.slug}><Link to={`/desentupidora/${c.slug}`} className="hover:text-white transition-colors">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 – Contato */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <a href="tel:+5531999798413" className="hover:text-white transition-colors">(31) 9 9979-8413</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <a href="mailto:comercialdesentupidoraprecisao@gmail.com" className="hover:text-white transition-colors break-all">comercialdesentupidoraprecisao@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>Rua Lúcia Fonseca, nº 205 – Caieiras, Vespasiano/MG – CEP 33200-166</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>24h, 7 dias por semana</span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-white/50">
              Área de Atendimento: Belo Horizonte e Região Metropolitana de Minas Gerais
            </p>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="border-t border-white/10 pt-8 space-y-4">
          <p className="text-[11px] text-white/30 text-center leading-relaxed max-w-3xl mx-auto">
            As informações contidas neste site têm caráter informativo e comercial, podendo ser atualizadas sem aviso prévio.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <span>© {new Date().getFullYear()} {companyName} — CNPJ 33.770.939/0001-94. Todos os direitos reservados.</span>
            <div className="flex gap-4">
              <Link to="/sobre" className="hover:text-white/60 transition-colors">Sobre</Link>
              <Link to="/contato" className="hover:text-white/60 transition-colors">Contato</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
