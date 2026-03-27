import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
import { cities } from "@/data/cities";

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white/80 pt-16 pb-8">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-4 mb-12">
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-4">
              <span className="text-accent">●</span> Desentupidora Precisão
            </h3>
            <p className="text-sm leading-relaxed">
              Especialistas em desentupimento em Belo Horizonte e região metropolitana. Atendimento 24 horas com profissionais qualificados.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/servicos/${s.slug}`} className="hover:text-white transition-colors">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Cidades</h4>
            <ul className="space-y-2 text-sm">
              {cities.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link to={`/desentupidora/${c.slug}`} className="hover:text-white transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> (31) 9999-9999</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> contato@desentupidoraprecisao.com.br</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Belo Horizonte - MG</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> 24 horas, 7 dias por semana</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Desentupidora Precisão. Todos os direitos reservados.</span>
          <div className="flex gap-4">
            <Link to="/sobre" className="hover:text-white/60">Sobre</Link>
            <Link to="/contato" className="hover:text-white/60">Contato</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
