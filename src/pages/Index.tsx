import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AuthoritySection from "@/components/AuthoritySection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ClientsSection from "@/components/ClientsSection";
import PortfolioSection from "@/components/PortfolioSection";
import CoverageSection from "@/components/CoverageSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SeoHead from "@/components/SeoHead";
import { useSettings } from "@/hooks/useSettings";

const Index = () => {
  const { data: s } = useSettings();

  useEffect(() => {
    if (!s) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: s.company_name,
      description: s.seo_description,
      url: s.seo_canonical || window.location.origin,
      telephone: `+55${s.whatsapp_number}`,
      address: { "@type": "PostalAddress", addressLocality: "Belo Horizonte", addressRegion: "MG", addressCountry: "BR" },
      geo: { "@type": "GeoCoordinates", latitude: -19.92, longitude: -43.94 },
      openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "00:00", closes: "23:59" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: s.google_rating, reviewCount: s.google_reviews_count },
      areaServed: ["Belo Horizonte","Contagem","Betim","Nova Lima","Sabará","Santa Luzia"],
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Quanto custa um serviço de desentupimento?", acceptedAnswer: { "@type": "Answer", text: "O valor varia de acordo com o tipo de serviço e a complexidade do problema. Oferecemos orçamento gratuito." } },
        { "@type": "Question", name: "O atendimento é realmente 24 horas?", acceptedAnswer: { "@type": "Answer", text: "Sim! Funcionamos 24 horas por dia, 7 dias por semana, incluindo feriados." } },
        { "@type": "Question", name: "Quanto tempo demora o atendimento?", acceptedAnswer: { "@type": "Answer", text: "Nosso tempo médio de chegada é de 30 minutos em Belo Horizonte e região metropolitana." } },
      ],
    };

    const addSchema = (data: object) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
      return script;
    };

    const s1 = addSchema(schema);
    const s2 = addSchema(faqSchema);
    return () => { s1.remove(); s2.remove(); };
  }, [s]);

  return (
    <div className="min-h-screen">
      <SeoHead />
      <Header />
      <HeroSection />
      <AuthoritySection />
      <ServicesSection />
      <HowItWorksSection />
      <ClientsSection />
      <PortfolioSection />
      <CoverageSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
