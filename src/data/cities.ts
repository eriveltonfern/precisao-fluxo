export interface CityData {
  slug: string;
  name: string;
  description: string;
  neighborhoods: string[];
}

export const cities: CityData[] = [
  {
    slug: "belo-horizonte",
    name: "Belo Horizonte",
    description: "Atendemos toda Belo Horizonte com rapidez e profissionalismo. Nossa equipe está estrategicamente posicionada para chegar em até 30 minutos em qualquer região da capital mineira.",
    neighborhoods: ["Savassi", "Funcionários", "Lourdes", "Buritis", "Pampulha", "Centro", "Barreiro", "Venda Nova", "Mangabeiras", "Santa Efigênia", "Serra", "Sion"],
  },
  {
    slug: "contagem",
    name: "Contagem",
    description: "Desentupidora em Contagem com atendimento rápido e profissional. Cobrimos todas as regiões de Contagem, incluindo Industrial, Eldorado e Ressaca.",
    neighborhoods: ["Industrial", "Eldorado", "Ressaca", "Riacho das Pedras", "Nacional", "Sede", "Petrolândia"],
  },
  {
    slug: "betim",
    name: "Betim",
    description: "Serviço de desentupimento em Betim com equipe especializada. Atendemos residências, comércios e indústrias em toda a cidade.",
    neighborhoods: ["Centro", "PTB", "Citrolândia", "Jardim Teresópolis", "Imbiruçu", "Alterosas"],
  },
  {
    slug: "nova-lima",
    name: "Nova Lima",
    description: "Desentupidora em Nova Lima com atendimento premium. Atendemos condomínios, residências e comércios em toda a cidade.",
    neighborhoods: ["Vila da Serra", "Jardim Canadá", "Centro", "Alphaville", "Vale do Sereno", "Macacos"],
  },
  {
    slug: "sabara",
    name: "Sabará",
    description: "Serviço de desentupimento em Sabará com rapidez e qualidade. Nossa equipe está pronta para atender toda a região.",
    neighborhoods: ["Centro", "General Carneiro", "Roça Grande", "Ana Lúcia", "Ravena"],
  },
  {
    slug: "ribeirao-das-neves",
    name: "Ribeirão das Neves",
    description: "Desentupidora em Ribeirão das Neves com atendimento 24 horas. Cobrimos todas as regiões com eficiência.",
    neighborhoods: ["Justinópolis", "Centro", "Veneza", "São Pedro", "Neviana"],
  },
  {
    slug: "vespasiano",
    name: "Vespasiano",
    description: "Atendimento rápido em Vespasiano e região. Nossa equipe está preparada para resolver qualquer tipo de entupimento.",
    neighborhoods: ["Centro", "Morro Alto", "Jardim Alterosa", "Serra Dourada"],
  },
  {
    slug: "lagoa-santa",
    name: "Lagoa Santa",
    description: "Desentupidora em Lagoa Santa com serviço profissional e garantia. Atendemos residências e condomínios em toda a cidade.",
    neighborhoods: ["Centro", "Lundceia", "Várzea", "Promissão", "Palmital"],
  },
  {
    slug: "santa-luzia",
    name: "Santa Luzia",
    description: "Serviço de desentupimento em Santa Luzia com equipe técnica qualificada e equipamentos modernos.",
    neighborhoods: ["Centro", "Frimisa", "São Benedito", "Palmital", "Bela Vista"],
  },
  {
    slug: "ibirite",
    name: "Ibirité",
    description: "Desentupidora em Ibirité com atendimento rápido e preço justo. Equipe especializada para todos os tipos de serviço.",
    neighborhoods: ["Centro", "Industrial", "Durval de Barros", "Palmeiras", "Marilândia"],
  },
];
