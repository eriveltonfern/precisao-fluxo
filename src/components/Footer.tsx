import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white/80 pt-16 pb-8">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-3 mb-12">
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
              <li>Desentupimento de Pia</li>
              <li>Desentupimento de Esgoto</li>
              <li>Desentupimento de Vaso</li>
              <li>Limpeza de Fossa</li>
              <li>Hidrojateamento</li>
              <li>Caixa de Gordura</li>
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

        <div className="border-t border-white/10 pt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Desentupidora Precisão. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
