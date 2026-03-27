import { MapPin, Phone, Mail, Clock } from "lucide-react";
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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div>
            <div className="font-display text-xl font-bold text-white mb-4">
              {s?.logo_url ? (
                <img src={s.logo_url} alt={companyName} className="h-8 w-auto" />
              ) : (
                <><span className="text-accent">●</span> {companyName}</>
              )}
            </div>
            <p className="text-sm leading-relaxed">
              Especialistas em desentupimento em Belo Horizonte e região metropolitana. Atendimento 24 horas com profissionais qualificados.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              {services?.slice(0, 6).map((sv) => (
                <li key={sv.slug}><Link to={`/servicos/${sv.slug}`} className="hover:text-white transition-colors">{sv.title}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Cidades</h4>
            <ul className="space-y-2 text-sm">
              {cities?.slice(0, 6).map((c) => (
                <li key={c.slug}><Link to={`/desentupidora/${c.slug}`} className="hover:text-white transition-colors">{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent shrink-0" /> {s?.phone}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent shrink-0" /> {s?.email}</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent shrink-0" /> {s?.address}</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent shrink-0" /> 24h, 7 dias</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} {companyName}. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <Link to="/sobre" className="hover:text-white/60 transition-colors">Sobre</Link>
            <Link to="/contato" className="hover:text-white/60 transition-colors">Contato</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
