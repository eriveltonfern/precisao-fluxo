import { Clock, Shield, Users, Wrench } from "lucide-react";

const stats = [
  { icon: Clock, label: "Atendimento", value: "24 horas", desc: "Todos os dias, inclusive feriados" },
  { icon: Shield, label: "Experiência", value: "+10 anos", desc: "Atuando em BH e região" },
  { icon: Users, label: "Clientes", value: "+5.000", desc: "Atendimentos realizados" },
  { icon: Wrench, label: "Equipamentos", value: "Modernos", desc: "Tecnologia de ponta" },
];

const AuthoritySection = () => {
  return (
    <section className="relative -mt-12 sm:-mt-16 z-10 px-2 sm:px-0">
      <div className="container">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-card p-4 sm:p-6 shadow-lg shadow-primary/5 border border-border text-center"
            >
              <stat.icon className="mx-auto mb-2 sm:mb-3 h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <div className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-xs sm:text-sm font-semibold text-foreground">{stat.label}</div>
              <div className="mt-1 text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
