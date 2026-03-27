import { useEffect } from "react";
import { MessageCircle, CheckCircle2, Users, Clock, Award, Wrench } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useSettings, getWhatsAppLink } from "@/hooks/useSettings";
import teamImg from "@/assets/team-about.jpg";

const stats = [
  { icon: Clock, label: "Anos de experiência", value: "+10" },
  { icon: Users, label: "Clientes atendidos", value: "+5.000" },
  { icon: Award, label: "Avaliação Google", value: "4.9★" },
  { icon: Wrench, label: "Serviços realizados", value: "+12.000" },
];

const Sobre = () => {
  const { data: s } = useSettings();
  const waLink = s ? getWhatsAppLink(s) : "#";

  useEffect(() => {
    document.title = `Sobre Nós | ${s?.company_name || "Desentupidora Precisão"} — Belo Horizonte`;
  }, [s]);

  return (
    <div className="min-h-screen">
      <Header />

      <section className="bg-primary-dark pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="container">
          <h1 className="font-display text-3xl font-extrabold text-white md:text-5xl">
            Sobre a <span className="text-accent">{s?.company_name || "Desentupidora Precisão"}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Há mais de 10 anos resolvendo problemas de entupimento em Belo Horizonte e região metropolitana com excelência.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-foreground md:text-3xl mb-6">Nossa história</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>A {s?.company_name} nasceu da necessidade de oferecer um serviço de desentupimento realmente profissional em Belo Horizonte. Cansados de ver clientes mal atendidos e serviços mal executados, decidimos criar uma empresa que prioriza qualidade, rapidez e transparência.</p>
              <p>Hoje, somos referência em desentupimento na região metropolitana de BH, com uma equipe de profissionais treinados e equipamentos de última geração. Nosso compromisso é resolver seu problema no menor tempo possível, sem surpresas no orçamento.</p>
              <p>Funcionamos 24 horas por dia, 7 dias por semana, porque entendemos que emergências não escolhem horário. Cada atendimento é tratado com a mesma dedicação e profissionalismo que nos trouxe até aqui.</p>
            </div>
          </div>
          <img src={teamImg} alt={`Equipe ${s?.company_name}`} width={800} height={600} loading="lazy" className="rounded-2xl shadow-lg" />
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {stats.map((st) => (
              <div key={st.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
                <st.icon className="mx-auto h-8 w-8 text-primary mb-3" />
                <div className="font-display text-2xl font-extrabold text-foreground">{st.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-dark text-center">
        <div className="container">
          <h2 className="font-display text-2xl font-extrabold text-white md:text-3xl">Fale com nossa equipe</h2>
          <p className="mt-3 text-white/70">Estamos prontos para atender você 24 horas por dia.</p>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg hover:bg-red-700">
            <MessageCircle className="h-6 w-6" /> Falar no WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Sobre;
