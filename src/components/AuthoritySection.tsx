import { Clock, Shield, Users, Wrench } from "lucide-react";

const stats = [
  { icon: Clock, label: "Atendimento", value: "24 horas", desc: "Todos os dias, inclusive feriados" },
  { icon: Shield, label: "Experiência", value: "+10 anos", desc: "Atuando em BH e região" },
  { icon: Users, label: "Clientes", value: "+5.000", desc: "Atendimentos realizados" },
  { icon: Wrench, label: "Equipamentos", value: "Modernos", desc: "Tecnologia de ponta" },
];

const AuthoritySection = () => {
  return (
    <section className="relative -mt-16 z-10">
      <div className="container">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-card p-6 shadow-lg shadow-primary/5 border border-border text-center"
            >
              <stat.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
              <div className="font-display text-2xl font-extrabold text-foreground md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground">{stat.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
