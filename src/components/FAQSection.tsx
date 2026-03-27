import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Quanto custa um serviço de desentupimento?", a: "O valor varia de acordo com o tipo de serviço e a complexidade do problema. Oferecemos orçamento gratuito e sem compromisso. Entre em contato pelo WhatsApp para uma avaliação." },
  { q: "O atendimento é realmente 24 horas?", a: "Sim! Funcionamos 24 horas por dia, 7 dias por semana, incluindo feriados e finais de semana. Emergências são nossa prioridade." },
  { q: "Quanto tempo demora o atendimento?", a: "Nosso tempo médio de chegada é de 30 minutos em Belo Horizonte e região metropolitana. O serviço em si depende da complexidade, mas a maioria é resolvida em até 2 horas." },
  { q: "Vocês atendem qual região?", a: "Atendemos toda Belo Horizonte e região metropolitana, incluindo Contagem, Betim, Nova Lima, Sabará, Santa Luzia, entre outras cidades." },
  { q: "Quais formas de pagamento vocês aceitam?", a: "Aceitamos dinheiro, PIX, cartão de débito e crédito (em até 12x). Facilitamos ao máximo para nossos clientes." },
  { q: "Vocês oferecem garantia no serviço?", a: "Sim! Todos os nossos serviços possuem garantia. Caso o problema retorne dentro do período de garantia, voltamos sem custo adicional." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-wider text-primary">Dúvidas Frequentes</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Perguntas frequentes
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-2xl border border-border bg-card px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
