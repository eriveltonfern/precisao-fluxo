import servicePia from "@/assets/service-pia.jpg";
import serviceEsgoto from "@/assets/service-esgoto.jpg";
import serviceVaso from "@/assets/service-vaso.jpg";
import serviceRalo from "@/assets/service-ralo.jpg";
import serviceFossa from "@/assets/service-fossa.jpg";
import serviceHidrojateamento from "@/assets/service-hidrojateamento.jpg";
import serviceCaixaGordura from "@/assets/service-caixa-gordura.jpg";
import service24h from "@/assets/service-24h.jpg";

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  desc: string;
  longDesc: string;
  image: string;
  keywords: string[];
}

export const services: ServiceData[] = [
  {
    slug: "desentupimento-de-pia",
    title: "Desentupimento de Pia",
    shortTitle: "Pia",
    desc: "Pia da cozinha ou banheiro, resolvemos rápido.",
    longDesc: "Nossa equipe é especialista em desentupimento de pia de cozinha e banheiro. Utilizamos equipamentos modernos como máquinas rotativas e hidrojateamento para eliminar completamente a obstrução, garantindo o fluxo perfeito da água. Atendimento rápido em até 30 minutos.",
    image: servicePia,
    keywords: ["desentupimento de pia", "pia entupida", "desentupir pia"],
  },
  {
    slug: "desentupimento-de-esgoto",
    title: "Desentupimento de Esgoto",
    shortTitle: "Esgoto",
    desc: "Desobstrução completa da rede de esgoto.",
    longDesc: "Realizamos a desobstrução completa de redes de esgoto residenciais, comerciais e industriais. Com equipamentos de ponta, eliminamos raízes, gordura e detritos que causam entupimentos na tubulação. Serviço com garantia e sem quebrar pisos.",
    image: serviceEsgoto,
    keywords: ["desentupimento de esgoto", "esgoto entupido", "desentupir esgoto"],
  },
  {
    slug: "desentupimento-de-vaso-sanitario",
    title: "Desentupimento de Vaso Sanitário",
    shortTitle: "Vaso",
    desc: "Vaso sanitário entupido? Ligou, resolveu.",
    longDesc: "Serviço especializado em desentupimento de vaso sanitário sem danificar a peça. Utilizamos técnicas profissionais e equipamentos adequados para resolver o problema rapidamente. Atendimento 24 horas, inclusive feriados e finais de semana.",
    image: serviceVaso,
    keywords: ["desentupimento de vaso", "vaso sanitário entupido", "desentupir vaso"],
  },
  {
    slug: "desentupimento-de-ralo",
    title: "Desentupimento de Ralo",
    shortTitle: "Ralo",
    desc: "Ralos de banheiro, área de serviço e garagem.",
    longDesc: "Desentupimos ralos de banheiro, cozinha, área de serviço, garagem e área externa. Removemos cabelos, sabão, gordura e outros materiais que obstruem a passagem da água. Serviço rápido e eficiente com equipamentos profissionais.",
    image: serviceRalo,
    keywords: ["desentupimento de ralo", "ralo entupido", "desentupir ralo"],
  },
  {
    slug: "limpeza-de-fossa",
    title: "Limpeza de Fossa",
    shortTitle: "Fossa",
    desc: "Limpeza e manutenção de fossas sépticas.",
    longDesc: "Realizamos limpeza de fossa séptica com caminhão limpa-fossa de alta capacidade. O serviço inclui sucção completa, higienização e descarte ecologicamente correto dos resíduos. Manutenção preventiva para evitar transbordamentos e mau cheiro.",
    image: serviceFossa,
    keywords: ["limpeza de fossa", "fossa séptica", "limpar fossa", "caminhão limpa fossa"],
  },
  {
    slug: "hidrojateamento",
    title: "Hidrojateamento",
    shortTitle: "Hidrojateamento",
    desc: "Alta pressão para desobstrução eficiente.",
    longDesc: "O hidrojateamento é a técnica mais eficiente para desobstrução de tubulações. Utilizamos jatos de água com alta pressão (até 4000 PSI) para remover completamente gordura, raízes, areia e incrustações. Ideal para manutenção preventiva e tubulações de grande diâmetro.",
    image: serviceHidrojateamento,
    keywords: ["hidrojateamento", "jato de água alta pressão", "limpeza de tubulação"],
  },
  {
    slug: "limpeza-de-caixa-de-gordura",
    title: "Limpeza de Caixa de Gordura",
    shortTitle: "Caixa de Gordura",
    desc: "Limpeza preventiva de caixas de gordura.",
    longDesc: "A limpeza de caixa de gordura é essencial para o funcionamento correto do sistema de esgoto. Realizamos a remoção completa da gordura acumulada, higienização e manutenção preventiva. Recomendamos a limpeza a cada 3 meses para evitar entupimentos.",
    image: serviceCaixaGordura,
    keywords: ["limpeza de caixa de gordura", "caixa de gordura entupida", "limpar caixa de gordura"],
  },
  {
    slug: "desentupidora-24-horas",
    title: "Desentupidora 24 Horas",
    shortTitle: "24 Horas",
    desc: "Emergência? Estamos disponíveis a qualquer hora.",
    longDesc: "Nossa desentupidora funciona 24 horas por dia, 7 dias por semana, incluindo feriados. Entendemos que emergências não escolhem horário, por isso mantemos equipes de plantão prontas para atender qualquer tipo de desentupimento com rapidez e eficiência.",
    image: service24h,
    keywords: ["desentupidora 24 horas", "desentupimento emergencial", "desentupidora de madrugada"],
  },
];
